// Import types we need to reference
import type { Pokemon, BaseStats } from "./pokemon";

// API response types
export interface PokeApiResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface PokeApiResource {
  name: string;
  url: string;
}

export interface PokeApiPokemonResponse {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: PokeApiStat[];
  types: PokeApiType[];
  moves: PokeApiMoveEntry[];
  abilities: PokeApiAbilityEntry[];
  sprites: PokeApiSprites;
  species: PokeApiResource;
}

export interface PokeApiStat {
  base_stat: number;
  effort: number;
  stat: PokeApiResource;
}

export interface PokeApiType {
  slot: number;
  type: PokeApiResource;
}

export interface PokeApiMoveEntry {
  move: PokeApiResource;
  version_group_details: PokeApiVersionGroupDetail[];
}

export interface PokeApiVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: PokeApiResource;
  version_group: PokeApiResource;
}

export interface PokeApiAbilityEntry {
  is_hidden: boolean;
  slot: number;
  ability: PokeApiResource;
}

export interface PokeApiSprites {
  front_default?: string;
  front_shiny?: string;
  front_female?: string;
  front_shiny_female?: string;
  back_default?: string;
  back_shiny?: string;
  back_female?: string;
  back_shiny_female?: string;
  other?: {
    "official-artwork"?: {
      front_default?: string;
      front_shiny?: string;
    };
    home?: {
      front_default?: string;
      front_shiny?: string;
      front_female?: string;
      front_shiny_female?: string;
    };
  };
}

// Application state types
export interface AppState {
  currentTrainer?: Trainer;
  selectedPokemon?: Pokemon;
  conversionSettings: ConversionSettings;
  ui: UIState;
}

export interface UIState {
  isLoading: boolean;
  error?: string;
  activeTab: TabType;
  sidebarOpen: boolean;
  theme: Theme;
}

export enum TabType {
  Search = "search",
  Collection = "collection",
  Converter = "converter",
  Settings = "settings",
}

export enum Theme {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

// Import/Export types
export interface ExportData {
  trainer: Trainer;
  pokemon: UserPokemon[];
  settings: ConversionSettings;
  version: string;
  exportDate: string;
}

export interface ImportResult {
  success: boolean;
  message: string;
  data?: ExportData;
}

// User/Trainer types
export interface Trainer {
  id: string;
  name: string;
  level: number;
  experience: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserPokemon {
  id: string;
  pokemonId: number;
  nickname?: string;
  level: number;
  experience: number;
  nature?: string;
  capturedAt: string;
  customStats?: Partial<BaseStats>;
}

export interface ConversionSettings {
  useCustomFormulas: boolean;
  levelScaling: boolean;
  includeHiddenAbilities: boolean;
  preferredStatSystem: "standard" | "point-buy" | "custom";
  customStatRanges?: {
    min: number;
    max: number;
  };
}

// Cache management types
export interface CacheStats {
  cached_pokemon_count: number;
  last_updated: string;
}

// Enhanced Pokemon list response with pagination
export interface PokemonListResponse {
  pokemon: Pokemon[];
  total_count: number;
  has_more: boolean;
}

// Filter options for Pokemon lists
export interface PokemonFilters {
  type?: string;
  search?: string;
  generation?: number;
}

// Pagination parameters
export interface PaginationParams {
  offset: number;
  limit: number;
}

// Re-export types from other modules
export * from "./pokemon";
export * from "./dnd";
