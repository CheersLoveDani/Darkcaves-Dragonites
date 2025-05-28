import React from "react";
import { combineClasses } from "../../utils/designTokens";

interface LoadingSkeletonProps {
  variant?: "text" | "avatar" | "card" | "stat-bar" | "pokemon-card";
  width?: string;
  height?: string;
  className?: string;
  lines?: number; // For text variant
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = "text",
  width,
  height,
  className = "",
  lines = 1,
}) => {
  const baseClasses = combineClasses(
    "animate-pulse bg-gray-200 dark:bg-gray-700",
    "rounded-md"
  );

  const getVariantClasses = () => {
    switch (variant) {
      case "avatar":
        return "rounded-full w-10 h-10";
      case "card":
        return "rounded-lg h-48 w-full";
      case "stat-bar":
        return "h-4 w-full rounded-full";
      case "pokemon-card":
        return "rounded-lg h-64 w-48";
      default: // text
        return "h-4 rounded";
    }
  };

  const variantClasses = getVariantClasses();
  const style = {
    ...(width && { width }),
    ...(height && { height }),
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={combineClasses("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={combineClasses(baseClasses, variantClasses)}
            style={{
              ...style,
              width: index === lines - 1 ? "75%" : "100%", // Make last line shorter
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={combineClasses(baseClasses, variantClasses, className)}
      style={style}
    />
  );
};

export default LoadingSkeleton;
