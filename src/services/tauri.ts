import { invoke } from "@tauri-apps/api/tauri";
import type { Pokemon, UserPokemon, Trainer } from "@/types";

// Tauri command wrappers
export const tauriApi = {
  // Pokemon data commands
  async fetchPokemon(id: number): Promise<Pokemon> {
    return await invoke("fetch_pokemon", { id });
  },

  async searchPokemon(query: string): Promise<Pokemon[]> {
    return await invoke("search_pokemon", { query });
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
};
