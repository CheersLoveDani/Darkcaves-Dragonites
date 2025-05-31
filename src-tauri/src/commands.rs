use crate::converter::DnDStatBlock;
use crate::database::{Database, Trainer, UserPokemon};
use crate::pokemon::{PokeApiPokemonResponse, PokeApiResource, PokeApiResponse, Pokemon};
use tauri::State;

const POKEAPI_BASE_URL: &str = "https://pokeapi.co/api/v2";

// Pokemon data commands with caching
#[tauri::command]
pub async fn fetch_pokemon(db: State<'_, Database>, id: u32) -> Result<Pokemon, String> {
    // First, check if we have a valid cached version
    match db.is_pokemon_cache_valid(id, 24).await {
        // Cache valid for 24 hours
        Ok(is_valid) if is_valid => {
            if let Ok(Some(cached_pokemon)) = db.get_cached_pokemon(id).await {
                return Ok(cached_pokemon);
            }
        }
        _ => {} // Continue to API fetch if cache check fails
    }

    // Cache miss or invalid, fetch from API
    let url = format!("{}/pokemon/{}", POKEAPI_BASE_URL, id);

    match reqwest::get(&url).await {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<PokeApiPokemonResponse>().await {
                    Ok(api_response) => {
                        let pokemon = Pokemon::from_pokeapi_response(api_response);

                        // Cache the fetched Pokemon (ignore errors)
                        let _ = db.cache_pokemon(&pokemon).await;

                        Ok(pokemon)
                    }
                    Err(e) => {
                        eprintln!("Failed to parse PokeAPI response: {}", e);
                        Err(format!("Failed to parse Pokemon data: {}", e))
                    }
                }
            } else {
                Err(format!("PokeAPI returned status: {}", response.status()))
            }
        }
        Err(e) => {
            eprintln!("Failed to fetch from PokeAPI: {}", e);
            Err(format!("Failed to fetch Pokemon: {}", e))
        }
    }
}

#[tauri::command]
pub async fn search_pokemon(
    db: State<'_, Database>,
    query: String,
) -> Result<Vec<Pokemon>, String> {
    // If query is a number, fetch that specific Pokemon
    if let Ok(id) = query.parse::<u32>() {
        match fetch_pokemon(db.clone(), id).await {
            Ok(pokemon) => return Ok(vec![pokemon]),
            Err(_) => return Ok(vec![]), // Pokemon not found
        }
    }

    // Otherwise, search by name using the species endpoint
    let url = format!("{}/pokemon-species?limit=1000", POKEAPI_BASE_URL);

    match reqwest::get(&url).await {
        Ok(response) => {
            if response.status().is_success() {
                match response.json::<PokeApiResponse<PokeApiResource>>().await {
                    Ok(api_response) => {
                        // Filter species that match the query
                        let matching_species: Vec<_> = api_response
                            .results
                            .into_iter()
                            .filter(|species| {
                                species.name.to_lowercase().contains(&query.to_lowercase())
                            })
                            .take(20) // Limit to 20 results
                            .collect();

                        // Fetch full Pokemon data for each matching species
                        let mut results = Vec::new();
                        for species in matching_species {
                            // Extract ID from species URL
                            if let Some(id_str) = species.url.split('/').nth_back(1) {
                                if let Ok(id) = id_str.parse::<u32>() {
                                    if let Ok(pokemon) = fetch_pokemon(db.clone(), id).await {
                                        results.push(pokemon);
                                    }
                                }
                            }
                        }

                        Ok(results)
                    }
                    Err(e) => {
                        eprintln!("Failed to parse species search response: {}", e);
                        Err(format!("Failed to search Pokemon: {}", e))
                    }
                }
            } else {
                Err(format!("PokeAPI returned status: {}", response.status()))
            }
        }
        Err(e) => {
            eprintln!("Failed to search PokeAPI: {}", e);
            Err(format!("Failed to search Pokemon: {}", e))
        }
    }
}

// Stat conversion commands
#[tauri::command]
pub async fn convert_pokemon_to_dnd(pokemon: Pokemon, level: u8) -> Result<DnDStatBlock, String> {
    Ok(DnDStatBlock::from_pokemon(&pokemon, level))
}

// Database commands
#[tauri::command]
pub async fn create_trainer(db: State<'_, Database>, name: String) -> Result<i64, String> {
    db.create_trainer(&name).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_trainer(db: State<'_, Database>, id: i64) -> Result<Option<Trainer>, String> {
    db.get_trainer(id).await.map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn capture_pokemon(
    db: State<'_, Database>,
    trainer_id: i64,
    pokemon_id: u32,
    nickname: Option<String>,
    level: u8,
    is_shiny: bool,
) -> Result<i64, String> {
    db.capture_pokemon(trainer_id, pokemon_id, nickname, level, is_shiny)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_trainer_pokemon(
    db: State<'_, Database>,
    trainer_id: i64,
) -> Result<Vec<UserPokemon>, String> {
    db.get_trainer_pokemon(trainer_id)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn update_pokemon_level(
    db: State<'_, Database>,
    user_pokemon_id: i64,
    new_level: u8,
) -> Result<(), String> {
    db.update_pokemon_level(user_pokemon_id, new_level)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn release_pokemon(db: State<'_, Database>, user_pokemon_id: i64) -> Result<(), String> {
    db.release_pokemon(user_pokemon_id)
        .await
        .map_err(|e| e.to_string())
}

// File operations
#[tauri::command]
pub async fn export_stat_block(stat_block: DnDStatBlock, format: String) -> Result<String, String> {
    match format.as_str() {
        "json" => serde_json::to_string_pretty(&stat_block).map_err(|e| e.to_string()),
        "text" => Ok(format_stat_block_as_text(&stat_block)),
        _ => Err("Unsupported format".to_string()),
    }
}

fn format_stat_block_as_text(stat_block: &DnDStatBlock) -> String {
    format!(
        r#"
=== D&D 5e Stat Block ===

Ability Scores:
STR: {} ({:+})  DEX: {} ({:+})  CON: {} ({:+})
INT: {} ({:+})  WIS: {} ({:+})  CHA: {} ({:+})

Armor Class: {}
Hit Points: {}
Speed: {} ft.
Challenge Rating: {}

Damage Resistances: {}
Damage Vulnerabilities: {}

Actions: {} actions available
"#,
        stat_block.ability_scores.strength,
        (stat_block.ability_scores.strength as i8 - 10) / 2,
        stat_block.ability_scores.dexterity,
        (stat_block.ability_scores.dexterity as i8 - 10) / 2,
        stat_block.ability_scores.constitution,
        (stat_block.ability_scores.constitution as i8 - 10) / 2,
        stat_block.ability_scores.intelligence,
        (stat_block.ability_scores.intelligence as i8 - 10) / 2,
        stat_block.ability_scores.wisdom,
        (stat_block.ability_scores.wisdom as i8 - 10) / 2,
        stat_block.ability_scores.charisma,
        (stat_block.ability_scores.charisma as i8 - 10) / 2,
        stat_block.armor_class,
        stat_block.hit_points,
        stat_block.speed,
        stat_block.challenge_rating,
        if stat_block.resistances.is_empty() {
            "None".to_string()
        } else {
            format!("{} types", stat_block.resistances.len())
        },
        if stat_block.vulnerabilities.is_empty() {
            "None".to_string()
        } else {
            format!("{} types", stat_block.vulnerabilities.len())
        },
        stat_block.actions.len()
    )
}

// Cache management commands
#[tauri::command]
pub async fn clear_pokemon_cache(db: State<'_, Database>) -> Result<(), String> {
    db.clear_pokemon_cache()
        .await
        .map_err(|e| format!("Failed to clear cache: {}", e))
}

#[tauri::command]
pub async fn clear_expired_cache(
    db: State<'_, Database>,
    max_age_hours: i64,
) -> Result<u64, String> {
    db.clear_expired_pokemon_cache(max_age_hours)
        .await
        .map_err(|e| format!("Failed to clear expired cache: {}", e))
}

#[tauri::command]
pub async fn get_cache_stats(db: State<'_, Database>) -> Result<CacheStats, String> {
    let count = db
        .get_cached_pokemon_count()
        .await
        .map_err(|e| format!("Failed to get cache count: {}", e))?;

    Ok(CacheStats {
        cached_pokemon_count: count,
        last_updated: chrono::Utc::now().to_rfc3339(),
    })
}

#[tauri::command]
pub async fn get_pokemon_batch(
    db: State<'_, Database>,
    offset: u32,
    limit: u32,
) -> Result<Vec<Pokemon>, String> {
    let result = db.get_pokemon_batch(offset, limit).await;

    match &result {
        Ok(pokemon) => {
            println!(
                "get_pokemon_batch: offset={}, limit={}, returned {} Pokemon",
                offset,
                limit,
                pokemon.len()
            );
            if !pokemon.is_empty() {
                let ids: Vec<u32> = pokemon.iter().map(|p| p.id).collect();
                println!("Returned Pokemon IDs: {:?}", ids);
            }
        }
        Err(e) => {
            println!("get_pokemon_batch error: {}", e);
        }
    }

    result.map_err(|e| format!("Failed to get Pokemon batch: {}", e))
}

// Enhanced Pokemon list command with filtering
#[tauri::command]
pub async fn get_pokemon_list(
    db: State<'_, Database>,
    offset: u32,
    limit: u32,
    type_filter: Option<String>,
    search_query: Option<String>,
) -> Result<PokemonListResponse, String> {
    // First try to get from cache with filtering
    let cached_pokemon = db
        .get_pokemon_batch_filtered(offset, limit, type_filter.clone(), search_query.clone())
        .await
        .unwrap_or_else(|_| Vec::new());

    if !cached_pokemon.is_empty() {
        let total_count = db
            .get_pokemon_count_filtered(type_filter.clone(), search_query.clone())
            .await
            .unwrap_or(0);

        return Ok(PokemonListResponse {
            pokemon: cached_pokemon,
            total_count: total_count as u32,
            has_more: (offset + limit) < total_count as u32,
        });
    }

    // If no cached results, fetch from API and cache
    let api_url = if let Some(ref type_name) = type_filter {
        format!("{}/type/{}", POKEAPI_BASE_URL, type_name)
    } else {
        format!(
            "{}/pokemon?limit={}&offset={}",
            POKEAPI_BASE_URL, limit, offset
        )
    };

    match reqwest::get(&api_url).await {
        Ok(response) => {
            if response.status().is_success() {
                if type_filter.is_some() {
                    // Handle type-specific response
                    match response.json::<PokeApiTypeResponse>().await {
                        Ok(type_response) => {
                            let mut results = Vec::new();
                            let pokemon_refs = type_response
                                .pokemon
                                .into_iter()
                                .skip(offset as usize)
                                .take(limit as usize);

                            for pokemon_ref in pokemon_refs {
                                if let Some(id_str) = pokemon_ref.pokemon.url.split('/').nth_back(1)
                                {
                                    if let Ok(id) = id_str.parse::<u32>() {
                                        if let Ok(pokemon) = fetch_pokemon(db.clone(), id).await {
                                            results.push(pokemon);
                                        }
                                    }
                                }
                            }

                            Ok(PokemonListResponse {
                                pokemon: results.clone(),
                                total_count: results.len() as u32,
                                has_more: false,
                            })
                        }
                        Err(e) => Err(format!("Failed to parse type response: {}", e)),
                    }
                } else {
                    // Handle general Pokemon list response
                    match response.json::<PokeApiResponse<PokeApiResource>>().await {
                        Ok(list_response) => {
                            let mut results = Vec::new();

                            for resource in list_response.results {
                                if let Some(id_str) = resource.url.split('/').nth_back(1) {
                                    if let Ok(id) = id_str.parse::<u32>() {
                                        if let Ok(pokemon) = fetch_pokemon(db.clone(), id).await {
                                            // Apply search filter if specified
                                            if let Some(ref query) = search_query {
                                                if !pokemon
                                                    .name
                                                    .to_lowercase()
                                                    .contains(&query.to_lowercase())
                                                {
                                                    continue;
                                                }
                                            }
                                            results.push(pokemon);
                                        }
                                    }
                                }
                            }
                            Ok(PokemonListResponse {
                                pokemon: results,
                                total_count: list_response.count,
                                has_more: (offset + limit) < list_response.count,
                            })
                        }
                        Err(e) => Err(format!("Failed to parse Pokemon list response: {}", e)),
                    }
                }
            } else {
                Err(format!("API returned status: {}", response.status()))
            }
        }
        Err(e) => Err(format!("Failed to fetch Pokemon list: {}", e)),
    }
}

#[tauri::command]
pub async fn initialize_pokemon_data(
    db: State<'_, Database>,
    generation: Option<u32>,
) -> Result<String, String> {
    let gen_limit = match generation {
        Some(1) => 151, // Gen 1: 1-151
        Some(2) => 251, // Gen 1-2: 1-251
        Some(3) => 386, // Gen 1-3: 1-386
        Some(4) => 493, // Gen 1-4: 1-493
        Some(5) => 649, // Gen 1-5: 1-649
        _ => 151,       // Default to Gen 1
    };

    let mut loaded_count = 0;
    let mut error_count = 0;

    println!(
        "Starting bulk Pokemon initialization for {} Pokemon...",
        gen_limit
    );

    for id in 1..=gen_limit {
        // Check if Pokemon is already cached
        if let Ok(Some(_)) = db.get_cached_pokemon(id).await {
            continue; // Skip if already cached
        }

        // Fetch from API
        match fetch_pokemon(db.clone(), id).await {
            Ok(_) => {
                loaded_count += 1;
                if loaded_count % 10 == 0 {
                    println!("Loaded {} Pokemon...", loaded_count);
                }
            }
            Err(e) => {
                error_count += 1;
                eprintln!("Failed to load Pokemon {}: {}", id, e);
            }
        }

        // Small delay to avoid overwhelming PokeAPI
        tokio::time::sleep(tokio::time::Duration::from_millis(100)).await;
    }

    let message = format!(
        "Initialization complete: {} Pokemon loaded, {} errors",
        loaded_count, error_count
    );
    println!("{}", message);
    Ok(message)
}

#[tauri::command]
pub async fn get_pokemon_list_improved(
    db: State<'_, Database>,
    offset: u32,
    limit: u32,
    type_filter: Option<String>,
    search_query: Option<String>,
) -> Result<PokemonListResponse, String> {
    // First, try to get cached data
    let cached_pokemon = db
        .get_pokemon_batch_filtered(offset, limit, type_filter.clone(), search_query.clone())
        .await
        .unwrap_or_else(|_| Vec::new());

    // If we have cached data, return it
    if !cached_pokemon.is_empty() {
        let total_count = db
            .get_pokemon_count_filtered(type_filter.clone(), search_query.clone())
            .await
            .unwrap_or(0);

        return Ok(PokemonListResponse {
            pokemon: cached_pokemon,
            total_count: total_count as u32,
            has_more: (offset + limit) < total_count as u32,
        });
    } // If no cached data and no filters, try to fetch a batch from PokeAPI
    if type_filter.is_none() && search_query.is_none() {
        let url = format!(
            "{}/pokemon?limit={}&offset={}",
            POKEAPI_BASE_URL, limit, offset
        );

        match reqwest::get(&url).await {
            Ok(response) if response.status().is_success() => {
                match response.json::<PokeApiResponse<PokeApiResource>>().await {
                    Ok(list_response) => {
                        let mut results = Vec::new();

                        // Fetch each Pokemon and cache it
                        for resource in list_response.results {
                            if let Some(id_str) = resource.url.split('/').nth_back(1) {
                                if let Ok(id) = id_str.parse::<u32>() {
                                    if let Ok(pokemon) = fetch_pokemon(db.clone(), id).await {
                                        results.push(pokemon);
                                    }
                                }
                            }
                        }

                        return Ok(PokemonListResponse {
                            pokemon: results,
                            total_count: list_response.count,
                            has_more: (offset + limit) < list_response.count,
                        });
                    }
                    Err(e) => {
                        eprintln!("Failed to parse PokeAPI response: {}", e);
                    }
                }
            }
            Ok(response) => {
                eprintln!("PokeAPI returned error status: {}", response.status());
            }
            Err(e) => {
                eprintln!("Failed to fetch from PokeAPI: {}", e);
            }
        }
    }

    // Fallback: return empty result
    Ok(PokemonListResponse {
        pokemon: vec![],
        total_count: 0,
        has_more: false,
    })
}

// Helper commands
#[tauri::command]
pub async fn ensure_pokemon_database_initialized(
    db: State<'_, Database>,
    max_id: Option<u32>,
) -> Result<String, String> {
    let expected_count = max_id.unwrap_or(1010); // Default to Gen 1-8 National Dex
    if db
        .is_pokemon_database_complete(expected_count)
        .await
        .map_err(|e| e.to_string())?
    {
        return Ok("Database already complete".to_string());
    }

    // Bulk fetch all Pokemon resources from the API
    let url = format!("https://pokeapi.co/api/v2/pokemon?limit={}", expected_count);
    let response = reqwest::get(&url)
        .await
        .map_err(|e| format!("Failed to fetch Pokemon list: {}", e))?;
    if !response.status().is_success() {
        return Err(format!(
            "PokeAPI returned error status: {}",
            response.status()
        ));
    }
    let list_response: crate::pokemon::PokeApiResponse<crate::pokemon::PokeApiResource> = response
        .json()
        .await
        .map_err(|e| format!("Failed to parse Pokemon list: {}", e))?;
    let mut loaded_count = 0;
    let mut error_count = 0;
    for resource in list_response.results {
        if let Some(id_str) = resource.url.split('/').nth_back(1) {
            if let Ok(id) = id_str.parse::<u32>() {
                // Only fetch if not already cached
                if let Ok(Some(_)) = db.get_cached_pokemon(id).await {
                    continue;
                }
                match fetch_pokemon(db.clone(), id).await {
                    Ok(_) => loaded_count += 1,
                    Err(e) => {
                        error_count += 1;
                        eprintln!("Failed to load Pokemon {}: {}", id, e);
                    }
                }
            }
        }
    }
    let message = format!(
        "Initialization complete: {} loaded, {} errors",
        loaded_count, error_count
    );
    Ok(message)
}

#[derive(serde::Serialize)]
pub struct PokemonListResponse {
    pub pokemon: Vec<Pokemon>,
    pub total_count: u32,
    pub has_more: bool,
}

#[derive(serde::Deserialize)]
pub struct PokeApiTypeResponse {
    pub pokemon: Vec<PokeApiTypePokemon>,
}

#[derive(serde::Deserialize)]
pub struct PokeApiTypePokemon {
    pub pokemon: PokeApiResource,
    pub slot: u8,
}

#[derive(serde::Serialize)]
pub struct CacheStats {
    pub cached_pokemon_count: i64,
    pub last_updated: String,
}
