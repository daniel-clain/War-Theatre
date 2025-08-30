# Veil and Virtue - Foundational Architecture

## 🔄 Core Strategy

This document outlines the established architectural foundation for **Veil and Virtue**, focusing on clear separation between game logic and UI rendering, clean state management, and reliable data flow.

## 🔖 Principles

- **Clean Separation**: The "game" and "UI" are entirely separated. The game is responsible for world logic, state progression, and action resolution. The UI is responsible for displaying the mapped game state.
- **Single Source of Truth**: The `game.ts` file owns the true game state. Redux only mirrors a UI-mapped version of it.
- **Immutable State Updates**: The `game.ts` module never mutates the existing world state directly; updates always create new world objects.
- **No Optional State**: The game state and UI state are always fully defined. No `undefined` or `null` fields.
- **Delayed Store Initialization**: The Redux provider is not mounted until a new game has been created and a store has been generated.
- **UI Components Are Lightweight**: UI components select only the minimal state they need. They know nothing about how the game logic operates.
- **Mapping Layer**: A clean `mapWorldStateToUiState(world)` function derives the UI state from the full world state.

---

## 📌 File Overview

### 1. `ThroughTheVeil.tsx`

- Displays the "Start New Game" button until a game has started.
- Upon starting, it:
  - Generates the initial world state.
  - Creates a Redux store based on a mapped UI state.
  - Passes an `updateUIState` dispatcher function to the game.
- Only once the store exists does it render the `<Provider>` with `<PlayerUi>`.

### 2. `game.ts`

- Responsible for all game logic:
  - `newGame()`: Generates the initial world.
  - `startGame(updateUIState)`: Starts the world simulation and updates the UI state periodically.
  - `doAction(action, args)`: Handles player actions, updating the world and dispatching UI updates.
- `game.ts` is the single source of truth for world state.
- UI is updated **only through** calling `updateUIState(world)`.

### 3. `redux.ts`

- Defines the `UIGameState` type.
- Maps `WorldState` to `UIGameState` through `mapWorldStateToUiState(world)`.
- Creates the Redux store with a single `gameSlice`:
  - `updateGameState(world)`: Accepts a new world state, maps it, and updates the store.
- Exposes `createGameStore(initialState)` that returns the `store` and an `updateUIState` function.

---

## 🌐 Data Flow Summary

```plaintext
User clicks "Start Game"
    ↓
Generate full WorldState (game.newGame())
    ↓
Create Redux Store with mapped UIGameState (createGameStore)
    ↓
Render Provider with Store
    ↓
Game runs (startGame)
    ↓
World updates internally every second
    ↓
Game calls updateUIState(world)
    ↓
Redux updates mapped UIGameState
    ↓
Relevant UI components re-render
```

---

## 🏋️ Key Strengths

- The game and UI are cleanly separated.
- No optional / partial state confusion.
- Predictable, functional-style world updates.
- UI is reactive only to mapped, limited state.
- Easy to extend: can later add saving/loading, restarting, different scenarios.
- Easy to test and debug world logic independently of UI rendering.

---

## ✨ Next Steps for Future Expansion

- Implement a more detailed mapping layer to allow compression or filtering of world data for the UI.
- Expand `doAction` system to track action history and consequences.
- Introduce a "paused" mode where time does not increment.
- Add more sophisticated UI selectors to reduce unnecessary renders.
- Refine the Redux slice structure if needed when the UI grows more complex (e.g., separate slices for log, characters, locations).

---

## 🔹 Guiding Philosophy

> The game should feel alive and rich in internal logic, while the UI remains clean, reactive, and straightforward.

Maintain this strict separation to ensure scalability, maintainability, and long-term clarity of the project.
