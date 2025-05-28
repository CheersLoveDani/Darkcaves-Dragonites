import React from "react";
import { calculateModifier, formatModifier } from "../../utils/formatting";

interface AbilityScoreProps {
  label: string;
  value: number;
  className?: string;
}

export const AbilityScore: React.FC<AbilityScoreProps> = ({
  label,
  value,
  className = "",
}) => {
  const modifier = calculateModifier(value);

  return (
    <div className={`text-center ${className}`}>
      <div className="font-semibold text-red-800 dark:text-red-400 text-sm">
        {label}
      </div>
      <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
        {value}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        ({formatModifier(modifier)})
      </div>
    </div>
  );
};

export default AbilityScore;
