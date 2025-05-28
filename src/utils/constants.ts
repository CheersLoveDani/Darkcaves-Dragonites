// filepath: e:\development\Darkcaves-Dragonites\src\utils\constants.ts
// Game constants and mappings

// Pokemon type colors for UI theming
export const POKEMON_TYPE_COLORS = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
} as const;

// D&D ability score names
export const DND_ABILITIES = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

// Pokemon stat names
export const POKEMON_STATS = [
  "hp",
  "attack",
  "defense",
  "specialAttack",
  "specialDefense",
  "speed",
] as const;

// Stat conversion ranges
export const STAT_RANGES = {
  pokemon: { min: 1, max: 255 },
  dnd: { min: 1, max: 30 },
  dndNormal: { min: 8, max: 18 },
} as const;
