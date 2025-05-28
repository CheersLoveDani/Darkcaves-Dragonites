use tauri::State;
use crate::pokemon::Pokemon;
use crate::converter::DnDStatBlock;
use crate::database::{Database, UserPokemon, Trainer};

// Pokemon data commands
#[tauri::command]
pub async fn fetch_pokemon(_id: u32) -> Result<Pokemon, String> {
    // This will be implemented to fetch from PokeAPI or cache
    Err("Not implemented yet".to_string())
}

#[tauri::command]
pub async fn search_pokemon(_query: String) -> Result<Vec<Pokemon>, String> {
    // This will be implemented to search Pokemon by name or ID
    Err("Not implemented yet".to_string())
}

// Stat conversion commands
#[tauri::command]
pub async fn convert_pokemon_to_dnd(pokemon: Pokemon, level: u8) -> Result<DnDStatBlock, String> {
    Ok(DnDStatBlock::from_pokemon(&pokemon, level))
}

// Database commands
#[tauri::command]
pub async fn create_trainer(
    db: State<'_, Database>,
    name: String,
) -> Result<i64, String> {
    db.create_trainer(&name)
        .await
        .map_err(|e| e.to_string())
}

#[tauri::command]
pub async fn get_trainer(
    db: State<'_, Database>,
    id: i64,
) -> Result<Option<Trainer>, String> {
    db.get_trainer(id)
        .await
        .map_err(|e| e.to_string())
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
pub async fn release_pokemon(
    db: State<'_, Database>,
    user_pokemon_id: i64,
) -> Result<(), String> {
    db.release_pokemon(user_pokemon_id)
        .await
        .map_err(|e| e.to_string())
}

// File operations
#[tauri::command]
pub async fn export_stat_block(stat_block: DnDStatBlock, format: String) -> Result<String, String> {
    match format.as_str() {
        "json" => {
            serde_json::to_string_pretty(&stat_block)
                .map_err(|e| e.to_string())
        }
        "text" => {
            Ok(format_stat_block_as_text(&stat_block))
        }
        _ => Err("Unsupported format".to_string())
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
