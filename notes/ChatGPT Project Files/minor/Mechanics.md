Here is a **modular evil plan system** design, consistent with your fantasy detective game structure:

---

## 🔧 STRUCTURE OVERVIEW

- **Parent Mechanic**: The core **plan type** that causes the catastrophe.
- **Submechanics (Subsystems)**: Reusable building blocks. Each plan must be constructed from 2+ subsystems.
- All subsystems conform to a **shared interface**:

  - `InputCondition` (e.g., timing, artifact present, person dead)
  - `EffectOutput` (e.g., corruption, ignition, collapse)
  - `RevealCondition` (how it might be discovered)
  - `CounterMethod` (how it can be disrupted)

These allow **combinatorial flexibility** — the evil plan executes when all its subsystem conditions are fulfilled, triggering the parent mechanic’s final outcome.

---

## 🧩 LIBRARY OF 16 SHARED SUBMECHANICS

These can be combined in different orders with different timing/triggering logic:

| #   | Submechanic Name          | Description                                                           |
| --- | ------------------------- | --------------------------------------------------------------------- |
| 1   | **Celestial Alignment**   | Must occur under a specific astral event (e.g. eclipse, solstice)     |
| 2   | **Ritual Circle Bound**   | Ritual must be performed at a precise location inscribed with runes   |
| 3   | **Sacrifice Prepared**    | A chosen individual must be murdered or corrupted in a specific way   |
| 4   | **Inverted Artifact**     | A sacred item must be desecrated or reconfigured to reverse its power |
| 5   | **Chanted Keyphrase**     | Specific incantation must be spoken with no errors                    |
| 6   | **Sealed Chamber Opened** | A long-sealed location must be accessed or unlocked                   |
| 7   | **Bloodline Targeted**    | Action affects only members of a specific lineage or chosen group     |
| 8   | **Reagent Imbibed**       | A potion or toxin must be consumed (by self or victim)                |
| 9   | **Network Activated**     | A network of devices or people must each perform their task           |
| 10  | **Symbol Synchrony**      | Symbols across different regions must be activated simultaneously     |
| 11  | **False Prophecy Spread** | Misleading prophecy must be believed and acted on by others           |
| 12  | **Construct Possessed**   | A golem, statue, or machine must be secretly activated                |
| 13  | **Enemy Action Required** | The enemy must take a specific baited action (e.g. open gate)         |
| 14  | **Temporal Decay**        | A container, enchantment, or lock weakens over time until it breaks   |
| 15  | **Disguise Maintained**   | The villain must not be discovered until a point in time              |
| 16  | **Tuning Tone Emitted**   | Sound, frequency, or chant must vibrate at exact pitch                |

---

## 🕱 EXAMPLE 1: **Evil Mechanic – "Soul Convergence"**

> A forbidden ritual fuses the souls of thousands into a singular eldritch being.

- **Goal**: Create a god-being by converging souls.
- **Trigger**: When the final soul is bound and chant spoken during eclipse.
- **Catastrophic Outcome**: Mass psychic collapse; the being ascends, dooming all below.

### Subsystem Chain:

1. **Celestial Alignment** – must occur during eclipse.
2. **Sacrifice Prepared** – a holy child is unknowingly raised for this.
3. **Ritual Circle Bound** – convergence zone must be protected from interference.
4. **Tuning Tone Emitted** – ancient horn must be sounded to fuse spirits.

---

## 🕳️ EXAMPLE 2: **Evil Mechanic – "Echo of the Deep"**

> A sealed abyssal gate is slowly being weakened by the villain’s plan to let it collapse.

- **Goal**: Open a sunken gate to release drowned horrors.
- **Trigger**: When three underwater locks break from decay.
- **Catastrophic Outcome**: Coastal cities fall to a tide of ancient entities.

### Subsystem Chain:

1. **Temporal Decay** – chains weakening with no attention drawn to them.
2. **Symbol Synchrony** – glyphs in 3 cities must be aligned in prayer structures.
3. **Disguise Maintained** – the villain is a respected priest in all 3 cities.
4. **Enemy Action Required** – the heroes believe breaking a false seal will stop the threat (it accelerates it).

---

## 🕯️ EXAMPLE 3: **Evil Mechanic – "Ashen Crown Protocol"**

> A complex weapon made of faith and betrayal — the holy crown is used to assassinate all blessed bloodlines.

- **Goal**: Destroy all divine descendants in a single ritual purge.
- **Trigger**: When the crown is worn by a corrupted heir in the central cathedral.
- **Catastrophic Outcome**: All those bearing divine bloodlines die instantly across the realm.

### Subsystem Chain:

1. **Bloodline Targeted** – targets only blessed families.
2. **Inverted Artifact** – crown was originally a divine relic, now tainted.
3. **Network Activated** – bell towers ring in 9 cities to synchronize power.
4. **Chanted Keyphrase** – one word uttered by the false king finalizes the purge.

---

## 🧠 EXAMPLES OF 10 PARENT MECHANICS

Each of these combines 2–4 subsystems and triggers once all their conditions are met:

| Mechanic Name            | Description                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------- |
| **Soul Convergence**     | Merges thousands of souls into one.                                                   |
| **Echo of the Deep**     | Opens abyssal gates through decaying seals and glyphs.                                |
| **Ashen Crown Protocol** | Remotely kills divine bloodlines via corrupted heir.                                  |
| **Heartsplit Ceremony**  | Causes towns to turn on each other through spread of madness via ritual sound.        |
| **Everrot Bloom**        | A fungus spreads when combined with bloodline seeds and solar heat exposure.          |
| **Shroud Reversal**      | The protective veil of a kingdom is inverted, exposing it to another dimension.       |
| **False Ascension**      | A cult elevates a figure to godhood who becomes a soul-consuming abomination.         |
| **Tithe of Flames**      | Relic activation channels town hearths into infernos.                                 |
| **Obsidian Accord**      | A set of secret oaths trigger a demon pact if three heads of state unknowingly agree. |
| **Silence of the Choir** | Once 13 divine singers are replaced by husks, their final hymn unbinds death itself.  |

---

Would you like a spreadsheet-style table where you can **design and visualize custom plan combinations**, plugging in subsystems and outputs?
