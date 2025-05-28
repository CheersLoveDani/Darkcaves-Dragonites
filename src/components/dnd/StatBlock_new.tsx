import React from "react";
import { DnDCreature } from "../../types/dnd";
import { AbilityScore } from "./AbilityScore";
import { SkillList } from "./SkillList";
import { ActionList } from "./ActionList";
import { formatModifier } from "../../utils/formatting";
import { getElevation, combineClasses } from "../../utils/designTokens";

interface StatBlockProps {
  creature: DnDCreature;
  className?: string;
  variant?: "classic" | "modern" | "pokemon";
}

const StatBlockDivider = () => (
  <div className="my-3">
    <svg
      width="100%"
      height="5"
      viewBox="0 0 400 5"
      className="text-dnd-damage dark:text-dnd-damage"
    >
      <polyline
        points="0,0 400,2.5 0,5"
        fill="currentColor"
        className="opacity-80"
      />
    </svg>
  </div>
);

const StatLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-bold text-dnd-damage dark:text-red-400 inline-block min-w-[120px] font-fantasy">
    {children}
  </span>
);

export const StatBlock: React.FC<StatBlockProps> = ({
  creature,
  className = "",
  variant = "classic",
}) => {
  const {
    name,
    type,
    size,
    alignment,
    armorClass,
    hitPoints,
    speed,
    stats,
    savingThrows,
    skills,
    damageResistances,
    damageImmunities,
    conditionImmunities,
    senses,
    languages,
    challengeRating,
    proficiencyBonus,
    traits,
    actions,
    reactions,
    legendaryActions,
  } = creature;

  const getVariantClasses = () => {
    switch (variant) {
      case "pokemon":
        return "bg-gradient-to-br from-pokemon-electric/5 to-pokemon-fire/5 dark:from-pokemon-electric/10 dark:to-pokemon-fire/10 border-pokemon-electric/30 dark:border-pokemon-electric/40";
      case "modern":
        return "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-600";
      default:
        return "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-dnd-damage/40 dark:border-dnd-damage/60";
    }
  };

  return (
    <div
      className={combineClasses(
        "rounded-xl border-2 p-6 font-fantasy transition-all duration-300 hover:scale-[1.01]",
        getElevation("md"),
        getVariantClasses(),
        className
      )}
    >
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-dnd-damage dark:text-red-400 mb-1 font-fantasy">
          {name}
        </h1>
        <p className="text-sm italic text-gray-700 dark:text-gray-300 font-sans">
          {size} {type}, {alignment}
        </p>
        <StatBlockDivider />
      </div>

      {/* Basic Combat Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <StatLabel>Armor Class</StatLabel>
          <div className="text-gray-900 dark:text-gray-100 font-semibold text-lg">
            {armorClass}
          </div>
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <StatLabel>Hit Points</StatLabel>
          <div className="text-gray-900 dark:text-gray-100 font-semibold text-lg">
            {hitPoints}
          </div>
        </div>
        <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
          <StatLabel>Speed</StatLabel>
          <div className="text-gray-900 dark:text-gray-100 font-semibold">
            {speed}
          </div>
        </div>
      </div>

      <StatBlockDivider />

      {/* Ability Scores */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
        {" "}
        <AbilityScore label="STR" value={stats.strength} />
        <AbilityScore label="DEX" value={stats.dexterity} />
        <AbilityScore label="CON" value={stats.constitution} />
        <AbilityScore label="INT" value={stats.intelligence} />
        <AbilityScore label="WIS" value={stats.wisdom} />
        <AbilityScore label="CHA" value={stats.charisma} />
      </div>

      <StatBlockDivider />

      {/* Secondary Stats */}
      <div className="space-y-2 mb-4 text-sm">
        {savingThrows && Object.keys(savingThrows).length > 0 && (
          <div className="flex flex-wrap">
            <StatLabel>Saving Throws</StatLabel>
            <span className="text-gray-900 dark:text-gray-100">
              {Object.entries(savingThrows)
                .map(
                  ([ability, modifier]) =>
                    `${ability.toUpperCase()} ${formatModifier(modifier as number)}`
                )
                .join(", ")}
            </span>
          </div>
        )}

        {skills && Object.keys(skills).length > 0 && (
          <div className="mb-3">
            <SkillList skills={skills} />
          </div>
        )}

        {damageResistances && damageResistances.length > 0 && (
          <div className="flex flex-wrap">
            <StatLabel>Damage Resistances</StatLabel>
            <span className="text-gray-900 dark:text-gray-100">
              {damageResistances.join(", ")}
            </span>
          </div>
        )}

        {damageImmunities && damageImmunities.length > 0 && (
          <div className="flex flex-wrap">
            <StatLabel>Damage Immunities</StatLabel>
            <span className="text-gray-900 dark:text-gray-100">
              {damageImmunities.join(", ")}
            </span>
          </div>
        )}

        {conditionImmunities && conditionImmunities.length > 0 && (
          <div className="flex flex-wrap">
            <StatLabel>Condition Immunities</StatLabel>
            <span className="text-gray-900 dark:text-gray-100">
              {conditionImmunities.join(", ")}
            </span>
          </div>
        )}

        {senses && (
          <div className="flex flex-wrap">
            <StatLabel>Senses</StatLabel>
            <span className="text-gray-900 dark:text-gray-100">{senses}</span>
          </div>
        )}

        {languages && (
          <div className="flex flex-wrap">
            <StatLabel>Languages</StatLabel>
            <span className="text-gray-900 dark:text-gray-100">
              {languages}
            </span>
          </div>
        )}

        <div className="flex flex-wrap">
          <StatLabel>Challenge</StatLabel>
          <span className="text-gray-900 dark:text-gray-100">
            {" "}
            {challengeRating} (XP:{" "}
            {proficiencyBonus ? Number(proficiencyBonus) * 25 : 0})
          </span>
        </div>
      </div>

      <StatBlockDivider />

      {/* Traits */}
      {traits && traits.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-dnd-damage dark:text-red-400 mb-3 font-fantasy">
            Traits
          </h3>
          {traits.map((trait: any, index: number) => (
            <div key={index} className="mb-3">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                <span className="font-semibold italic">{trait.name}.</span>{" "}
                {trait.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-dnd-damage dark:text-red-400 mb-3 font-fantasy">
            Actions
          </h3>
          <ActionList actions={actions} />
        </div>
      )}

      {/* Reactions */}
      {reactions && reactions.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-bold text-dnd-damage dark:text-red-400 mb-3 font-fantasy">
            Reactions
          </h3>
          <ActionList actions={reactions} />
        </div>
      )}

      {/* Legendary Actions */}
      {legendaryActions && legendaryActions.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-dnd-damage dark:text-red-400 mb-3 font-fantasy">
            Legendary Actions
          </h3>
          <ActionList actions={legendaryActions} />
        </div>
      )}
    </div>
  );
};

export default StatBlock;
