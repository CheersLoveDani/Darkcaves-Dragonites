// filepath: e:\development\Darkcaves-Dragonites\src\components\pokemon\TypeBadge.tsx
import React from "react";
import {
  getTypeColor,
  getComponentSize,
  combineClasses,
  transitions,
  elevation,
} from "../../utils/designTokens";

interface TypeBadgeProps {
  type: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "solid" | "outline" | "subtle";
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({
  type,
  size = "md",
  variant = "solid",
  className = "",
}) => {
  const normalizedType = type.toLowerCase();
  const typeColor = getTypeColor(normalizedType);
  const sizeConfig = getComponentSize(size);

  // Calculate if the background is light or dark to determine text color
  const isLight = (color: string) => {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 155;
  };

  const getVariantStyles = () => {
    const textColor = isLight(typeColor) ? "#000000" : "#FFFFFF";

    switch (variant) {
      case "outline":
        return {
          backgroundColor: "transparent",
          color: typeColor,
          border: `2px solid ${typeColor}`,
        };
      case "subtle":
        return {
          backgroundColor: `${typeColor}20`, // 20% opacity
          color: typeColor,
        };
      default: // solid
        return {
          backgroundColor: typeColor,
          color: textColor,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <span
      className={combineClasses(
        "inline-flex items-center justify-center rounded-full font-medium capitalize",
        "border-0", // Reset border for variants that don't use it
        sizeConfig.padding,
        sizeConfig.text,
        transitions.colorsAndShadow,
        transitions.duration.normal,
        elevation.sm,
        "hover:scale-105 transform",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500",
        className
      )}
      style={variantStyles}
      title={`${type.charAt(0).toUpperCase() + type.slice(1)} type`}
    >
      {type}
    </span>
  );
};

export default TypeBadge;
