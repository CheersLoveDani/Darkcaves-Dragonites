use crate::pokemon::{BaseStats, Pokemon};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DnDStatBlock {
    pub ability_scores: AbilityScores,
    pub armor_class: u8,
    pub hit_points: u32,
    pub speed: u32,
    pub skills: Vec<Skill>,
    pub resistances: Vec<DamageType>,
    pub vulnerabilities: Vec<DamageType>,
    pub actions: Vec<Action>,
    pub challenge_rating: f32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AbilityScores {
    pub strength: u8,
    pub dexterity: u8,
    pub constitution: u8,
    pub intelligence: u8,
    pub wisdom: u8,
    pub charisma: u8,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Skill {
    pub name: String,
    pub modifier: i8,
    pub proficient: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum DamageType {
    Fire,
    Water,
    Grass,
    Electric,
    Psychic,
    Ice,
    Dragon,
    Dark,
    Fighting,
    Poison,
    Ground,
    Flying,
    Bug,
    Rock,
    Ghost,
    Steel,
    Fairy,
    Normal,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Action {
    pub name: String,
    pub description: String,
    pub attack_bonus: Option<i8>,
    pub damage_dice: Option<String>,
    pub damage_type: Option<DamageType>,
    pub range: Option<String>,
    pub recharge: Option<String>,
}

// Stat conversion logic
impl DnDStatBlock {
    pub fn from_pokemon(pokemon: &Pokemon, level: u8) -> Self {
        let ability_scores = convert_base_stats_to_abilities(&pokemon.base_stats, level);
        let hit_points = calculate_hit_points(&pokemon.base_stats, level);
        let armor_class = calculate_armor_class(&pokemon.base_stats);
        let speed = calculate_speed(&pokemon.base_stats);

        Self {
            ability_scores,
            armor_class,
            hit_points,
            speed,
            skills: Vec::new(), // To be implemented
            resistances: convert_types_to_resistances(&pokemon.types),
            vulnerabilities: convert_types_to_vulnerabilities(&pokemon.types),
            actions: Vec::new(), // To be implemented
            challenge_rating: calculate_challenge_rating(&pokemon.base_stats, level),
        }
    }
}

fn convert_base_stats_to_abilities(stats: &BaseStats, level: u8) -> AbilityScores {
    // Scale Pokemon stats (typically 1-255) to D&D ability scores (8-20)
    let scale_factor = level as f32 / 50.0; // Adjust scaling based on level

    AbilityScores {
        strength: scale_stat(stats.attack, scale_factor),
        dexterity: scale_stat(stats.speed, scale_factor),
        constitution: scale_stat(stats.hp, scale_factor),
        intelligence: scale_stat(stats.special_attack, scale_factor),
        wisdom: scale_stat(stats.special_defense, scale_factor),
        charisma: scale_stat((stats.attack + stats.special_attack) / 2, scale_factor),
    }
}

fn scale_stat(base_stat: u32, scale_factor: f32) -> u8 {
    let scaled = (base_stat as f32 * scale_factor * 0.08) + 8.0; // Base 8 + scaling
    scaled.min(20.0).max(8.0) as u8
}

fn calculate_hit_points(stats: &BaseStats, level: u8) -> u32 {
    let con_modifier = (scale_stat(stats.hp, level as f32 / 50.0) as i8 - 10) / 2;
    let base_hp = level as u32 * 8; // d8 hit die
    (base_hp as i32 + (con_modifier as i32 * level as i32)).max(1) as u32
}

fn calculate_armor_class(stats: &BaseStats) -> u8 {
    let base_ac = 10;
    let dex_modifier = (scale_stat(stats.speed, 1.0) as i8 - 10) / 2;
    let natural_armor = (stats.defense / 20).min(5) as i8; // Natural armor bonus

    (base_ac + dex_modifier + natural_armor).max(10) as u8
}

fn calculate_speed(stats: &BaseStats) -> u32 {
    let base_speed = 30; // Standard D&D speed
    let speed_bonus = (stats.speed / 10).min(20) as u32; // Max +20 speed
    base_speed + speed_bonus
}

fn convert_types_to_resistances(types: &[crate::pokemon::PokemonType]) -> Vec<DamageType> {
    // Simplified type effectiveness to resistances
    let mut resistances = Vec::new();

    for pokemon_type in types {
        match pokemon_type.name.as_str() {
            "fire" => resistances.push(DamageType::Fire),
            "water" => resistances.push(DamageType::Water),
            "grass" => resistances.push(DamageType::Grass),
            "electric" => resistances.push(DamageType::Electric),
            "steel" => {
                resistances.push(DamageType::Steel);
                resistances.push(DamageType::Poison);
            }
            _ => {}
        }
    }

    resistances
}

fn convert_types_to_vulnerabilities(types: &[crate::pokemon::PokemonType]) -> Vec<DamageType> {
    let mut vulnerabilities = Vec::new();

    for pokemon_type in types {
        match pokemon_type.name.as_str() {
            "fire" => vulnerabilities.push(DamageType::Water),
            "water" => vulnerabilities.push(DamageType::Electric),
            "grass" => vulnerabilities.push(DamageType::Fire),
            "ice" => vulnerabilities.push(DamageType::Fire),
            _ => {}
        }
    }

    vulnerabilities
}

fn calculate_challenge_rating(stats: &BaseStats, level: u8) -> f32 {
    let total_stats: u32 = stats.hp
        + stats.attack
        + stats.defense
        + stats.special_attack
        + stats.special_defense
        + stats.speed;

    let base_cr = (total_stats as f32 / 600.0) * (level as f32 / 50.0);
    (base_cr * 4.0).round() / 4.0 // Round to nearest quarter
}
