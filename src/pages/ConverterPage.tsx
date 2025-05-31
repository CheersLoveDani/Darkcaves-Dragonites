import React, { useState } from "react";
import { Button, StatBlock } from "../components";

// Sample D&D creature for demonstration
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

export const ConverterPage: React.FC = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("pikachu");
  const [conversionSettings, setConversionSettings] = useState({
    scaleMethod: "linear",
    crAdjustment: "auto",
    includeAbilities: true,
    includeMoves: true,
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Pokemon to D&D Converter
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Convert Pokemon stats to D&D 5e creature stat blocks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversion Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Conversion Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pokemon Selection
              </label>
              <select
                value={selectedPokemon}
                onChange={(e) => setSelectedPokemon(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="pikachu">Pikachu</option>
                <option value="charmander">Charmander</option>
                <option value="squirtle">Squirtle</option>
                <option value="bulbasaur">Bulbasaur</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Stat Scaling Method
              </label>
              <select
                value={conversionSettings.scaleMethod}
                onChange={(e) =>
                  setConversionSettings((prev) => ({
                    ...prev,
                    scaleMethod: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="linear">Linear Scaling</option>
                <option value="logarithmic">Logarithmic Scaling</option>
                <option value="bounded">Bounded Scaling</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Challenge Rating
              </label>
              <select
                value={conversionSettings.crAdjustment}
                onChange={(e) =>
                  setConversionSettings((prev) => ({
                    ...prev,
                    crAdjustment: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="auto">Auto Calculate</option>
                <option value="0">0 (10 XP)</option>
                <option value="1/8">1/8 (25 XP)</option>
                <option value="1/4">1/4 (50 XP)</option>
                <option value="1/2">1/2 (100 XP)</option>
                <option value="1">1 (200 XP)</option>
                <option value="2">2 (450 XP)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={conversionSettings.includeAbilities}
                  onChange={(e) =>
                    setConversionSettings((prev) => ({
                      ...prev,
                      includeAbilities: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Include Pokemon abilities as traits
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={conversionSettings.includeMoves}
                  onChange={(e) =>
                    setConversionSettings((prev) => ({
                      ...prev,
                      includeMoves: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Convert moves to actions
                </span>
              </label>
            </div>

            <div className="pt-4">
              <Button variant="primary" className="w-full">
                Convert to D&D
              </Button>
            </div>
          </div>
        </div>

        {/* Generated Stat Block */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Generated D&D Stat Block
          </h2>

          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <StatBlock creature={sampleDnDCreature} />
          </div>

          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              Export as PDF
            </Button>
            <Button variant="outline" size="sm">
              Copy to Clipboard
            </Button>
            <Button variant="outline" size="sm">
              Save to Collection
            </Button>
          </div>
        </div>
      </div>

      {/* Conversion Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          How Conversion Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Base Stats
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pokemon base stats are converted to D&D ability scores using
              configurable scaling methods.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Types & Abilities
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pokemon types influence creature type and resistances, while
              abilities become special traits.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Moves & Actions
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Pokemon moves are converted to D&D actions with appropriate damage
              types and effects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConverterPage;
