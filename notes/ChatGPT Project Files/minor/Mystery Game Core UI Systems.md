# Mystery Game Core UI Systems and Logic Framework

This document consolidates and preserves the design principles, logic structures, and user interface plans for the AI-assisted mystery investigation game. It includes all details from the collaborative brainstorming across multiple exchanges.

---

## 🎯 Game Concept Overview

The player solves a mystery in a procedurally generated fantasy world through logic-based investigation. The AI simulates a living world, manages NPCs and world events, and dynamically adjusts based on player actions and reasoning. The core of the gameplay is rooted in **logical deduction, reasoning chains, and theory testing**.

The system separates responsibilities between:

- **AI** (simulation, content generation, world behavior)
- **Player** (questioning, theorizing, strategic planning)

---

## ⚖️ Key Goals and Design Principles

- Maximize player **agency** by letting them form their own questions, theories, and action plans.
- Allow **honest mistakes** (e.g., red herrings) but gently course-correct when logic proves a dead end.
- Avoid rigid 1-of-5 multiple choice logic; instead, allow flexible, freeform reasoning.
- Design UI tools to help players track knowledge, eliminate clutter, and think clearly.
- Maintain realism through time progression, NPC proactivity, and world reactivity.

---

## 🧠 Terminology Glossary

| Term        | Definition                                                  |
| ----------- | ----------------------------------------------------------- |
| Fact        | Proven truth about the world (objective, confirmed)         |
| Knowledge   | Facts the player or NPC knows                               |
| Information | Any received data (truth value unknown)                     |
| Belief      | Assumed truth used for planning or behavior, but not proven |
| Hypothesis  | Testable possibility used to guide investigation            |
| Question    | Formal unknown the player wants answered                    |
| Answer      | Result of resolving a question through action or inference  |
| Clue        | Information with potential to help solve a mystery          |
| Evidence    | Verified clue that supports/falsifies a hypothesis          |
| Motive      | Character reasoning for potential actions                   |
| Lie         | Contradiction between known facts and stated info           |

These are stored in-game, with metadata (source, time learned, related beliefs, confidence level).

---

## 🌳 Theory Dependency Trees

A critical system where hypotheses, beliefs, and clues form a logical structure:

- Each theory has parent/child links.
- Chain reactions occur:
  - If X is disproven → Y collapses.
  - If A is proven → B collapses, C is validated.
  - If X is disproven → Z is validated.
  - If H is confirmed → priorities shift or plans update.

Supports complex reasoning chains, where evidence ripples through connected logic.

---

## 🧰 Player Tools (UI Panels)

### 1. **Observation Log**

- Stores all character experiences and passive observations.
- Each entry has time, location, perception type, and source.

### 2. **Question Tracker**

- Player logs unknowns they want answers to.
- Mark as answered, invalidated, deferred.
- Optionally link to related beliefs/hypotheses.

### 3. **Hypothesis Builder**

- Player proposes and tracks testable theories.
- Allows recording of supporting or falsifying evidence.
- Supports confidence %, source links, status (active, falsified, proven).

### 4. **World Knowledge Panel**

- Categorized encyclopedia:
  - People (traits, motives, known lies, last seen)
  - Places (events, characters seen, POIs)
  - Objects (ownership, location history, uses)
  - Events (timeline of happenings)

### 5. **Plan Builder (Optional for MVP)**

- 2-step logic support for MVP:
  - "If X lies → go to Y"
  - Used to reduce micromanagement and support contingency-based decisions.

---

## 🧠 AI Simulation Responsibilities

### 1. **Event Queue and Time System**

- Game time runs at 50% real-time.
- Some actions take time (e.g. reading = 5h, answering = 5s).
- Player can fast-forward **to next relevant event**, not just fixed time.
- Fast-forward safeguards:
  - Require at least one upcoming event or variable watch condition.
  - Prevent accidental skips (e.g. player overshooting 2 days).

### 2. **NPC Simulator**

- Main and semi-main characters simulate beliefs, plans, and world reactions.
- Minor NPCs follow event-based reactions only.
- All characters can be fully simulated if needed, but optimization focuses on relevance.

NPC tiers:

- **Core**: Full memory, reasoning, autonomous goals.
- **Semi-main**: Reactive beliefs and partial goal-planning.
- **Extras**: Context-only (e.g. bystanders).

### 3. **Cause-Effect Simulator**

- Supports propagation of logic:
  - Confirming theory → impacts plans and questions
  - World events → updates observations/beliefs across characters
- Also used to simulate what would happen if the player does nothing (parallel simulation).

---

## 🧠 Reasoning Mechanics

### Reasoning Patterns Supported:

- **Deductive reasoning**: "If A, then B. A is true → B is true."
- **Modus Tollens (Contrapositive)**
- **Process of Elimination**
- **Abductive reasoning**: best explanation from incomplete data
- **Inductive reasoning**: patterns from repeated observations
- **Contradiction**: ruling out via logical impossibility

### Player Options:

- (Future Feature): Build formal logic chains using reasoning templates?
  - Might be overkill at MVP stage.
  - Could be presented optionally as a thinking tool.

---

## 🧩 Red Herrings and Honest Mistakes

- Players should be able to follow incorrect but logical paths.
- Let mistakes play out, but gently course-correct:

  - Provide contradictory evidence
  - Reduce supporting signals
  - Create “aha” moment to correct false logic

- Bad-faith gameplay (trolling, irrational sabotage) should be punished:
  - Arrest, accidents, rejection by NPCs, etc.
  - Avoid rewarding illogical plans with comedic or interesting outcomes

---

## 🗺 Map & Visual Layers (MVP Placeholder)

Later additions include:

- Visual map with:
  - Known/unknown locations
  - Character sightings
  - Object discovery spots
- Visual portraits of characters and key scenes
- Time-of-day visual context

---

## 🔄 Future Considerations

- Theory Tree Visualization
- Timeline Viewer for World Events
- Rival Investigator AI
- Point system for roleplaying accuracy
- Pressure/urgency system (ritual countdown, enemy plans)

---

This document captures the totality of the gameplay concept discussed, including:

- Game philosophy
- Technical responsibilities split (AI vs Player)
- UI system design
- Simulation logic
- Reasoning framework
- Time progression logic
- Glossary and categorization system
- Plans for MVP vs Full Game

It is now ready to serve as the **central design reference** for the mystery game's ongoing development.
