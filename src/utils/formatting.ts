// filepath: e:\development\Darkcaves-Dragonites\src\utils\formatting.ts
// Formatting utilities for display

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Format Pokemon name from API format to display format
 */
export function formatPokemonName(name: string): string {
  return name
    .split("-")
    .map((part) => capitalize(part))
    .join(" ");
}

/**
 * Format ability modifier with proper sign
 */
export function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

/**
 * Format Pokemon ID with leading zeros
 */
export function formatPokemonId(id: number): string {
  return id.toString().padStart(3, "0");
}

/**
 * Convert camelCase to Title Case
 */
export function camelCaseToTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
}

/**
 * Format stat value for display
 */
export function formatStatValue(value: number): string {
  return value.toString();
}

/**
 * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 */
export function getOrdinalSuffix(num: number): string {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }

  switch (lastDigit) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
