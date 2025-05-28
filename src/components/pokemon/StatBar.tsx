// filepath: e:\development\Darkcaves-Dragonites\src\components\pokemon\StatBar.tsx
import React from "react";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  showValue?: boolean;
  className?: string;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue = 255, // Pokemon stats typically max at 255
  color = "#3B82F6", // Default blue
  showValue = true,
  className = "",
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100);

  // Color intensity based on value
  const getBarColor = () => {
    if (value >= maxValue * 0.8) return "#10B981"; // Green for high values
    if (value >= maxValue * 0.6) return "#F59E0B"; // Yellow for medium-high
    if (value >= maxValue * 0.4) return "#EF4444"; // Red for medium
    return "#6B7280"; // Gray for low values
  };

  const barColor = color === "#3B82F6" ? getBarColor() : color;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {label}
        </span>
        {showValue && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {value}
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
};

export default StatBar;
