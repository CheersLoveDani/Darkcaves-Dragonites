# Darkcaves & Dragonites - Pokemon to D&D Stats Converter

A desktop application that converts Pokemon game statistics into D&D 5e compatible stats for tabletop RPG play. Built with Tauri, React, and TypeScript.

## Project Overview

This app serves TTRPG players who want to incorporate Pokemon into their D&D campaigns by:
- Converting Pokemon base stats (HP, Attack, Defense, etc.) into D&D ability scores and modifiers
- Translating Pokemon moves into D&D spells and abilities
- Managing captured Pokemon collections for players
- Providing stat blocks compatible with D&D 5e mechanics

## Development Plan

### Phase 1: Core Foundation (Weeks 1-2)
- [ ] Set up project structure and basic UI components
- [ ] Implement Pokemon data source (API integration or local database)
- [ ] Create basic stat conversion algorithms
- [ ] Design main application layout and navigation

### Phase 2: Pokemon Data Management (Weeks 3-4)
- [ ] Pokemon search and display functionality
- [ ] Detailed Pokemon information views
- [ ] Base stat to D&D ability score conversion
- [ ] Type effectiveness to damage resistance/vulnerability mapping
- [ ] Move translation to spells/abilities

### Phase 3: Collection Management (Weeks 5-6)
- [ ] User profile and party management
- [ ] Pokemon capture/collection system
- [ ] Save/load player data locally
- [ ] Export Pokemon stat blocks to various formats (PDF, text, etc.)

### Phase 4: Advanced Features (Weeks 7-8)
- [ ] Custom stat conversion rules and modifiers
- [ ] Level scaling for Pokemon stats
- [ ] Integration with popular VTT platforms (Roll20, Foundry)
- [ ] Advanced search and filtering options

### Phase 5: Polish & Distribution (Weeks 9-10)
- [ ] UI/UX improvements and theming
- [ ] Performance optimization
- [ ] Testing and bug fixes
- [ ] Build distribution packages for Windows/Mac/Linux

## Technical Architecture

### Frontend (React + TypeScript)
- **Components**: Pokemon cards, stat displays, collection management
- **State Management**: Context API or Zustand for app state
- **Styling**: Tailwind CSS or styled-components
- **Routing**: React Router for navigation

### Backend (Rust via Tauri)
- **Data Storage**: SQLite for local Pokemon collections
- **API Integration**: Fetch Pokemon data from PokeAPI
- **File Operations**: Export functionality for stat blocks
- **System Integration**: Native file dialogs and notifications

### Data Models
```typescript
interface Pokemon {
  id: number;
  name: string;
  baseStats: BaseStats;
  types: PokemonType[];
  moves: Move[];
  abilities: Ability[];
}

interface DnDStatBlock {
  abilityScores: AbilityScores;
  armorClass: number;
  hitPoints: number;
  speed: number;
  skills: Skill[];
  resistances: DamageType[];
  actions: Action[];
}
```

## Stat Conversion Logic

### Base Stats to Ability Scores
- **HP** → Constitution (scaled to 8-20 range)
- **Attack** → Strength (physical moves) / Charisma (special moves)
- **Defense** → Constitution modifier for AC calculation
- **Sp. Attack** → Intelligence or Wisdom
- **Sp. Defense** → Wisdom modifier for saving throws
- **Speed** → Dexterity and movement speed

### Combat Integration
- Pokemon moves become spell-like abilities
- Type effectiveness translates to damage resistances/vulnerabilities
- Pokemon abilities become special traits or features

## Installation & Development

### Prerequisites
- Node.js 18+
- Rust 1.70+
- pnpm (recommended) or npm

### Development Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm tauri dev

# Build for production
pnpm tauri build
```

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
