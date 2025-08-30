### 1. **Core Mechanic Elements**

| Term                    | Definition                                                   |
| ----------------------- | ------------------------------------------------------------ |
| Mechanic                | A structure that, when executed, causes a game state change. |
| Trigger                 | Event or input that attempts to initiate a mechanic.         |
| Condition               | Boolean state that determines if the mechanic can proceed.   |
| Effect                  | The resulting state change caused by a mechanic.             |
| Cost                    | The resource or sacrifice required to execute a mechanic.    |
| Duration                | Time the effect persists.                                    |
| Cooldown                | Time before the mechanic can be triggered again.             |
| Range / Scope           | Area or logical domain the mechanic affects.                 |
| Targeting / Selection   | Rules or logic for what entities are acted upon.             |
| Ownership / Affiliation | Links mechanics to players, factions, or other entities.     |
| Failure Condition       | Why or how a mechanic may fail after being triggered.        |
| Interrupt               | Cancels an effect or ongoing mechanic.                       |

---

### 2. **Supporting Game Structure**

| Term                    | Definition                                                        |
| ----------------------- | ----------------------------------------------------------------- |
| State                   | Dynamic values of game entities.                                  |
| Property                | Semi-static values that define attributes.                        |
| Resource                | Consumable quantities used by mechanics.                          |
| Constraint              | Limitation on execution based on space, time, resource, or logic. |
| Input                   | Player-generated signal to execute mechanic.                      |
| Visibility / Perception | Whether a mechanic or entity is detectable.                       |
| Signal / Message        | Non-physical communication between systems/entities.              |

---

### 3. **Mechanic Carriers**

| Term     | Definition                                                                |
| -------- | ------------------------------------------------------------------------- |
| Ability  | Player-executable mechanic (typically with input).                        |
| Item     | Portable object that holds mechanics.                                     |
| Landmark | Stationary world object with mechanics.                                   |
| System   | Group of interlinked mechanics serving a gameplay domain.                 |
| Machine  | Composition of mechanics designed to produce chained or emergent effects. |
