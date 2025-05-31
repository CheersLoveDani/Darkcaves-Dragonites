// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod converter;
mod database;
mod pokemon;

use commands::*;
use database::Database;
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
        })
        .invoke_handler(tauri::generate_handler![
            fetch_pokemon,
            search_pokemon,
            clear_pokemon_cache,
            clear_expired_cache,
            get_cache_stats,
            get_pokemon_batch,
            get_pokemon_list,
            get_pokemon_list_improved,
            initialize_pokemon_data,
            ensure_pokemon_database_initialized
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
