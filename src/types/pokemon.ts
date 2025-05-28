// Pokemon types and interfaces
export interface Pokemon {
  id: number;
  name: string;
  baseStats: BaseStats;
  stats: Stat[]; // Adding this for compatibility with PokeAPI
  types: PokemonTypeSlot[];
  moves: Move[];
  abilities: AbilitySlot[];
  sprites: Sprites;
  height: number;
  weight: number;
  species: Species;
}

export interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonType {
  name: string;
  slot: number;
}

export interface Move {
  name: string;
  power?: number;
  accuracy?: number;
  pp: number;
  moveType: string;
  damageClass: string;
  description?: string;
  level?: number;
}

export interface Ability {
  name: string;
  isHidden: boolean;
  slot: number;
  description?: string;
}

export interface Sprites {
  frontDefault?: string;
  frontShiny?: string;
  backDefault?: string;
  backShiny?: string;
  frontFemale?: string;
  frontShinyFemale?: string;
  other?: {
    officialArtwork?: {
      frontDefault?: string;
      frontShiny?: string;
    };
    home?: {
      frontDefault?: string;
      frontShiny?: string;
    };
  };
}

export interface Species {
  name: string;
  url: string;
}

// User's captured Pokemon
export interface UserPokemon {
  id: number;
  pokemonId: number;
  nickname?: string;
  level: number;
  experience: number;
  capturedDate: string;
  isShiny: boolean;
  trainerId: number;
  pokemon?: Pokemon; // Populated when needed
}

// Trainer/User data
export interface Trainer {
  id: number;
  name: string;
  createdDate: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonTypeSlot {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface AbilitySlot {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
