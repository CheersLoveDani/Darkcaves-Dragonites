// filepath: e:\development\Darkcaves-Dragonites\src\utils\conversion.ts
// Stat conversion utilities between Pokemon and D&D systems

/**
 * Convert Pokemon base stat to D&D ability score (8-18 range)
 */
export function pokemonStatToDnDAbility(pokemonStat: number): number {
  // Pokemon stats typically range from ~20-255
  // Map to D&D range of 8-18 (standard array range)
  const min = 8;
  const max = 18;
  const pokemonMin = 20;
  const pokemonMax = 255;

  // Clamp pokemon stat to expected range
  const clampedStat = Math.max(pokemonMin, Math.min(pokemonMax, pokemonStat));

  // Linear interpolation to D&D range
  const normalized = (clampedStat - pokemonMin) / (pokemonMax - pokemonMin);
  const dndScore = Math.round(min + normalized * (max - min));

  return Math.max(min, Math.min(max, dndScore));
}

/**
 * Calculate D&D ability modifier from ability score
 */
export function getAbilityModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2);
}

/**
 * Convert Pokemon HP to D&D Hit Points
 */
export function pokemonHpToDnDHp(pokemonHp: number, level: number = 1): number {
  // Scale Pokemon HP (typically 20-255) to reasonable D&D HP
  // Account for level scaling
  const baseHp = Math.floor(pokemonHp * 0.5); // Reduce scale
  return Math.max(1, baseHp + (level - 1) * 5);
}

/**
 * Convert Pokemon speed to D&D movement speed (feet)
 */
export function pokemonSpeedToDnDSpeed(pokemonSpeed: number): number {
  // Pokemon speed typically 5-200
  // D&D speed typically 20-40 feet
  const minSpeed = 20;
  const maxSpeed = 50;
  const pokemonMin = 5;
  const pokemonMax = 200;

  const clampedSpeed = Math.max(pokemonMin, Math.min(pokemonMax, pokemonSpeed));
  const normalized = (clampedSpeed - pokemonMin) / (pokemonMax - pokemonMin);
  const dndSpeed = Math.round(minSpeed + normalized * (maxSpeed - minSpeed));

  // Round to nearest 5 feet (D&D convention)
  return Math.round(dndSpeed / 5) * 5;
}

/**
 * Calculate Challenge Rating based on Pokemon stats
 */
export function calculateChallengeRating(pokemon: { baseStats: any }): number {
  const { hp, attack, defense, specialAttack, specialDefense, speed } =
    pokemon.baseStats;

  // Simple CR calculation based on total base stats
  const totalStats =
    hp + attack + defense + specialAttack + specialDefense + speed;

  if (totalStats <= 300) return 0.25;
  if (totalStats <= 400) return 0.5;
  if (totalStats <= 500) return 1;
  if (totalStats <= 600) return 2;
  if (totalStats <= 700) return 3;

  return Math.min(5, Math.floor(totalStats / 150));
}
