import React from "react";
import { DnDAction } from "../../types/dnd";

interface ActionListProps {
  actions: DnDAction[];
  className?: string;
}

export const ActionList: React.FC<ActionListProps> = ({
  actions,
  className = "",
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {actions.map((action, index) => (
        <div key={index}>
          <p className="text-gray-900 dark:text-gray-100">
            <span className="font-semibold italic text-red-800 dark:text-red-400">
              {action.name}.{" "}
            </span>
            {action.description}
          </p>

          {/* Attack details */}
          {action.attackBonus && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              <span className="italic">Attack:</span> {action.attackBonus} to
              hit
              {action.reach && `, reach ${action.reach}`}
              {action.range && `, range ${action.range}`}
              {action.targets && `, ${action.targets}`}
            </p>
          )}

          {/* Damage details */}
          {action.damage && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="italic">Damage:</span> {action.damage}
              {action.damageType && ` ${action.damageType} damage`}
              {action.additionalDamage && ` plus ${action.additionalDamage}`}
            </p>
          )}

          {/* Save details */}
          {action.savingThrow && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="italic">Save:</span> {action.savingThrow}
            </p>
          )}

          {/* Recharge */}
          {action.recharge && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              (Recharge {action.recharge})
            </p>
          )}

          {/* Usage limit */}
          {action.usageLimit && (
            <p className="text-xs text-gray-500 dark:text-gray-500">
              ({action.usageLimit})
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActionList;
