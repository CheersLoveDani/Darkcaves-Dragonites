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

#### 1.1 Project Structure Setup (Days 1-3) ✅ COMPLETE
- [x] **Frontend Structure**
  - [x] Create `src/components` directory for reusable UI components
  - [x] Create `src/pages` directory for main application views
  - [x] Create `src/hooks` directory for custom React hooks
  - [x] Create `src/utils` directory for helper functions (with conversion, formatting, validation utilities)
  - [x] Create `src/types` directory for TypeScript interfaces
  - [x] Create `src/stores` directory for state management
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

#### 1.2 Core UI Components (Days 4-7) ✅ COMPLETE
- [x] **Layout Components**
  - [x] `Header` - Navigation bar with app title and menu
  - [x] `Sidebar` - Navigation menu for different sections
  - [x] `Layout` - Main application wrapper component
  - [x] `Footer` - App info and status indicators
  - [x] `VersionDisplay` - Permanent version number display in bottom-right corner

- [x] **Pokemon Display Components**
  - [x] `PokemonCard` - Compact Pokemon display with image and basic info
  - [x] `PokemonList` - Grid/list view for multiple Pokemon
  - [x] `StatBar` - Visual representation of Pokemon stats
  - [x] `TypeBadge` - Pokemon type indicator with appropriate styling

- [x] **Form Components**
  - [x] `SearchBar` - Pokemon search functionality
  - [x] `FilterDropdown` - Filter Pokemon by type, generation, etc.
  - [x] `Button` - Reusable button component with variants
  - [x] `Modal` - Popup component for detailed views

- [x] **D&D Stat Components**
  - [x] `StatBlock` - D&D 5e style stat block display
  - [x] `AbilityScore` - Individual ability score with modifier
  - [x] `SkillList` - Display of skills and proficiencies
  - [x] `ActionList` - Pokemon moves as D&D actions

#### 1.3 Basic Styling System (Days 8-10)
- [x] **Design System Setup**
  - [x] Enhance color palette with Pokemon type colors (fire: red/orange, water: blue, grass: green, etc.)
  - [x] Use Pokemon-themed accent colors (electric yellow, psychic pink, dragon purple for highlights)
  - [x] Import and configure Pokemon-themed fonts (Orbitron for headers, system fonts for body)  - [x] Create component size scale (xs, sm, md, lg, xl) for consistent sizing
  - [x] Define elevation/shadow system for cards and modals
  - [x] Set up icon system (Pokemon types, stat categories, UI actions)

- [x] **Theme Configuration**
  - [x] Implement light/dark mode toggle with persistent storage
  - [x] Create CSS custom properties for dynamic color switching
  - [x] Configure responsive breakpoints (mobile: 640px, tablet: 768px, desktop: 1024px)
  - [x] Add smooth transitions and micro-animations (hover, focus, state changes)
  - [x] Set up theme context and provider for React components
  - [x] Create theme-aware utility classes

- [~] **Component Styling Enhancement**
  - [x] Refine Pokemon type badges with official Pokemon type colors
  - [ ] Style stat bars with gradient fills and animations
  - [ ] Enhance Pokemon cards with hover effects and better typography
  - [ ] Style stat blocks with Pokemon-themed colors and consistent layout
  - [x] Add loading skeletons for better perceived performance
  - [x] Implement consistent focus indicators for accessibility
  - [ ] Create error and success state styling for forms

- [~] **Layout and Navigation Polish**
  - [x] Enhance header with logo/branding and navigation menu
  - [ ] Improve sidebar with collapsible sections and icons
  - [ ] Add breadcrumb navigation for multi-level views
  - [x] Implement consistent spacing system throughout the app
  - [x] Create responsive grid layouts for Pokemon collections
  - [x] Add scroll-to-top functionality for long lists

- [x] **Accessibility and UX Improvements**
  - [x] Ensure proper color contrast ratios for WCAG compliance
  - [x] Add keyboard navigation support for all interactive elements
  - [x] Implement screen reader friendly labels and descriptions
  - [x] Add reduced motion preferences support
  - [x] Create consistent loading states and error handling UI
  - [x] Implement proper focus management for modals and forms

- [~] **Performance and Polish**
  - [ ] Optimize component re-renders with React.memo where needed
  - [ ] Add CSS-in-JS or styled-components for dynamic theming
  - [ ] Implement image lazy loading for Pokemon sprites
  - [ ] Add smooth page transitions between different sections
  - [x] Create consistent spacing and typography scale
  - [ ] Set up Storybook for component documentation (optional)

### Phase 2: Pokemon Data Management (Weeks 3-4)

#### 2.1 Data Infrastructure Setup
- [ ] Implement Pokemon data source (API integration or local database)
- [ ] Create basic stat conversion algorithms  
- [ ] Design main application layout and navigation
- [ ] Set up data caching and persistence layer

#### 2.2 Core Functionality
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
