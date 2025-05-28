// D&D 5e types and interfaces
export interface DnDStatBlock {
  abilityScores: AbilityScores;
  armorClass: number;
  hitPoints: number;
  speed: number;
  skills: Skill[];
  resistances: DamageType[];
  vulnerabilities: DamageType[];
  immunities: DamageType[];
  actions: Action[];
  challengeRating: number;
  proficiencyBonus: number;
  savingThrows: SavingThrow[];
}

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Skill {
  name: string;
  modifier: number;
  proficient: boolean;
  expertise: boolean;
}

export enum DamageType {
  Acid = "acid",
  Bludgeoning = "bludgeoning",
  Cold = "cold",
  Fire = "fire",
  Force = "force",
  Lightning = "lightning",
  Necrotic = "necrotic",
  Piercing = "piercing",
  Poison = "poison",
  Psychic = "psychic",
  Radiant = "radiant",
  Slashing = "slashing",
  Thunder = "thunder",
}

export interface Action {
  name: string;
  description: string;
  attackBonus?: number;
  damageDice?: string;
  damageType?: DamageType;
  range?: string;
  recharge?: string;
  actionType: ActionType;
}

export enum ActionType {
  Action = "action",
  BonusAction = "bonus_action",
  Reaction = "reaction",
  Legendary = "legendary",
}

export interface SavingThrow {
  ability: keyof AbilityScores;
  modifier: number;
  proficient: boolean;
}

// Conversion settings
export interface ConversionSettings {
  levelMultiplier: number;
  statScaling: StatScaling;
  useCustomRules: boolean;
  customRules: CustomRule[];
}

export interface StatScaling {
  hpMultiplier: number;
  attackMultiplier: number;
  defenseMultiplier: number;
  speedMultiplier: number;
  minAbilityScore: number;
  maxAbilityScore: number;
}

export interface CustomRule {
  id: string;
  name: string;
  description: string;
  condition: string; // JSON representation of condition
  effect: string; // JSON representation of effect
  enabled: boolean;
}

// Additional types for complete D&D creature representation
export interface DnDStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface DnDAction {
  name: string;
  description: string;
  attackBonus?: string;
  damage?: string;
  damageType?: string;
  additionalDamage?: string;
  savingThrow?: string;
  reach?: string;
  range?: string;
  targets?: string;
  recharge?: string;
  usageLimit?: string;
}

export interface DnDTrait {
  name: string;
  description: string;
}

export interface DnDCreature {
  name: string;
  type: string;
  size: string;
  alignment: string;
  armorClass: number;
  hitPoints: number | string;
  speed: string;
  stats: DnDStats;
  savingThrows?: Record<string, number>;
  skills?: Record<string, number>;
  damageResistances?: string[];
  damageImmunities?: string[];
  conditionImmunities?: string[];
  senses?: string;
  languages?: string;
  challengeRating: string;
  proficiencyBonus?: string;
  traits?: DnDTrait[];
  actions?: DnDAction[];
  reactions?: DnDAction[];
  legendaryActions?: DnDAction[];
}
