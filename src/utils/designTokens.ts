// Design System Tokens
// Centralized design values for consistent theming

export const pokemonTypeColors = {
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  electric: "#F8D030",
  grass: "#78C850",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
} as const;

export const dndColors = {
  legendary: "#FFD700",
  epic: "#9A4DFF",
  rare: "#4A90E2",
  uncommon: "#50C878",
  common: "#808080",
  damage: "#DC143C",
  healing: "#228B22",
  magic: "#9932CC",
  divine: "#FFE55C",
  arcane: "#6A5ACD",
} as const;

export const componentSizes = {
  xs: {
    padding: "px-2 py-1",
    text: "text-xs",
    height: "h-6",
    icon: "w-3 h-3",
  },
  sm: {
    padding: "px-3 py-1.5",
    text: "text-sm",
    height: "h-8",
    icon: "w-4 h-4",
  },
  md: {
    padding: "px-4 py-2",
    text: "text-base",
    height: "h-10",
    icon: "w-5 h-5",
  },
  lg: {
    padding: "px-6 py-3",
    text: "text-lg",
    height: "h-12",
    icon: "w-6 h-6",
  },
  xl: {
    padding: "px-8 py-4",
    text: "text-xl",
    height: "h-14",
    icon: "w-7 h-7",
  },
} as const;

export const elevation = {
  none: "shadow-none",
  sm: "shadow-sm",
  base: "shadow-card",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  hover: "shadow-card-hover",
  pokemon: "shadow-pokemon",
  dnd: "shadow-dnd",
} as const;

export const borderRadius = {
  none: "rounded-none",
  sm: "rounded-sm",
  base: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
} as const;

export const spacing = {
  none: "0",
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
} as const;

export const typography = {
  fontFamily: {
    pokemon: "font-pokemon",
    fantasy: "font-fantasy",
    mono: "font-mono",
    sans: "font-sans",
    serif: "font-serif",
  },
  fontSize: {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  },
  fontWeight: {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  },
} as const;

export const animations = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  pulse: "animate-pulse",
  pulseSlow: "animate-pulse-slow",
  bounce: "animate-bounce",
  bounceGentle: "animate-bounce-gentle",
  spin: "animate-spin",
} as const;

export const transitions = {
  none: "transition-none",
  all: "transition-all",
  colors: "transition-colors",
  colorsAndShadow: "transition-colors-shadow",
  transform: "transition-transform",
  duration: {
    fast: "duration-150",
    normal: "duration-300",
    slow: "duration-500",
  },
  ease: {
    linear: "ease-linear",
    in: "ease-in",
    out: "ease-out",
    inOut: "ease-in-out",
  },
} as const;

// Helper functions for consistent styling
export const getTypeColor = (type: string): string => {
  return (
    pokemonTypeColors[type as keyof typeof pokemonTypeColors] ||
    pokemonTypeColors.normal
  );
};

export const getDndColor = (rarity: string): string => {
  return dndColors[rarity as keyof typeof dndColors] || dndColors.common;
};

export const getComponentSize = (size: keyof typeof componentSizes) => {
  return componentSizes[size];
};

export const getElevation = (level: keyof typeof elevation) => {
  return elevation[level];
};

export const combineClasses = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
