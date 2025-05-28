import React, { useEffect, useState } from "react";
import {
  combineClasses,
  transitions,
  typography,
} from "../../utils/designTokens";
import { useReducedMotion } from "../../utils/responsive";

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  showValue?: boolean;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  gradient?: boolean;
  className?: string;
}

export const StatBar: React.FC<StatBarProps> = ({
  label,
  value,
  maxValue = 255, // Pokemon stats typically max at 255
  color,
  showValue = true,
  showPercentage = false,
  size = "md",
  animated = true,
  gradient = true,
  className = "",
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = animated && !prefersReducedMotion;
  const percentage = Math.min((value / maxValue) * 100, 100);

  // Animate the bar fill on mount
  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        setAnimatedValue(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimatedValue(percentage);
    }
  }, [percentage, shouldAnimate]);

  // Dynamic color based on value if no color provided
  const getBarColor = () => {
    if (color) return color;

    if (value >= maxValue * 0.8)
      return gradient
        ? "bg-gradient-to-r from-green-400 to-green-600"
        : "bg-green-500";
    if (value >= maxValue * 0.6)
      return gradient
        ? "bg-gradient-to-r from-yellow-400 to-orange-500"
        : "bg-yellow-500";
    if (value >= maxValue * 0.4)
      return gradient
        ? "bg-gradient-to-r from-orange-400 to-red-500"
        : "bg-orange-500";
    return gradient
      ? "bg-gradient-to-r from-gray-400 to-gray-500"
      : "bg-gray-400";
  };

  const barColorClass = getBarColor();

  const sizeConfig = {
    sm: { height: "h-1.5", text: "text-xs", spacing: "space-y-0.5" },
    md: { height: "h-2", text: "text-sm", spacing: "space-y-1" },
    lg: { height: "h-3", text: "text-base", spacing: "space-y-1.5" },
  };

  const config = sizeConfig[size];

  return (
    <div className={combineClasses("w-full", config.spacing, className)}>
      {/* Label and Value Row */}
      <div className="flex justify-between items-center">
        <span
          className={combineClasses(
            config.text,
            typography.fontWeight.medium,
            "text-gray-700 dark:text-gray-300 capitalize"
          )}
        >
          {label}
        </span>
        <div className="flex items-center space-x-2">
          {showValue && (
            <span
              className={combineClasses(
                config.text,
                "text-gray-600 dark:text-gray-400",
                typography.fontWeight.medium
              )}
            >
              {value}
            </span>
          )}
          {showPercentage && (
            <span
              className={combineClasses(
                "text-xs text-gray-500 dark:text-gray-500"
              )}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className={combineClasses(
          "stat-bar w-full bg-gray-200 dark:bg-gray-700 rounded-full",
          config.height,
          "overflow-hidden"
        )}
      >
        <div
          className={combineClasses(
            "stat-bar-fill",
            config.height,
            barColorClass,
            shouldAnimate ? transitions.all : "",
            shouldAnimate ? "duration-1000 ease-out" : "",
            "rounded-full relative overflow-hidden"
          )}
          style={{
            width: `${animatedValue}%`,
            ...(color && !gradient ? { backgroundColor: color } : {}),
          }}
        >
          {/* Shine effect for high-value stats */}
          {percentage > 80 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          )}
        </div>
      </div>

      {/* Optional value indicator lines */}
      {maxValue > 100 && (
        <div className="relative">
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute top-0 w-px h-1 bg-gray-300 dark:bg-gray-600"
              style={{ left: `${mark}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatBar;
