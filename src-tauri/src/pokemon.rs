use serde::{Deserialize, Serialize};

// PokeAPI response structures for deserialization
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiPokemonResponse {
    pub id: u32,
    pub name: String,
    pub height: u32,
    pub weight: u32,
    pub stats: Vec<PokeApiStat>,
    pub types: Vec<PokeApiTypeSlot>,
    pub moves: Vec<PokeApiMoveEntry>,
    pub abilities: Vec<PokeApiAbilityEntry>,
    pub sprites: PokeApiSprites,
    pub species: PokeApiResource,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiStat {
    pub base_stat: u32,
    pub effort: u32,
    pub stat: PokeApiResource,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiTypeSlot {
    pub slot: u32,
    pub r#type: PokeApiResource,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiMoveEntry {
    pub r#move: PokeApiResource,
    pub version_group_details: Vec<PokeApiVersionGroupDetail>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiVersionGroupDetail {
    pub level_learned_at: u32,
    pub move_learn_method: PokeApiResource,
    pub version_group: PokeApiResource,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiAbilityEntry {
    pub is_hidden: bool,
    pub slot: u32,
    pub ability: PokeApiResource,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiSprites {
    pub front_default: Option<String>,
    pub front_shiny: Option<String>,
    pub back_default: Option<String>,
    pub back_shiny: Option<String>,
    pub other: Option<PokeApiOtherSprites>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiOtherSprites {
    #[serde(rename = "official-artwork")]
    pub official_artwork: Option<PokeApiOfficialArtwork>,
    pub home: Option<PokeApiHomeSprites>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiOfficialArtwork {
    pub front_default: Option<String>,
    pub front_shiny: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiHomeSprites {
    pub front_default: Option<String>,
    pub front_shiny: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiResource {
    pub name: String,
    pub url: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PokeApiResponse<T> {
    pub count: u32,
    pub next: Option<String>,
    pub previous: Option<String>,
    pub results: Vec<T>,
}

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

    /// Convert from PokeAPI response to our internal Pokemon structure
    pub fn from_pokeapi_response(response: PokeApiPokemonResponse) -> Self {
        let base_stats = BaseStats {
            hp: response
                .stats
                .iter()
                .find(|s| s.stat.name == "hp")
                .map(|s| s.base_stat)
                .unwrap_or(0),
            attack: response
                .stats
                .iter()
                .find(|s| s.stat.name == "attack")
                .map(|s| s.base_stat)
                .unwrap_or(0),
            defense: response
                .stats
                .iter()
                .find(|s| s.stat.name == "defense")
                .map(|s| s.base_stat)
                .unwrap_or(0),
            special_attack: response
                .stats
                .iter()
                .find(|s| s.stat.name == "special-attack")
                .map(|s| s.base_stat)
                .unwrap_or(0),
            special_defense: response
                .stats
                .iter()
                .find(|s| s.stat.name == "special-defense")
                .map(|s| s.base_stat)
                .unwrap_or(0),
            speed: response
                .stats
                .iter()
                .find(|s| s.stat.name == "speed")
                .map(|s| s.base_stat)
                .unwrap_or(0),
        };

        let types = response
            .types
            .iter()
            .map(|t| PokemonType {
                name: t.r#type.name.clone(),
                slot: t.slot,
            })
            .collect();

        let abilities = response
            .abilities
            .iter()
            .map(|a| Ability {
                name: a.ability.name.clone(),
                is_hidden: a.is_hidden,
                slot: a.slot,
            })
            .collect();

        // Take first 10 moves for simplicity (full move data would require additional API calls)
        let moves = response
            .moves
            .iter()
            .take(10)
            .map(|m| Move {
                name: m.r#move.name.clone(),
                power: None,    // Would need additional API call to move endpoint
                accuracy: None, // Would need additional API call to move endpoint
                pp: 0,          // Would need additional API call to move endpoint
                move_type: "normal".to_string(), // Would need additional API call
                damage_class: "physical".to_string(), // Would need additional API call
            })
            .collect();

        let sprites = Sprites {
            front_default: response.sprites.front_default,
            front_shiny: response.sprites.front_shiny,
            back_default: response.sprites.back_default,
            back_shiny: response.sprites.back_shiny,
        };

        Self {
            id: response.id,
            name: response.name,
            base_stats,
            types,
            moves,
            abilities,
            sprites,
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
