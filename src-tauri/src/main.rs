// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod pokemon;
mod converter;
mod database;
mod commands;

use database::Database;
use commands::*;
use tauri::Manager;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Use a simple in-memory database for now to avoid file permission issues
            let rt = tokio::runtime::Runtime::new().unwrap();
            rt.block_on(async {
                match Database::new("sqlite::memory:").await {
                    Ok(database) => {
                        app.manage(database);
                        println!("In-memory database initialized successfully");
                    }
                    Err(e) => {
                        eprintln!("Failed to initialize database: {}", e);
                        // For now, we'll continue without database
                    }
                }
            });
            
            Ok(())
        })        .invoke_handler(tauri::generate_handler![
            fetch_pokemon,
            search_pokemon,
            convert_pokemon_to_dnd,
            create_trainer,
            get_trainer,
            capture_pokemon,
            get_trainer_pokemon,
            update_pokemon_level,
            release_pokemon,
            export_stat_block
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
