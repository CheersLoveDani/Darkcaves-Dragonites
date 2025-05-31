import React, { useState } from "react";
import { Pokemon } from "../../types/pokemon";
import { TypeBadge } from "./TypeBadge";
import { StatBar } from "./StatBar";
import { LoadingSkeleton } from "../ui/LoadingSkeleton";
import {
  formatPokemonName,
  formatHeight,
  formatWeight,
} from "../../utils/formatting";
import {
  combineClasses,
  getElevation,
  transitions,
} from "../../utils/designTokens";
import { focusClasses, useReducedMotion } from "../../utils/responsive";

interface PokemonCardProps {
  pokemon: Pokemon;
  variant?: "compact" | "detailed";
  onClick?: () => void;
  className?: string;
  isSelected?: boolean;
  loading?: boolean;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  variant = "compact",
  onClick,
  className = "",
  isSelected = false,
  loading = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = () => {
    if (onClick && !loading) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && !loading && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  if (loading) {
    return (
      <div
        className={combineClasses(
          "bg-white dark:bg-gray-800 rounded-xl p-4",
          getElevation("sm"),
          className
        )}
      >
        <LoadingSkeleton variant="pokemon-card" />
      </div>
    );
  }

  const isInteractive = Boolean(onClick);

  return (
    <div
      className={combineClasses(
        "group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden",
        "border border-gray-200 dark:border-gray-700",
        transitions.all,
        transitions.duration.normal,
        getElevation("sm"),
        isInteractive && "cursor-pointer",
        isInteractive &&
          !prefersReducedMotion &&
          "hover:scale-[1.02] transform",
        isInteractive && "hover:shadow-card-hover dark:hover:shadow-lg",
        isSelected &&
          "ring-2 ring-primary-500 dark:ring-primary-400 ring-offset-2 dark:ring-offset-gray-800",
        focusClasses.default,
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? "button" : undefined}
      aria-label={
        isInteractive
          ? `View ${formatPokemonName(pokemon.name)} details`
          : undefined
      }
    >
      <div className="p-5">
        {/* Header with image and basic info */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center overflow-hidden">
              <img
                src={
                  !imageError && pokemon.sprites?.frontDefault
                    ? pokemon.sprites.frontDefault
                    : "/placeholder-pokemon.png"
                }
                alt={formatPokemonName(pokemon.name)}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            </div>
            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 group-hover:animate-shimmer transition-opacity duration-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-display font-bold text-text-primary dark:text-text-primary-dark truncate">
                {formatPokemonName(pokemon.name)}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </div>{" "}
            <div className="flex flex-wrap gap-1.5">
              {pokemon.types?.map((typeInfo) =>
                typeInfo?.type?.name ? (
                  <TypeBadge
                    key={typeInfo.type.name}
                    type={typeInfo.type.name}
                    size="sm"
                    variant="solid"
                  />
                ) : null
              )}
            </div>
          </div>
        </div>{" "}
        {/* Detailed variant shows additional info */}
        {variant === "detailed" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Physical stats */}
            <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Height
                </p>
                <p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                  {formatHeight(pokemon.height)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Weight
                </p>
                <p className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                  {formatWeight(pokemon.weight)}
                </p>
              </div>
            </div>

            {/* Base stats */}
            <div className="space-y-3">
              <h4 className="text-sm font-display font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                Base Stats
              </h4>{" "}
              <div className="space-y-2.5">
                {pokemon.stats?.map((statInfo) =>
                  statInfo?.stat?.name ? (
                    <StatBar
                      key={statInfo.stat.name}
                      label={statInfo.stat.name.replace("-", " ")}
                      value={statInfo.base_stat}
                      maxValue={255}
                      showValue={true}
                      size="md"
                    />
                  ) : null
                )}
              </div>
            </div>

            {/* Abilities */}
            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-display font-semibold text-text-primary dark:text-text-primary-dark flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                  Abilities
                </h4>{" "}
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities?.map((abilityInfo, index) =>
                    abilityInfo?.ability?.name ? (
                      <span
                        key={abilityInfo.ability.name}
                        className={`
                          inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full
                          transition-all duration-200 hover:scale-105
                          ${
                            abilityInfo.is_hidden
                              ? "bg-legendary-100 dark:bg-legendary-900/30 text-legendary-700 dark:text-legendary-300 ring-1 ring-legendary-200 dark:ring-legendary-700"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                          }
                        `}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {abilityInfo.ability.name.replace("-", " ")}
                        {abilityInfo.is_hidden && (
                          <span className="ml-1 text-xs opacity-75">
                            (Hidden)
                          </span>
                        )}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
