import type {
  Pokemon,
  PokeApiResponse,
  PokeApiResource,
  PokeApiPokemonResponse,
} from "@/types";

const POKEAPI_BASE_URL =
  import.meta.env.VITE_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";

class PokeApiService {
  private cache = new Map<string, any>();
  private cacheExpiry = new Map<string, number>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private async fetchWithCache<T>(url: string): Promise<T> {
    const now = Date.now();

    // Check if we have cached data that hasn't expired
    if (this.cache.has(url) && this.cacheExpiry.get(url)! > now) {
      return this.cache.get(url);
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache the data
      this.cache.set(url, data);
      this.cacheExpiry.set(url, now + this.CACHE_DURATION);

      return data;
    } catch (error) {
      console.error("PokeAPI fetch error:", error);
      throw error;
    }
  }

  async searchPokemon(
    query: string,
    limit: number = 20
  ): Promise<PokeApiResource[]> {
    try {
      // If query is a number, fetch that specific Pokemon
      if (/^\d+$/.test(query)) {
        const pokemon = await this.getPokemon(parseInt(query));
        return [
          {
            name: pokemon.name,
            url: `${POKEAPI_BASE_URL}/pokemon/${pokemon.id}/`,
          },
        ];
      }

      // Otherwise, search by name in the species list
      const response = await this.fetchWithCache<
        PokeApiResponse<PokeApiResource>
      >(`${POKEAPI_BASE_URL}/pokemon-species?limit=1000`);

      const filtered = response.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      return filtered.slice(0, limit);
    } catch (error) {
      console.error("Pokemon search error:", error);
      return [];
    }
  }

  async getPokemon(idOrName: string | number): Promise<Pokemon> {
    try {
      const response = await this.fetchWithCache<PokeApiPokemonResponse>(
        `${POKEAPI_BASE_URL}/pokemon/${idOrName}`
      );

      return this.transformPokemonResponse(response);
    } catch (error) {
      console.error("Get Pokemon error:", error);
      throw new Error(`Failed to fetch Pokemon: ${idOrName}`);
    }
  }

  async getPokemonList(
    limit: number = 151,
    offset: number = 0
  ): Promise<PokeApiResource[]> {
    try {
      const response = await this.fetchWithCache<
        PokeApiResponse<PokeApiResource>
      >(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);

      return response.results;
    } catch (error) {
      console.error("Get Pokemon list error:", error);
      return [];
    }
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const randomId = Math.floor(Math.random() * 1010) + 1; // Up to Gen 9
    return this.getPokemon(randomId);
  }

  private transformPokemonResponse(response: PokeApiPokemonResponse): Pokemon {
    return {
      id: response.id,
      name: response.name,
      height: response.height,
      weight: response.weight,
      baseStats: {
        hp: response.stats.find((s) => s.stat.name === "hp")?.base_stat || 0,
        attack:
          response.stats.find((s) => s.stat.name === "attack")?.base_stat || 0,
        defense:
          response.stats.find((s) => s.stat.name === "defense")?.base_stat || 0,
        specialAttack:
          response.stats.find((s) => s.stat.name === "special-attack")
            ?.base_stat || 0,
        specialDefense:
          response.stats.find((s) => s.stat.name === "special-defense")
            ?.base_stat || 0,
        speed:
          response.stats.find((s) => s.stat.name === "speed")?.base_stat || 0,
      },
      types: response.types.map((t) => ({
        name: t.type.name,
        slot: t.slot,
      })),
      abilities: response.abilities.map((a) => ({
        name: a.ability.name,
        isHidden: a.is_hidden,
        slot: a.slot,
      })),
      moves: response.moves.slice(0, 20).map((m) => ({
        // Limit to first 20 moves
        name: m.move.name,
        moveType: "", // Would need additional API call
        damageClass: "", // Would need additional API call
        pp: 0, // Would need additional API call
        level: m.version_group_details[0]?.level_learned_at || 1,
      })),
      sprites: {
        frontDefault: response.sprites.front_default || undefined,
        frontShiny: response.sprites.front_shiny || undefined,
        backDefault: response.sprites.back_default || undefined,
        backShiny: response.sprites.back_shiny || undefined,
        frontFemale: response.sprites.front_female || undefined,
        frontShinyFemale: response.sprites.front_shiny_female || undefined,
        other: {
          officialArtwork: {
            frontDefault:
              response.sprites.other?.["official-artwork"]?.front_default ||
              undefined,
            frontShiny:
              response.sprites.other?.["official-artwork"]?.front_shiny ||
              undefined,
          },
          home: {
            frontDefault:
              response.sprites.other?.home?.front_default || undefined,
            frontShiny: response.sprites.other?.home?.front_shiny || undefined,
          },
        },
      },
      species: response.species,
    };
  }

  clearCache(): void {
    this.cache.clear();
    this.cacheExpiry.clear();
  }
}

export const pokeApi = new PokeApiService();
