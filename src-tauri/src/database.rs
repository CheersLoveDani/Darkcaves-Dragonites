use sqlx::{sqlite::SqlitePool, Row};
use crate::pokemon::Pokemon;
use serde::{Deserialize, Serialize};

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
        
        let result = sqlx::query(
            "INSERT INTO trainers (name, created_date) VALUES (?, ?)"
        )
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
            "#
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

    pub async fn get_trainer_pokemon(&self, trainer_id: i64) -> Result<Vec<UserPokemon>, sqlx::Error> {
        let rows = sqlx::query(
            r#"
            SELECT id, pokemon_id, nickname, level, experience, captured_date, is_shiny, trainer_id
            FROM user_pokemon WHERE trainer_id = ? ORDER BY captured_date DESC
            "#
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
    }    // Pokemon data caching
    #[allow(dead_code)]
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

    #[allow(dead_code)]
    pub async fn get_cached_pokemon(&self, id: u32) -> Result<Option<Pokemon>, sqlx::Error> {
        let row = sqlx::query("SELECT data FROM pokemon_cache WHERE id = ?")
            .bind(id as i64)
            .fetch_optional(&self.pool)
            .await?;

        if let Some(row) = row {
            let data: String = row.get("data");
            let pokemon: Pokemon = serde_json::from_str(&data).unwrap();
            Ok(Some(pokemon))
        } else {
            Ok(None)
        }
    }

    pub async fn update_pokemon_level(&self, user_pokemon_id: i64, new_level: u8) -> Result<(), sqlx::Error> {
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
