Here's your updated **State-System Architecture (SSA)** Markdown — fully reflecting your clarified vision, initialization flow, and folder structure logic:

---

# 📘 State-System Architecture (SSA)

A principled architectural pattern for simulations, games, and dynamic logic-driven apps, where state evolves through actions and time, and truth is owned exclusively by the engine.

---

## 🔷 Core Philosophy

- The entire app is modeled as a **single world state**, composed of relational entities.
- **Entities hold only state** — no behavior, no side effects.
- **Systems are pure** — they return new state, never mutate existing state.
- All updates are triggered by either:
  - A **player action**, or
  - A **time tick** (handled by the game engine).
- Redux (if used) is a **mirror**, not the source of truth — it holds a copy of the current world state for the UI.

---

## 🔷 Game Initialization Flow

1. User clicks **"New Game"**
2. `newGame()` generates an initial `world`
3. The Redux store is **created dynamically** using the `world` as initial state
4. The game engine is started and receives a callback to `dispatch(updateWorld(world))`
5. The game engine holds the `world` as a mutable reference (via reassignment, not mutation)
6. Each time state changes (due to time or action), the game engine:
   - Runs the logic
   - Assigns `world = newWorld`
   - Calls the injected Redux dispatch function to update the UI

> This avoids circular dependencies and ensures the game engine is always in charge.

---

## 🔷 File & Folder Structure

```txt
/src
  /through-the-veil
    /game
      game.ts              # Public API and world holder (start, tick, actions)
      /entities            # character.ts, location.ts (define types + state shape)
      /actions             # takeYouthPills.ts, moveTo.ts (input-side)
      /systems             # aging.ts, movement.ts, logic.ts (effect-side)
      /utils               # game rules, selectors, generators
      newGame.ts           # deterministic world generator
    /ui
      through-the-veil.tsx # Entry point — creates store + game
      /player-ui           # Player UI logic
      /components          # Reusable view components
```

---

## 🔷 Architectural Layers

### 🌍 World State

- Held in-memory inside `game/game.ts`
- Passed immutably into systems and actions
- Reassigned after each update
- Dispatched to Redux after change

### 🧍 Entities

- Defined as plain TypeScript types inside `/entities/`
- Examples: `Character`, `Location`, `Item`
- No methods, just state

### ⚙️ Systems

- Pure logic modules that return a modified copy of state
- Never mutate input
- Examples: `agingSystem(world)`, `movementSystem(world)`

### 🎮 Actions

- Represent what a player _does_
- Called by the game engine
- Return new world state
- Examples: `takeYouthPills(world, charId)`, `moveTo(world, charId, locationId)`

### 🧠 Game Engine (`index.ts`)

- Holds:
  - `let world: WorldState`
  - `let dispatch: (world: WorldState) => void`
- Exposes:
  - `startNewGame(dispatch)`
  - `applyPlayerAction(...)`
  - `tick()`
- Internally:
  - Reassigns `world = fn(world)`
  - Calls `dispatch(world)` after each update

---

## 🔷 State Change Lifecycle

```ts
// Inside game/game.ts

function tick() {
  world = agingSystem(world)
  dispatch(world)
}

function takeYouthPills(charId: string) {
  world = takeYouthPillsAction(world, charId)
  dispatch(world)
}
```

> This pattern is used for _every_ kind of update. Logic always returns a new world. `game.ts` owns and updates the world.

---

## 🔷 UI and Redux

- The **UI never triggers state changes directly**
- UI components dispatch **player intent** via game API
- Redux exists only to hold the current `world` state for display
- Redux is dynamically created _after_ the game is initialized

---

## 🔷 Key Design Principles

| Principle              | Description                                                             |
| ---------------------- | ----------------------------------------------------------------------- |
| Separation of Concerns | Entities = state, Systems = logic, Engine = control, UI = view          |
| Pure Functions         | Logic is stateless and deterministic                                    |
| Single Source of Truth | `world` lives in `game/game.ts`, not in Redux                           |
| Dispatch Mirrors State | Redux is updated only when `world` changes                              |
| Projected Views        | If needed, `projectView(world)` can transform state for UI optimization |
| No Side Effects        | Systems cannot access dispatch, random, or external state               |

---

## ✅ Benefits

- 🧪 Fully testable game logic (no mocks, no setup)
- 🔁 Deterministic causal chains
- 🧠 Easier to reason about
- 🚫 No accidental mutation or state bleed
- ♻️ Time and action unify under a single model
- 🧩 UI logic completely decoupled from game logic

---

## 🧭 Summary

State-System Architecture provides an elegant, testable, modular, and fully deterministic foundation for logic-driven apps. With a single mutable root (`world`), pure functional logic, and clean UI decoupling, it is the most scalable and robust default pattern for building complex, simulation-style games.
