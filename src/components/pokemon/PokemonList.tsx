import React from "react";
import { Pokemon } from "../../types/pokemon";
import { PokemonCard } from "./PokemonCard";

interface PokemonListProps {
  pokemon: Pokemon[];
  viewMode?: "grid" | "list";
  onPokemonSelect?: (pokemon: Pokemon) => void;
  loading?: boolean;
  error?: string;
  className?: string;
}

export const PokemonList: React.FC<PokemonListProps> = ({
  pokemon,
  viewMode = "grid",
  onPokemonSelect,
  loading = false,
  error,
  className = "",
}) => {
  const handlePokemonClick = (pokemon: Pokemon) => {
    if (onPokemonSelect) {
      onPokemonSelect(pokemon);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading Pokemon...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-8">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!pokemon || pokemon.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-2">🔍</div>
          <p className="text-gray-600 dark:text-gray-400">No Pokemon found</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      </div>
    );
  }

  // Grid layout classes
  const gridClasses =
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      : "space-y-4";

  return (
    <div className={`${className}`}>
      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {pokemon.length} Pokemon found
      </div>{" "}
      {/* Pokemon list/grid */}
      <div className={gridClasses}>
        {pokemon.map((poke, index) => (
          <PokemonCard
            key={`${poke.id}-${index}`}
            pokemon={poke}
            variant={viewMode === "list" ? "detailed" : "compact"}
            onClick={() => handlePokemonClick(poke)}
            className={viewMode === "list" ? "w-full" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
