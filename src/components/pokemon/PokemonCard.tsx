import React from "react";
import { Pokemon } from "../../types/pokemon";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";
import {
  formatPokemonName,
  formatHeight,
  formatWeight,
} from "../../utils/formatting";

interface PokemonCardProps {
  pokemon: Pokemon;
  variant?: "compact" | "detailed";
  onClick?: () => void;
  className?: string;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  variant = "compact",
  onClick,
  className = "",
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const cardClasses = `
    bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
    ${onClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" : ""}
    ${className}
  `;

  return (
    <div className={cardClasses} onClick={handleClick}>
      <div className="p-4">
        {/* Header with image and basic info */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex-shrink-0">
            {" "}
            <img
              src={pokemon.sprites?.frontDefault || "/placeholder-pokemon.png"}
              alt={formatPokemonName(pokemon.name)}
              className="w-16 h-16 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-pokemon.png";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {formatPokemonName(pokemon.name)}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>{" "}
            <div className="flex flex-wrap gap-1 mt-1">
              {pokemon.types.map((typeInfo) => (
                <TypeBadge
                  key={typeInfo.type.name}
                  type={typeInfo.type.name}
                  size="sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Detailed variant shows additional info */}
        {variant === "detailed" && (
          <>
            {/* Physical stats */}
            <div className="mb-3 text-xs text-gray-600 dark:text-gray-400">
              <div className="grid grid-cols-2 gap-2">
                <div>Height: {formatHeight(pokemon.height)}</div>
                <div>Weight: {formatWeight(pokemon.weight)}</div>
              </div>
            </div>{" "}
            {/* Base stats */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Base Stats
              </h4>
              {pokemon.stats.map((statInfo) => (
                <StatBar
                  key={statInfo.stat.name}
                  label={statInfo.stat.name.replace("-", " ")}
                  value={statInfo.base_stat}
                  maxValue={255}
                  showValue={true}
                />
              ))}
            </div>
            {/* Abilities */}
            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Abilities
                </h4>{" "}
                <div className="flex flex-wrap gap-1">
                  {pokemon.abilities.map((abilityInfo) => (
                    <span
                      key={abilityInfo.ability.name}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded capitalize"
                    >
                      {abilityInfo.ability.name.replace("-", " ")}
                      {abilityInfo.is_hidden && " (Hidden)"}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
