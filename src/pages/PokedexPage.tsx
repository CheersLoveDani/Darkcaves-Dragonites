import React, { useState, useEffect, useCallback, useRef } from "react";
import { Pokemon } from "@/types";
import { tauriApi } from "@/services";
import {
  PokemonCard,
  PokemonList,
  SearchBar,
  FilterDropdown,
  Button,
  Modal,
  LoadingSkeleton,
  ErrorState,
} from "@/components";

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const PAGE_SIZE = 20;

interface PokedexPageProps {
  className?: string;
}

export const PokedexPage: React.FC<PokedexPageProps> = ({ className = "" }) => {
  // State management
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string[]>([]);

  // Modal state
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);

  // Intersection observer for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Initialization state
  const [dbReady, setDbReady] = useState(false);
  const [initMessage, setInitMessage] = useState<string | null>(null);
  const [initLog, setInitLog] = useState<string[]>([]);
  const [initProgress, setInitProgress] = useState<number>(0);

  // Ensure database is initialized on mount
  useEffect(() => {
    (async () => {
      setInitMessage("Checking Pokemon database...");
      setInitLog([]);
      setInitProgress(0);
      try {
        // Custom invoke to get progress updates
        // We'll use a polling approach for now, since Tauri commands are not streaming
        let done = false;
        let lastLoaded = 0;
        let total = 1010;
        setInitLog((log) => [...log, "Starting initialization..."]);
        // Call the backend and poll the cache count every second
        const ensurePromise = tauriApi.ensurePokemonDatabaseInitialized(total);
        while (!done) {
          // Poll the count
          const count = await tauriApi
            .getCacheStats()
            .then((s) => s.pokemonCount)
            .catch(() => 0);
          setInitProgress(Math.min(100, Math.round((count / total) * 100)));
          setInitLog((log) => {
            if (count !== lastLoaded) {
              lastLoaded = count;
              return [...log, `Loaded ${count} / ${total} Pokemon`];
            }
            return log;
          });
          if (count >= total) {
            done = true;
            break;
          }
          await new Promise((res) => setTimeout(res, 1000));
        }
        const msg = await ensurePromise;
        setInitMessage(msg);
        setInitLog((log) => [...log, msg]);
      } catch (e) {
        setInitMessage("Failed to initialize Pokemon database");
        setInitLog((log) => [...log, "Initialization failed."]);
      }
      setDbReady(true);
    })();
  }, []);

  // Load Pokemon data with smart caching strategy
  const loadPokemon = useCallback(
    async (offset: number = 0, append: boolean = false) => {
      try {
        console.log(
          `Loading Pokemon: offset=${offset}, append=${append}, PAGE_SIZE=${PAGE_SIZE}`
        );
        console.log(`Current filters:`, {
          searchQuery,
          selectedType: selectedType[0],
        });

        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }
        setError(null);

        let pokemonList: Pokemon[] = [];

        // If there's a search query, use search functionality
        if (searchQuery && searchQuery.trim()) {
          console.log(`Using search functionality for query: "${searchQuery}"`);
          try {
            pokemonList = await tauriApi.searchPokemon(searchQuery.trim());
            console.log(`Search returned ${pokemonList.length} Pokemon`);
            // For search, we don't paginate - just show all results
            setHasMore(false);
          } catch (err) {
            console.error("Search failed:", err);
            pokemonList = [];
          }
        } else {
          // Use improved list functionality for type filters and pagination
          const typeFilter =
            selectedType.length > 0 ? selectedType[0] : undefined;
          console.log(
            `Using getPokemonListImproved with typeFilter: ${typeFilter}`
          );

          try {
            const response = await tauriApi.getPokemonListImproved(
              offset,
              PAGE_SIZE,
              typeFilter,
              undefined // no search query for pagination
            );
            pokemonList = response.pokemon;
            console.log(
              `getPokemonListImproved returned ${pokemonList.length} Pokemon, total: ${response.total_count}`
            );
            setHasMore(response.has_more);
            setTotalCount(response.total_count);
          } catch (err) {
            console.log(
              `getPokemonListImproved failed, falling back to smart batch method:`,
              err
            );

            // Fallback to smart batch method with auto-fetching
            try {
              const startId = offset + 1; // Convert offset to Pokemon ID (1-based)
              const endId = offset + PAGE_SIZE;

              console.log(
                `Using smart loading for Pokemon IDs ${startId}-${endId}`
              );
              pokemonList = await tauriApi.getPokemonBatchSmart(startId, endId);
              console.log(
                `getPokemonBatchSmart returned ${pokemonList.length} Pokemon`
              );

              // Check if there are more Pokemon beyond this range
              // For now, assume Gen 1-8 (approx 1000 Pokemon) as the maximum
              const hasMorePokemon = endId < 1000 && pokemonList.length > 0;
              console.log(
                `hasMore calculation: endId=${endId}, pokemonList.length=${pokemonList.length}, hasMore=${hasMorePokemon}`
              );
              setHasMore(hasMorePokemon);

              // Update total count estimate
              if (pokemonList.length > 0) {
                setTotalCount(Math.max(totalCount, endId));
              }
            } catch (smartErr) {
              console.error("Smart batch method also failed:", smartErr);
              setError(
                "Failed to load Pokemon data. Please check your internet connection and try again."
              );
              pokemonList = [];
            }
          }
        }

        if (append && !searchQuery) {
          setPokemon((prev) => {
            console.log(
              `Appending ${pokemonList.length} Pokemon to existing ${prev.length} Pokemon`
            );
            return [...prev, ...pokemonList];
          });
        } else {
          console.log(
            `Setting ${pokemonList.length} Pokemon as ${searchQuery ? "search results" : "initial load"}`
          );
          setPokemon(pokemonList);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load Pokemon");
        console.error("Failed to load Pokemon:", err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setInitialLoading(false);
      }
    },
    [searchQuery, selectedType, totalCount]
  );

  // Initial load (after DB ready)
  useEffect(() => {
    if (dbReady) {
      loadPokemon(0, false);
    }
  }, [dbReady, loadPokemon]);

  // Search debouncing and state management
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(0); // Reset pagination when search changes

      // If search is cleared, reset hasMore to allow pagination
      if (!searchQuery || !searchQuery.trim()) {
        setHasMore(true);
      }

      // Trigger reload when search changes
      loadPokemon(0, false);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, loadPokemon]);

  // Type filter handling
  useEffect(() => {
    setCurrentPage(0);
    setHasMore(true); // Reset hasMore for new filter
    // Trigger reload when type filter changes
    loadPokemon(0, false);
  }, [selectedType, loadPokemon]);

  // Infinite scroll setup
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Don't set up infinite scroll if there's an active search query
    // Search returns all results at once, so pagination doesn't apply
    if (searchQuery && searchQuery.trim()) {
      console.log("Search active, disabling infinite scroll");
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting &&
          hasMore &&
          !loading &&
          !loadingMore &&
          !searchQuery
        ) {
          console.log("Infinite scroll triggered, loading more Pokemon...");
          const nextOffset = (currentPage + 1) * PAGE_SIZE;
          loadPokemon(nextOffset, true);
          setCurrentPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px 0px 0px 0px", // Start loading 100px before the element is visible
      }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadingMore, currentPage, loadPokemon, searchQuery]);

  // Handle Pokemon selection
  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setModalOpen(true);
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Handle search clear
  const handleSearchClear = () => {
    setSearchQuery("");
  };

  // Handle filter change
  const handleTypeFilterChange = (values: string[]) => {
    setSelectedType(values);
  };
  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedType([]);
    setCurrentPage(0);
    setHasMore(true); // Reset pagination
  };

  // Filter options for dropdown
  const typeFilterOptions = POKEMON_TYPES.map((type) => ({
    label: type.charAt(0).toUpperCase() + type.slice(1),
    value: type,
    count: 0, // This could be enhanced to show actual counts
  }));

  // In the render, show a loading message if not dbReady
  if (!dbReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <div className="text-center mb-4">
            <div className="text-lg font-semibold mb-2">
              {initMessage || "Initializing database..."}
            </div>
            <div className="text-gray-500 mb-4">
              This may take a few minutes on first launch.
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-4">
              <div
                className="bg-blue-600 h-4 transition-all duration-300"
                style={{ width: `${initProgress}%` }}
              ></div>
            </div>
            <div className="text-sm text-gray-600 mb-2">{initProgress}%</div>
          </div>
          <div className="bg-gray-900 text-gray-100 rounded p-3 h-48 overflow-y-auto text-xs font-mono shadow-inner">
            {initLog.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Pokédex
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Discover and explore Pokemon with intelligent caching and filtering
          </p>

          {/* Search and Filter Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  onClear={handleSearchClear}
                  placeholder="Search Pokemon by name..."
                  className="w-full"
                />
              </div>
              <div className="w-full lg:w-64">
                <FilterDropdown
                  label="Filter by Type"
                  options={typeFilterOptions}
                  selectedValues={selectedType}
                  onSelectionChange={handleTypeFilterChange}
                  placeholder="Select type..."
                />
              </div>{" "}
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!searchQuery && selectedType.length === 0}
              >
                Clear Filters
              </Button>
            </div>

            {/* Results summary */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>
                {totalCount > 0 && (
                  <>
                    Showing {pokemon.length} of {totalCount} Pokemon
                  </>
                )}
                {totalCount === 0 && !initialLoading && "No Pokemon found"}
              </span>
              {(searchQuery || selectedType.length > 0) && (
                <span className="text-blue-600 dark:text-blue-400">
                  Filters active
                </span>
              )}
            </div>
          </div>
        </div>{" "}
        {/* Error State */}
        {error && (
          <ErrorState
            message={error}
            action={{
              label: "Retry",
              onClick: () => loadPokemon(0, false),
            }}
            className="mb-6"
          />
        )}
        {/* Initial Loading State */}
        {initialLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <LoadingSkeleton key={index} className="h-64" />
            ))}
          </div>
        )}
        {/* Pokemon Grid */}
        {!initialLoading && pokemon.length > 0 && (
          <PokemonList
            pokemon={pokemon}
            viewMode="grid"
            onPokemonSelect={handlePokemonSelect}
            className="mb-8"
          />
        )}{" "}
        {/* Load More Trigger (Intersection Observer) */}
        {hasMore && !initialLoading && (
          <div ref={loadMoreRef} className="flex justify-center py-4">
            {loadingMore ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Loading more Pokemon...
                </span>
              </div>
            ) : (
              <div className="text-sm text-gray-400 dark:text-gray-500">
                •••
              </div>
            )}
          </div>
        )}
        {/* End of results */}
        {!hasMore && pokemon.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              You've reached the end of the Pokédex!
            </p>
          </div>
        )}
        {/* Empty State */}
        {!initialLoading && pokemon.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Pokemon Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Pokemon Detail Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          selectedPokemon
            ? `${selectedPokemon.name} #${selectedPokemon.id}`
            : "Pokemon Details"
        }
        size="xl"
      >
        {selectedPokemon && (
          <div className="space-y-6">
            {/* Pokemon Card in modal */}{" "}
            <PokemonCard
              pokemon={selectedPokemon}
              variant="detailed"
              className="border-0 shadow-none"
            />
            {/* Additional actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="primary" size="sm">
                Add to Party
              </Button>
              <Button variant="secondary" size="sm">
                View D&D Stats
              </Button>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PokedexPage;
