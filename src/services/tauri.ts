import { invoke } from "@tauri-apps/api/tauri";
import type {
  Pokemon,
  UserPokemon,
  Trainer,
  CacheStats,
  PokemonListResponse,
} from "@/types";

// Tauri command wrappers
export const tauriApi = {
  // Pokemon data commands
  async fetchPokemon(id: number): Promise<Pokemon> {
    return await invoke("fetch_pokemon", { id });
  },

  async searchPokemon(query: string): Promise<Pokemon[]> {
    return await invoke("search_pokemon", { query });
  },

  // Cache management commands
  async clearPokemonCache(): Promise<void> {
    return await invoke("clear_pokemon_cache");
  },

  async clearExpiredCache(maxAgeHours: number): Promise<number> {
    return await invoke("clear_expired_cache", { maxAgeHours });
  },

  async getCacheStats(): Promise<CacheStats> {
    return await invoke("get_cache_stats");
  },

  async getPokemonBatch(offset: number, limit: number): Promise<Pokemon[]> {
    return await invoke("get_pokemon_batch", { offset, limit });
  },

  // Enhanced Pokemon list with filtering
  async getPokemonList(
    offset: number,
    limit: number,
    typeFilter?: string,
    searchQuery?: string
  ): Promise<PokemonListResponse> {
    return await invoke("get_pokemon_list", {
      offset,
      limit,
      typeFilter,
      searchQuery,
    });
  },

  // Improved Pokemon list command
  async getPokemonListImproved(
    offset: number,
    limit: number,
    typeFilter?: string,
    searchQuery?: string
  ): Promise<PokemonListResponse> {
    return await invoke("get_pokemon_list_improved", {
      offset,
      limit,
      typeFilter,
      searchQuery,
    });
  },

  // Initialize Pokemon data
  async initializePokemonData(generation?: number): Promise<string> {
    return await invoke("initialize_pokemon_data", { generation });
  },

  // Stat conversion commands
  async convertPokemonToDnd(pokemon: Pokemon, level: number) {
    return await invoke("convert_pokemon_to_dnd", { pokemon, level });
  },

  // Database commands
  async createTrainer(name: string): Promise<number> {
    return await invoke("create_trainer", { name });
  },

  async getTrainer(id: number): Promise<Trainer | null> {
    return await invoke("get_trainer", { id });
  },

  async capturePokemon(
    trainerId: number,
    pokemonId: number,
    nickname?: string,
    level: number = 1,
    isShiny: boolean = false
  ): Promise<number> {
    return await invoke("capture_pokemon", {
      trainerId,
      pokemonId,
      nickname,
      level,
      isShiny,
    });
  },

  async getTrainerPokemon(trainerId: number): Promise<UserPokemon[]> {
    return await invoke("get_trainer_pokemon", { trainerId });
  },

  async updatePokemonLevel(
    userPokemonId: number,
    newLevel: number
  ): Promise<void> {
    return await invoke("update_pokemon_level", { userPokemonId, newLevel });
  },

  async releasePokemon(userPokemonId: number): Promise<void> {
    return await invoke("release_pokemon", { userPokemonId });
  },

  // File operations
  async exportStatBlock(statBlock: any, format: string): Promise<string> {
    return await invoke("export_stat_block", { statBlock, format });
  },

  // Smart loading commands
  async getPokemonBatchSmart(
    offset: number,
    limit: number
  ): Promise<Pokemon[]> {
    return await invoke("get_pokemon_batch_smart", { offset, limit });
  },

  async getHighestPokemonId(): Promise<number | null> {
    return await invoke("get_highest_pokemon_id");
  },

  async getPokemonSequentialCount(maxId: number): Promise<number> {
    return await invoke("get_pokemon_sequential_count", { maxId });
  },

  async getMissingPokemonIds(
    startId: number,
    endId: number
  ): Promise<number[]> {
    return await invoke("get_missing_pokemon_ids", { startId, endId });
  },

  async ensurePokemonDatabaseInitialized(maxId?: number): Promise<string> {
    return await invoke("ensure_pokemon_database_initialized", { maxId });
  },
};

export async function ensurePokemonDatabaseInitialized(
  maxId?: number
): Promise<string> {
  return await window.__TAURI__.invoke<string>(
    "ensure_pokemon_database_initialized",
    { maxId }
  );
}
