use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pokemon {
    pub id: u32,
    pub name: String,
    pub base_stats: BaseStats,
    pub types: Vec<PokemonType>,
    pub moves: Vec<Move>,
    pub abilities: Vec<Ability>,
    pub sprites: Sprites,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BaseStats {
    pub hp: u32,
    pub attack: u32,
    pub defense: u32,
    pub special_attack: u32,
    pub special_defense: u32,
    pub speed: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokemonType {
    pub name: String,
    pub slot: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Move {
    pub name: String,
    pub power: Option<u32>,
    pub accuracy: Option<u32>,
    pub pp: u32,
    pub move_type: String,
    pub damage_class: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Ability {
    pub name: String,
    pub is_hidden: bool,
    pub slot: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Sprites {
    pub front_default: Option<String>,
    pub front_shiny: Option<String>,
    pub back_default: Option<String>,
    pub back_shiny: Option<String>,
}

// Pokemon data handling functions
impl Pokemon {
    #[allow(dead_code)]
    pub fn new(id: u32, name: String) -> Self {
        Self {
            id,
            name,
            base_stats: BaseStats::default(),
            types: Vec::new(),
            moves: Vec::new(),
            abilities: Vec::new(),
            sprites: Sprites::default(),
        }
    }
}

impl Default for BaseStats {
    fn default() -> Self {
        Self {
            hp: 0,
            attack: 0,
            defense: 0,
            special_attack: 0,
            special_defense: 0,
            speed: 0,
        }
    }
}

impl Default for Sprites {
    fn default() -> Self {
        Self {
            front_default: None,
            front_shiny: None,
            back_default: None,
            back_shiny: None,
        }
    }
}
