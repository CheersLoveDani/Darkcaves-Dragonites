use crate::pokemon::Pokemon;
use serde::{Deserialize, Serialize};
use sqlx::{sqlite::SqlitePool, Row};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserPokemon {
    pub id: i64,
    pub pokemon_id: u32,
    pub nickname: Option<String>,
    pub level: u8,
    pub experience: u32,
    pub captured_date: String,
    pub is_shiny: bool,
    pub trainer_id: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Trainer {
    pub id: i64,
    pub name: String,
    pub created_date: String,
}

pub struct Database {
    pool: SqlitePool,
}

impl Database {
    pub async fn new(database_url: &str) -> Result<Self, sqlx::Error> {
        let pool = SqlitePool::connect(database_url).await?;

        // Create tables if they don't exist
        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS trainers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                created_date TEXT NOT NULL
            )
            "#,
        )
        .execute(&pool)
        .await?;

        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS user_pokemon (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                pokemon_id INTEGER NOT NULL,
                nickname TEXT,
                level INTEGER NOT NULL DEFAULT 1,
                experience INTEGER NOT NULL DEFAULT 0,
                captured_date TEXT NOT NULL,
                is_shiny BOOLEAN NOT NULL DEFAULT FALSE,
                trainer_id INTEGER NOT NULL,
                FOREIGN KEY (trainer_id) REFERENCES trainers (id)
            )
            "#,
        )
        .execute(&pool)
        .await?;

        sqlx::query(
            r#"
            CREATE TABLE IF NOT EXISTS pokemon_cache (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                data TEXT NOT NULL,
                last_updated TEXT NOT NULL
            )
            "#,
        )
        .execute(&pool)
        .await?;

        Ok(Self { pool })
    }

    // Trainer operations
    pub async fn create_trainer(&self, name: &str) -> Result<i64, sqlx::Error> {
        let created_date = chrono::Utc::now().to_rfc3339();

        let result = sqlx::query("INSERT INTO trainers (name, created_date) VALUES (?, ?)")
            .bind(name)
            .bind(created_date)
            .execute(&self.pool)
            .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn get_trainer(&self, id: i64) -> Result<Option<Trainer>, sqlx::Error> {
        let row = sqlx::query("SELECT id, name, created_date FROM trainers WHERE id = ?")
            .bind(id)
            .fetch_optional(&self.pool)
            .await?;

        if let Some(row) = row {
            Ok(Some(Trainer {
                id: row.get("id"),
                name: row.get("name"),
                created_date: row.get("created_date"),
            }))
        } else {
            Ok(None)
        }
    }

    // Pokemon collection operations
    pub async fn capture_pokemon(
        &self,
        trainer_id: i64,
        pokemon_id: u32,
        nickname: Option<String>,
        level: u8,
        is_shiny: bool,
    ) -> Result<i64, sqlx::Error> {
        let captured_date = chrono::Utc::now().to_rfc3339();

        let result = sqlx::query(
            r#"
            INSERT INTO user_pokemon 
            (pokemon_id, nickname, level, experience, captured_date, is_shiny, trainer_id)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(pokemon_id)
        .bind(nickname)
        .bind(level)
        .bind(0) // Starting experience
        .bind(captured_date)
        .bind(is_shiny)
        .bind(trainer_id)
        .execute(&self.pool)
        .await?;

        Ok(result.last_insert_rowid())
    }

    pub async fn get_trainer_pokemon(
        &self,
        trainer_id: i64,
    ) -> Result<Vec<UserPokemon>, sqlx::Error> {
        let rows = sqlx::query(
            r#"
            SELECT id, pokemon_id, nickname, level, experience, captured_date, is_shiny, trainer_id
            FROM user_pokemon WHERE trainer_id = ? ORDER BY captured_date DESC
            "#,
        )
        .bind(trainer_id)
        .fetch_all(&self.pool)
        .await?;

        let mut pokemon = Vec::new();
        for row in rows {
            pokemon.push(UserPokemon {
                id: row.get("id"),
                pokemon_id: row.get("pokemon_id"),
                nickname: row.get("nickname"),
                level: row.get("level"),
                experience: row.get("experience"),
                captured_date: row.get("captured_date"),
                is_shiny: row.get("is_shiny"),
                trainer_id: row.get("trainer_id"),
            });
        }

        Ok(pokemon)
    } // Pokemon data caching
    pub async fn cache_pokemon(&self, pokemon: &Pokemon) -> Result<(), sqlx::Error> {
        let data = serde_json::to_string(pokemon).unwrap();
        let last_updated = chrono::Utc::now().to_rfc3339();

        sqlx::query(
            "INSERT OR REPLACE INTO pokemon_cache (id, name, data, last_updated) VALUES (?, ?, ?, ?)"
        )
        .bind(pokemon.id as i64)
        .bind(&pokemon.name)
        .bind(data)
        .bind(last_updated)
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    pub async fn get_cached_pokemon(&self, id: u32) -> Result<Option<Pokemon>, sqlx::Error> {
        let row = sqlx::query("SELECT data FROM pokemon_cache WHERE id = ?")
            .bind(id as i64)
            .fetch_optional(&self.pool)
            .await?;

        if let Some(row) = row {
            let data: String = row.get("data");
            match serde_json::from_str(&data) {
                Ok(pokemon) => Ok(Some(pokemon)),
                Err(_) => Ok(None), // Return None if JSON parsing fails
            }
        } else {
            Ok(None)
        }
    }

    pub async fn is_pokemon_cache_valid(
        &self,
        id: u32,
        max_age_hours: i64,
    ) -> Result<bool, sqlx::Error> {
        let row = sqlx::query("SELECT last_updated FROM pokemon_cache WHERE id = ?")
            .bind(id as i64)
            .fetch_optional(&self.pool)
            .await?;

        if let Some(row) = row {
            let last_updated: String = row.get("last_updated");
            if let Ok(last_updated_time) = chrono::DateTime::parse_from_rfc3339(&last_updated) {
                let now = chrono::Utc::now();
                let age = now.signed_duration_since(last_updated_time.with_timezone(&chrono::Utc));
                Ok(age.num_hours() < max_age_hours)
            } else {
                Ok(false) // Invalid timestamp format, consider invalid
            }
        } else {
            Ok(false) // No cache entry exists
        }
    }

    pub async fn clear_pokemon_cache(&self) -> Result<(), sqlx::Error> {
        sqlx::query("DELETE FROM pokemon_cache")
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    pub async fn clear_expired_pokemon_cache(
        &self,
        max_age_hours: i64,
    ) -> Result<u64, sqlx::Error> {
        let cutoff_time = chrono::Utc::now() - chrono::Duration::hours(max_age_hours);
        let cutoff_string = cutoff_time.to_rfc3339();

        let result = sqlx::query("DELETE FROM pokemon_cache WHERE last_updated < ?")
            .bind(cutoff_string)
            .execute(&self.pool)
            .await?;

        Ok(result.rows_affected())
    }
    pub async fn get_cached_pokemon_count(&self) -> Result<i64, sqlx::Error> {
        let row = sqlx::query("SELECT COUNT(*) as count FROM pokemon_cache")
            .fetch_one(&self.pool)
            .await?;

        Ok(row.get("count"))
    }

    // Check if we have a complete Pokemon dataset (Gen 1-8, approximately 1000 Pokemon)
    pub async fn is_pokemon_database_complete(
        &self,
        expected_count: u32,
    ) -> Result<bool, sqlx::Error> {
        let count = self.get_cached_pokemon_count().await?;
        Ok(count >= expected_count as i64)
    }

    // Get Pokemon by ID range (much simpler than offset-based pagination)
    pub async fn get_pokemon_by_id_range(
        &self,
        start_id: u32,
        end_id: u32,
    ) -> Result<Vec<Pokemon>, sqlx::Error> {
        let rows =
            sqlx::query("SELECT data FROM pokemon_cache WHERE id >= ? AND id <= ? ORDER BY id")
                .bind(start_id as i64)
                .bind(end_id as i64)
                .fetch_all(&self.pool)
                .await?;

        let mut pokemon = Vec::new();
        for row in rows {
            let data: String = row.get("data");
            if let Ok(p) = serde_json::from_str::<Pokemon>(&data) {
                pokemon.push(p);
            }
        }

        Ok(pokemon)
    } // Simple get_pokemon_batch using offset (converts to ID range internally)
    pub async fn get_pokemon_batch(
        &self,
        offset: u32,
        limit: u32,
    ) -> Result<Vec<Pokemon>, sqlx::Error> {
        let start_id = offset + 1; // Pokemon IDs start at 1
        let end_id = start_id + limit - 1;

        self.get_pokemon_by_id_range(start_id, end_id).await
    }

    pub async fn get_pokemon_batch_filtered(
        &self,
        offset: u32,
        limit: u32,
        type_filter: Option<String>,
        search_query: Option<String>,
    ) -> Result<Vec<Pokemon>, sqlx::Error> {
        let mut query = "SELECT data FROM pokemon_cache".to_string();
        let mut conditions = Vec::new();

        if type_filter.is_some() || search_query.is_some() {
            conditions.push("1=1".to_string()); // Base condition for WHERE clause
        }

        if let Some(ref query_text) = search_query {
            conditions.push(format!("name LIKE '%{}%'", query_text.to_lowercase()));
        }

        if !conditions.is_empty() {
            query.push_str(" WHERE ");
            query.push_str(&conditions.join(" AND "));
        }

        query.push_str(" ORDER BY id LIMIT ? OFFSET ?");

        let rows = sqlx::query(&query)
            .bind(limit as i64)
            .bind(offset as i64)
            .fetch_all(&self.pool)
            .await?;

        let mut pokemon = Vec::new();
        for row in rows {
            let data: String = row.get("data");
            if let Ok(p) = serde_json::from_str::<Pokemon>(&data) {
                // Apply type filter in memory since it's complex JSON parsing
                if let Some(ref type_name) = type_filter {
                    let has_type = p
                        .types
                        .iter()
                        .any(|t| t.name.to_lowercase() == type_name.to_lowercase());
                    if !has_type {
                        continue;
                    }
                }
                pokemon.push(p);
            }
        }

        Ok(pokemon)
    }

    pub async fn get_pokemon_count_filtered(
        &self,
        type_filter: Option<String>,
        search_query: Option<String>,
    ) -> Result<i64, sqlx::Error> {
        if type_filter.is_none() && search_query.is_none() {
            return self.get_cached_pokemon_count().await;
        }

        let mut query = "SELECT COUNT(*) as count FROM pokemon_cache".to_string();
        let mut conditions = Vec::new();

        if let Some(ref query_text) = search_query {
            conditions.push(format!("name LIKE '%{}%'", query_text.to_lowercase()));
        }

        if !conditions.is_empty() {
            query.push_str(" WHERE ");
            query.push_str(&conditions.join(" AND "));
        }

        let row = sqlx::query(&query).fetch_one(&self.pool).await?;

        let mut count: i64 = row.get("count");

        // If type filter is specified, we need to check in memory
        if type_filter.is_some() {
            // This is a simplified approach - in a real app, you'd want to
            // store type information in a separate column for efficient querying
            let all_pokemon = self
                .get_pokemon_batch_filtered(0, count as u32, type_filter, search_query.clone())
                .await?;
            count = all_pokemon.len() as i64;
        }

        Ok(count)
    }

    pub async fn update_pokemon_level(
        &self,
        user_pokemon_id: i64,
        new_level: u8,
    ) -> Result<(), sqlx::Error> {
        sqlx::query("UPDATE user_pokemon SET level = ? WHERE id = ?")
            .bind(new_level)
            .bind(user_pokemon_id)
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    pub async fn release_pokemon(&self, user_pokemon_id: i64) -> Result<(), sqlx::Error> {
        sqlx::query("DELETE FROM user_pokemon WHERE id = ?")
            .bind(user_pokemon_id)
            .execute(&self.pool)
            .await?;
        Ok(())
    }
}
