// filepath: e:\development\Darkcaves-Dragonites\src\utils\validation.ts
// Validation utilities

/**
 * Check if a Pokemon ID is valid
 */
export function isValidPokemonId(id: number): boolean {
  return id > 0 && id <= 1025; // Current max Pokemon ID
}

/**
 * Check if a string is a valid Pokemon name format
 */
export function isValidPokemonName(name: string): boolean {
  return (
    /^[a-zA-Z0-9\-\s]+$/.test(name) && name.length > 0 && name.length <= 50
  );
}

/**
 * Validate D&D ability score range
 */
export function isValidAbilityScore(score: number): boolean {
  return score >= 1 && score <= 30;
}

/**
 * Validate D&D ability modifier
 */
export function isValidAbilityModifier(modifier: number): boolean {
  return modifier >= -5 && modifier <= 10;
}

/**
 * Check if Pokemon stat is in valid range
 */
export function isValidPokemonStat(stat: number): boolean {
  return stat >= 1 && stat <= 255;
}

/**
 * Validate challenge rating
 */
export function isValidChallengeRating(cr: number): boolean {
  const validCRs = [
    0, 0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  return validCRs.includes(cr);
}

/**
 * Sanitize user input string
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}
