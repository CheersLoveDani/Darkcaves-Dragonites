// filepath: e:\development\Darkcaves-Dragonites\src\components\pokemon\TypeBadge.tsx
import React from "react";
import { POKEMON_TYPE_COLORS } from "../../utils/constants";

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const typeSizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-2 text-base",
};

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  size = "md",
  className = "",
}) => {
  const normalizedType = type.toLowerCase() as keyof typeof POKEMON_TYPE_COLORS;
  const backgroundColor = POKEMON_TYPE_COLORS[normalizedType] || "#68D391";

  // Calculate if the background is light or dark to determine text color
  const isLight = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const textColor = isLight(backgroundColor) ? "#000000" : "#FFFFFF";
  const sizeClasses = typeSizes[size];

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium capitalize ${sizeClasses} ${className}`}
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
