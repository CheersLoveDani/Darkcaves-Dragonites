import React from "react";
import { DnDCreature } from "../../types/dnd";
import { AbilityScore } from "./AbilityScore";
import { SkillList } from "./SkillList";
import { ActionList } from "./ActionList";
import { formatModifier } from "../../utils/formatting";

interface StatBlockProps {
  creature: DnDCreature;
  className?: string;
}

export const StatBlock: React.FC<StatBlockProps> = ({
  creature,
  className = "",
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

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg border-2 border-red-800 dark:border-red-600 p-6 font-serif ${className}`}
    >
      {/* Header */}
      <div className="border-b-2 border-red-800 dark:border-red-600 pb-2 mb-4">
        <h1 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-1">
          {name}
        </h1>
        <p className="text-sm italic text-gray-700 dark:text-gray-300">
          {size} {type}, {alignment}
        </p>
      </div>

      {/* Basic Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <span className="font-semibold text-red-800 dark:text-red-400 min-w-24">
            Armor Class
          </span>
          <span className="text-gray-900 dark:text-gray-100">{armorClass}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold text-red-800 dark:text-red-400 min-w-24">
            Hit Points
          </span>
          <span className="text-gray-900 dark:text-gray-100">{hitPoints}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold text-red-800 dark:text-red-400 min-w-24">
            Speed
          </span>
          <span className="text-gray-900 dark:text-gray-100">{speed}</span>
        </div>
      </div>

      {/* Ability Scores */}
      <div className="border-t border-b border-red-800 dark:border-red-600 py-3 mb-4">
        <div className="grid grid-cols-6 gap-2 text-center">
          <AbilityScore label="STR" value={stats.strength} />
          <AbilityScore label="DEX" value={stats.dexterity} />
          <AbilityScore label="CON" value={stats.constitution} />
          <AbilityScore label="INT" value={stats.intelligence} />
          <AbilityScore label="WIS" value={stats.wisdom} />
          <AbilityScore label="CHA" value={stats.charisma} />
        </div>
      </div>

      {/* Saving Throws */}
      {savingThrows && Object.keys(savingThrows).length > 0 && (
        <div className="mb-3">
          <span className="font-semibold text-red-800 dark:text-red-400">
            Saving Throws{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100">
            {Object.entries(savingThrows)
              .map(
                ([ability, modifier]) =>
                  `${ability.toUpperCase()} ${formatModifier(modifier)}`
              )
              .join(", ")}
          </span>
        </div>
      )}

      {/* Skills */}
      {skills && Object.keys(skills).length > 0 && (
        <div className="mb-3">
          <SkillList skills={skills} />
        </div>
      )}

      {/* Damage Resistances */}
      {damageResistances && damageResistances.length > 0 && (
        <div className="mb-3">
          <span className="font-semibold text-red-800 dark:text-red-400">
            Damage Resistances{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100">
            {damageResistances.join(", ")}
          </span>
        </div>
      )}

      {/* Damage Immunities */}
      {damageImmunities && damageImmunities.length > 0 && (
        <div className="mb-3">
          <span className="font-semibold text-red-800 dark:text-red-400">
            Damage Immunities{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100">
            {damageImmunities.join(", ")}
          </span>
        </div>
      )}

      {/* Condition Immunities */}
      {conditionImmunities && conditionImmunities.length > 0 && (
        <div className="mb-3">
          <span className="font-semibold text-red-800 dark:text-red-400">
            Condition Immunities{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100">
            {conditionImmunities.join(", ")}
          </span>
        </div>
      )}

      {/* Senses */}
      {senses && (
        <div className="mb-3">
          <span className="font-semibold text-red-800 dark:text-red-400">
            Senses{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100">{senses}</span>
        </div>
      )}

      {/* Languages */}
      {languages && (
        <div className="mb-3">
          <span className="font-semibold text-red-800 dark:text-red-400">
            Languages{" "}
          </span>
          <span className="text-gray-900 dark:text-gray-100">{languages}</span>
        </div>
      )}

      {/* Challenge Rating */}
      <div className="mb-4">
        <span className="font-semibold text-red-800 dark:text-red-400">
          Challenge{" "}
        </span>
        <span className="text-gray-900 dark:text-gray-100">
          {challengeRating} ({proficiencyBonus ? `${proficiencyBonus} PB` : ""})
        </span>
      </div>

      {/* Traits */}
      {traits && traits.length > 0 && (
        <div className="border-t border-red-800 dark:border-red-600 pt-4 mb-4">
          {traits.map((trait, index) => (
            <div key={index} className="mb-3">
              <p className="text-gray-900 dark:text-gray-100">
                <span className="font-semibold italic text-red-800 dark:text-red-400">
                  {trait.name}.{" "}
                </span>
                {trait.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="border-t border-red-800 dark:border-red-600 pt-4 mb-4">
          <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-3">
            Actions
          </h3>
          <ActionList actions={actions} />
        </div>
      )}

      {/* Reactions */}
      {reactions && reactions.length > 0 && (
        <div className="border-t border-red-800 dark:border-red-600 pt-4 mb-4">
          <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-3">
            Reactions
          </h3>
          <ActionList actions={reactions} />
        </div>
      )}

      {/* Legendary Actions */}
      {legendaryActions && legendaryActions.length > 0 && (
        <div className="border-t border-red-800 dark:border-red-600 pt-4">
          <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-3">
            Legendary Actions
          </h3>
          <ActionList actions={legendaryActions} />
        </div>
      )}
    </div>
  );
};

export default StatBlock;
