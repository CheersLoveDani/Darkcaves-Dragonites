import { useState } from "react";
import { Layout } from "./components/layout";
import {
  Button,
  SearchBar,
  Modal,
  FilterDropdown,
  PokemonCard,
  PokemonList,
  TypeBadge,
  StatBar,
  StatBlock,
  AbilityScore,
} from "./components";
import "./App.css";

// Sample data for demonstration
const samplePokemon = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  baseStats: {
    hp: 35,
    attack: 55,
    defense: 40,
    specialAttack: 50,
    specialDefense: 50,
    speed: 90,
  },
  stats: [
    { base_stat: 35, effort: 0, stat: { name: "hp", url: "" } },
    { base_stat: 55, effort: 0, stat: { name: "attack", url: "" } },
    { base_stat: 40, effort: 0, stat: { name: "defense", url: "" } },
    { base_stat: 50, effort: 0, stat: { name: "special-attack", url: "" } },
    { base_stat: 50, effort: 0, stat: { name: "special-defense", url: "" } },
    { base_stat: 90, effort: 0, stat: { name: "speed", url: "" } },
  ],
  types: [{ slot: 1, type: { name: "electric", url: "" } }],
  moves: [
    {
      name: "thunder-shock",
      power: 40,
      accuracy: 100,
      pp: 30,
      moveType: "electric",
      damageClass: "special",
      description:
        "A jolt of electricity crashes down on the target to inflict damage.",
      level: 1,
    },
    {
      name: "quick-attack",
      power: 40,
      accuracy: 100,
      pp: 30,
      moveType: "normal",
      damageClass: "physical",
      description:
        "The user lunges at the target at a speed that makes it almost invisible.",
      level: 6,
    },
  ],
  abilities: [
    {
      ability: { name: "static", url: "" },
      is_hidden: false,
      slot: 1,
    },
  ],
  sprites: {
    frontDefault:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  species: { name: "pikachu", url: "" },
};

const sampleDnDCreature = {
  name: "Pikachu",
  type: "fey",
  size: "Small",
  alignment: "chaotic good",
  armorClass: 13,
  hitPoints: "27 (6d6 + 6)",
  speed: "30 ft.",
  stats: {
    strength: 8,
    dexterity: 16,
    constitution: 12,
    intelligence: 10,
    wisdom: 12,
    charisma: 15,
  },
  skills: {
    acrobatics: 5,
    perception: 3,
  },
  senses: "darkvision 60 ft., passive Perception 13",
  languages: "understands Common but can't speak",
  challengeRating: "1/2",
  proficiencyBonus: "+2",
  traits: [
    {
      name: "Static",
      description:
        "When a creature touches Pikachu or hits it with a melee attack while within 5 feet, the creature must make a DC 12 Constitution saving throw or be stunned until the end of their next turn.",
    },
  ],
  actions: [
    {
      name: "Thunder Shock",
      description:
        "Ranged Spell Attack: +5 to hit, range 60 ft., one target. Hit: 7 (2d4 + 2) lightning damage. The target must make a DC 12 Constitution saving throw or be paralyzed until the end of their next turn.",
    },
  ],
};

const filterOptions = [
  { label: "Electric", value: "electric", count: 15 },
  { label: "Fire", value: "fire", count: 23 },
  { label: "Water", value: "water", count: 31 },
  { label: "Grass", value: "grass", count: 27 },
  { label: "Flying", value: "flying", count: 19 },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <Layout>
      <div className="space-y-8 p-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Darkcaves & Dragonites
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Convert Pokemon stats to D&D 5e format
          </p>

          {/* Search and Filter Demo */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              {" "}
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                onSearch={(query) => console.log("Searching for:", query)}
                placeholder="Search for Pokemon..."
                onClear={() => setSearchTerm("")}
              />
            </div>
            <div className="w-full sm:w-64">
              <FilterDropdown
                label="Filter by Type"
                options={filterOptions}
                selectedValues={selectedFilters}
                onSelectionChange={setSelectedFilters}
                placeholder="Select types..."
              />
            </div>
          </div>

          {/* Button Demo */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              View D&D Stats
            </Button>
            <Button variant="secondary">Add to Party</Button>
            <Button variant="outline">Export</Button>
            <Button variant="ghost" size="sm">
              Random Pokemon
            </Button>
          </div>
        </div>

        {/* Pokemon Display Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pokemon Card Demo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Pokemon Card (Compact)
            </h2>
            <PokemonCard
              pokemon={samplePokemon}
              variant="compact"
              onClick={() => console.log("Pokemon clicked!")}
            />
          </div>

          {/* Detailed Pokemon Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Pokemon Card (Detailed)
            </h2>
            <PokemonCard pokemon={samplePokemon} variant="detailed" />
          </div>
        </div>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Type Badges */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Type Badges
            </h3>
            <div className="flex flex-wrap gap-2">
              <TypeBadge type="electric" size="sm" />
              <TypeBadge type="fire" size="md" />
              <TypeBadge type="water" size="lg" />
              <TypeBadge type="grass" />
              <TypeBadge type="flying" />
            </div>
          </div>

          {/* Stat Bars */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Stat Bars
            </h3>
            <div className="space-y-3">
              <StatBar label="HP" value={35} />
              <StatBar label="Attack" value={55} />
              <StatBar label="Defense" value={40} />
              <StatBar label="Speed" value={90} />
            </div>
          </div>

          {/* Ability Scores */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              D&D Ability Scores
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <AbilityScore label="STR" value={8} />
              <AbilityScore label="DEX" value={16} />
              <AbilityScore label="CON" value={12} />
              <AbilityScore label="INT" value={10} />
              <AbilityScore label="WIS" value={12} />
              <AbilityScore label="CHA" value={15} />
            </div>
          </div>
        </div>

        {/* Pokemon List Demo */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Pokemon List Demo
          </h2>
          <PokemonList
            pokemon={[samplePokemon, samplePokemon, samplePokemon]}
            viewMode="grid"
            onPokemonSelect={(pokemon) =>
              console.log("Selected:", pokemon.name)
            }
          />
        </div>

        {/* Modal Demo */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="D&D 5e Stat Block"
          size="xl"
        >
          <StatBlock creature={sampleDnDCreature} />
        </Modal>
      </div>
    </Layout>
  );
}

export default App;
