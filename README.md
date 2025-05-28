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

#### 1.1 Project Structure Setup (Days 1-3)
- [~] **Frontend Structure**
  - [~] Create `src/components` directory for reusable UI components
  - [~] Create `src/pages` directory for main application views
  - [~] Create `src/hooks` directory for custom React hooks
  - [~] Create `src/utils` directory for helper functions
  - [x] Create `src/types` directory for TypeScript interfaces
  - [~] Create `src/stores` directory for state management
  - [x] Create `src/services` directory for API calls and data handling

- [x] **Backend Structure (Rust/Tauri)**
  - [x] Organize `src-tauri/src` with modules:
    - [x] `pokemon.rs` - Pokemon data handling
    - [x] `converter.rs` - Stat conversion logic
    - [x] `database.rs` - SQLite operations
    - [x] `commands.rs` - Tauri command definitions
  - [x] Set up Cargo.toml dependencies (serde, sqlx, reqwest)

- [x] **Configuration & Tooling**
  - [x] Configure Tailwind CSS for styling
  - [x] Set up ESLint and Prettier for code formatting
  - [x] Configure path aliases in tsconfig.json
  - [x] Set up environment variables for API keys

#### 1.2 Core UI Components (Days 4-7)
- [ ] **Layout Components**
  - [ ] `Header` - Navigation bar with app title and menu
  - [ ] `Sidebar` - Navigation menu for different sections
  - [ ] `Layout` - Main application wrapper component
  - [ ] `Footer` - App info and status indicators

- [ ] **Pokemon Display Components**
  - [ ] `PokemonCard` - Compact Pokemon display with image and basic info
  - [ ] `PokemonList` - Grid/list view for multiple Pokemon
  - [ ] `StatBar` - Visual representation of Pokemon stats
  - [ ] `TypeBadge` - Pokemon type indicator with appropriate styling

- [ ] **Form Components**
  - [ ] `SearchBar` - Pokemon search functionality
  - [ ] `FilterDropdown` - Filter Pokemon by type, generation, etc.
  - [ ] `Button` - Reusable button component with variants
  - [ ] `Modal` - Popup component for detailed views

- [ ] **D&D Stat Components**
  - [ ] `StatBlock` - D&D 5e style stat block display
  - [ ] `AbilityScore` - Individual ability score with modifier
  - [ ] `SkillList` - Display of skills and proficiencies
  - [ ] `ActionList` - Pokemon moves as D&D actions

#### 1.3 Basic Styling System (Days 8-10)
- [ ] **Design System Setup**
  - [ ] Define color palette (Pokemon-themed with D&D elements)
  - [ ] Set up typography scale and font imports
  - [ ] Create spacing and sizing utilities
  - [ ] Define component variants and states

- [ ] **Theme Configuration**
  - [ ] Light/dark mode toggle functionality
  - [ ] CSS custom properties for dynamic theming
  - [ ] Responsive breakpoints for mobile/desktop
  - [ ] Animation and transition utilities

- [ ] **Component Styling**
  - [ ] Style all basic UI components
  - [ ] Implement hover and focus states
  - [ ] Add loading and disabled states
  - [ ] Create consistent spacing and layout patterns

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
