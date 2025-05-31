# Darkcaves & Dragonites - Pokemon to D&D Stats Converter

A desktop application that converts Pokemon game statistics into D&D 5e compatible stats for tabletop RPG play. Built with Tauri, React, and TypeScript.

## Progress Key

| Symbol | Meaning      |
|--------|--------------|
| [x]    | Complete     |
| [~]    | In Progress  |
| [ ]    | Not Started  |

## Project Overview

This app serves TTRPG players who want to incorporate Pokemon into their D&D campaigns by:
- Converting Pokemon base stats (HP, Attack, Defense, etc.) into D&D ability scores and modifiers
- Translating Pokemon moves into D&D spells and abilities
- Managing captured Pokemon collections for players
- Providing stat blocks compatible with D&D 5e mechanics

### Pages Overview

The application features several main pages:

1. **Pokedex Page**: Browse all available Pokemon, search/filter, and add Pokemon to your collection.
2. **Trainer Page**: View your trainer profile, including trainer level, D&D-like stats, and an overview of your current party of up to 6 Pokemon.
3. **Pokemon Party Page**: Manage your active party of up to 6 Pokemon, with options to send Pokemon to storage (the box).
4. **Pokemon Box Page**: View and organize all Pokemon in your storage box, with sorting and transfer options to move Pokemon between your box and party.
5. **Individual Pokemon Page**: See detailed information for a specific Pokemon, including game stats, converted D&D stats, moves, abilities, and more.

## Development Plan

### Phase 1: Core Foundation (Weeks 1-2)

#### 1.1 Project Structure Setup (Days 1-3) ✅ COMPLETE
- [x] **1.1.1 Frontend Structure**
  - [x] 1.1.1.1 Create `src/components` directory for reusable UI components
  - [x] 1.1.1.2 Create `src/pages` directory for main application views
  - [x] 1.1.1.3 Create `src/hooks` directory for custom React hooks
  - [x] 1.1.1.4 Create `src/utils` directory for helper functions (with conversion, formatting, validation utilities)
  - [x] 1.1.1.5 Create `src/types` directory for TypeScript interfaces
  - [x] 1.1.1.6 Create `src/stores` directory for state management
  - [x] 1.1.1.7 Create `src/services` directory for API calls and data handling

- [x] **1.1.2 Backend Structure (Rust/Tauri)**
  - [x] 1.1.2.1 Organize `src-tauri/src` with modules:
    - [x] 1.1.2.1.1 `pokemon.rs` - Pokemon data handling
    - [x] 1.1.2.1.2 `converter.rs` - Stat conversion logic
    - [x] 1.1.2.1.3 `database.rs` - SQLite operations
    - [x] 1.1.2.1.4 `commands.rs` - Tauri command definitions
  - [x] 1.1.2.2 Set up Cargo.toml dependencies (serde, sqlx, reqwest)

- [x] **1.1.3 Configuration & Tooling**
  - [x] 1.1.3.1 Configure Tailwind CSS for styling
  - [x] 1.1.3.2 Set up ESLint and Prettier for code formatting
  - [x] 1.1.3.3 Configure path aliases in tsconfig.json
  - [x] 1.1.3.4 Set up environment variables for API keys

#### 1.2 Core UI Components (Days 4-7) ✅ COMPLETE
- [x] **1.2.1 Layout Components**
  - [x] 1.2.1.1 `Header` - Navigation bar with app title and menu
  - [x] 1.2.1.2 `Sidebar` - Navigation menu for different sections
  - [x] 1.2.1.3 `Layout` - Main application wrapper component
  - [x] 1.2.1.4 `Footer` - App info and status indicators
  - [x] 1.2.1.5 `VersionDisplay` - Permanent version number display in bottom-right corner

- [x] **1.2.2 Pokemon Display Components**
  - [x] 1.2.2.1 `PokemonCard` - Compact Pokemon display with image and basic info
  - [x] 1.2.2.2 `PokemonList` - Grid/list view for multiple Pokemon
  - [x] 1.2.2.3 `StatBar` - Visual representation of Pokemon stats
  - [x] 1.2.2.4 `TypeBadge` - Pokemon type indicator with appropriate styling

- [x] **1.2.3 Form Components**
  - [x] 1.2.3.1 `SearchBar` - Pokemon search functionality
  - [x] 1.2.3.2 `FilterDropdown` - Filter Pokemon by type, generation, etc.
  - [x] 1.2.3.3 `Button` - Reusable button component with variants
  - [x] 1.2.3.4 `Modal` - Popup component for detailed views

- [x] **1.2.4 D&D Stat Components**
  - [x] 1.2.4.1 `StatBlock` - D&D 5e style stat block display
  - [x] 1.2.4.2 `AbilityScore` - Individual ability score with modifier
  - [x] 1.2.4.3 `SkillList` - Display of skills and proficiencies
  - [x] 1.2.4.4 `ActionList` - Pokemon moves as D&D actions

#### 1.3 Basic Styling & Functionality (Days 8-10)
- [x] **1.3.1 Design System Setup**
  - [x] 1.3.1.1 Color palette with Pokemon type colors
  - [x] 1.3.1.2 Pokemon-themed fonts and icon system
  - [x] 1.3.1.3 Component size scale and elevation system
- [x] **1.3.2 Theme Configuration**
  - [~] 1.3.2.1 Light/dark mode toggle with persistent storage
  - [x] 1.3.2.2 Responsive breakpoints and smooth transitions
  - [x] 1.3.2.3 Theme context/provider for React
- [x] **1.3.3 Component Functionality**
  - [x] 1.3.3.1 Type badges styled with official colors
  - [x] 1.3.3.2 Loading skeletons for performance
  - [x] 1.3.3.3 Focus indicators and accessibility improvements
- [x] **1.3.4 Layout & Navigation**
  - [x] 1.3.4.1 Enhanced header and navigation
  - [x] 1.3.4.2 Responsive grid layouts for Pokemon collections
  - [x] 1.3.4.3 Scroll-to-top for long lists
- [x] **1.3.5 Accessibility & UX**
  - [x] 1.3.5.1 Color contrast, keyboard navigation, screen reader support
  - [x] 1.3.5.2 Reduced motion preferences
  - [x] 1.3.5.3 Consistent loading and error handling UI
  - [x] 1.3.5.4 Focus management for modals/forms

> Further design and polish tasks will be revisited after core functionality and API integration are complete.

### Phase 2: Pokemon Data Management (Weeks 3-4)

#### 2.1 Data Infrastructure Setup
- [x] 2.1.1 Integrate with PokeAPI (https://pokeapi.co/) for Pokemon data
  - [x] 2.1.1.1 Design TypeScript interfaces for PokeAPI responses (see `src/types/pokemon.ts`)
  - [x] 2.1.1.2 Implement Rust-side Tauri command to fetch data from PokeAPI (handles CORS)
  - [x] 2.1.1.3 Expose Tauri command to frontend for requesting Pokemon data
  - [x] 2.1.1.4 Add error handling and loading states for API requests

> **✅ COMPLETE**: TypeScript interfaces for PokeAPI responses are defined in `src/types/pokemon.ts` and `src/types/index.ts`. Rust-side Tauri commands `fetch_pokemon` and `search_pokemon` are fully implemented in `src-tauri/src/commands.rs` with proper HTTP requests to PokeAPI, error handling, and data transformation from PokeAPI responses to internal Pokemon structures. Frontend service layer in `src/services/tauri.ts` properly exposes these commands, and UI components have comprehensive loading/error state handling.

- [x] 2.1.2 Implement local caching and persistence layer
  - [x] 2.1.2.1 Store fetched Pokemon data in SQLite via Rust backend
  - [x] 2.1.2.2 Add logic to check cache before making API requests
  - [x] 2.1.2.3 Provide cache invalidation/refresh mechanism

> **✅ COMPLETE**: Comprehensive Pokemon caching system implemented with SQLite backend storage. All Pokemon data fetched from PokeAPI is automatically cached with 24-hour TTL. Implemented cache-first data loading strategy (Cache → Database → API fallback) with methods for `cache_pokemon()`, `get_cached_pokemon()`, `is_pokemon_cache_valid()`, cache clearing, and batch retrieval. Frontend service layer includes CacheStats interface and cache management commands (`clear_pokemon_cache`, `clear_expired_cache`, `get_cache_stats`, `get_pokemon_batch`) fully registered in Tauri. Build verification completed successfully.

- [x] 2.1.3 Create Pokedex page with dynamic loading and intelligent caching
  - [x] 2.1.3.1 Implement Pokemon pagination backend commands for efficient data loading
  - [x] 2.1.3.2 Create Pokedex page component with infinite scroll and virtual scrolling
  - [x] 2.1.3.3 Implement smart data loading strategy (cache → database → API fallback)
  - [x] 2.1.3.4 Add Pokemon filtering and search functionality with real-time updates

> **✅ COMPLETE (2.1.3.4)**: Search functionality fully restored and enhanced. Fixed infinite scroll interference with search results by properly disabling the IntersectionObserver when search is active. Search now returns all matching results instantly without pagination conflicts. Improved state management to reset pagination properly when switching between search and normal browsing modes. Added comprehensive logging for debugging and enhanced search performance.

  - [x] 2.1.3.5 Optimize performance with skeleton loading states and intersection observer
  - [x] 2.1.3.6 Add Pokemon detail modal/drawer for quick access without navigation

> **✅ COMPLETE (2.1.3.6)**: Pokemon detail modal functionality implemented using Modal component. Click any Pokemon card to view detailed information in a modal overlay with additional action buttons (Add to Party, View D&D Stats, Export). Modal includes full Pokemon card display and proper focus management.

> **🚧 IMPROVEMENT (Data Loading)**: Enhanced Pokemon data loading system to address missing Pokemon issue. Added bulk initialization commands (`initialize_pokemon_data`, `get_pokemon_list_improved`) to properly populate Pokemon cache from PokeAPI. Implemented user-friendly "Load Gen 1" button for manual data initialization. Improved error handling to guide users when Pokemon data is missing. Updated fallback logic to handle empty cache scenarios gracefully.

> **✅ COMPLETE (2.1.3.2)**: Automatic infinite scroll loading implemented using IntersectionObserver with 100px root margin for early triggering. Replaced manual "load more" button with seamless automatic loading when user scrolls near bottom. Added separate loading states for initial load vs. infinite scroll loading with subtle loading indicators. Enhanced with console logging for debugging and optimized performance with proper state management.
- [ ] 2.1.4 Create basic stat conversion algorithms (TypeScript utils)
  - [ ] 2.1.4.1 Map PokeAPI base stats to D&D ability scores
  - [ ] 2.1.4.2 Implement conversion utility functions
- [~] 2.1.5 Design main application data flow and navigation
  - [x] 2.1.5.1 Define how/when data is loaded (on search, on view, etc.)
  - [x] 2.1.5.2 Update navigation to support data-driven views
  - [ ] 2.1.5.3 Document data flow between frontend, backend, and cache

#### 2.2 Core Functionality
- [ ] 2.2.1 Pokemon search and display functionality
- [ ] 2.2.2 Detailed Pokemon information views
- [ ] 2.2.3 Base stat to D&D ability score conversion
- [ ] 2.2.4 Type effectiveness to damage resistance/vulnerability mapping
- [ ] 2.2.5 Move translation to spells/abilities

### Phase 3: Collection Management (Weeks 5-6)
- [ ] 3.1 User profile and party management
- [ ] 3.2 Pokemon capture/collection system
- [ ] 3.3 Save/load player data locally
- [ ] 3.4 Export Pokemon stat blocks to various formats (PDF, text, etc.)

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
