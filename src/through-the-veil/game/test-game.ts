import { Character, Clue, Location, Mystery, WorldState } from "./types"

const locations: Location[] = [
  { id: "l1", name: "Town Square", description: "A busy central square." },
  { id: "l2", name: "Blacksmith", description: "Smells of coal and metal." },
  { id: "l3", name: "Forest Edge", description: "Dense and shadowy trees." },
]

const characters: Character[] = [
  {
    id: "c1",
    age: 10,
    name: "Mira",
    role: "witness",
    locationId: "l1",
    knowledge: ["Saw someone run from forest"],
  },
  {
    id: "c2",
    name: "Thorn",
    age: 10,
    role: "suspect",
    locationId: "l2",
    knowledge: ["Argued with victim"],
  },
  {
    id: "c3",
    name: "Rael",
    age: 10,
    role: "villager",
    locationId: "l3",
    knowledge: [],
  },
]

const clues: Clue[] = [
  {
    id: "cl1",
    description: "Broken sword near victim",
    locationId: "l3",
    relatedCharacterId: "c2",
    discovered: false,
  },
  {
    id: "cl2",
    description: "Torn fabric matching suspect's cloak",
    locationId: "l1",
    discovered: false,
  },
]

const mystery: Mystery = {
  victim: "Lorin the Merchant",
  culprit: "Thorn",
  motive: "Business rivalry",
  method: "Stabbed with broken sword",
}

export const testDemoWorld: WorldState = {
  time: 0,
  characters,
  locations,
  clues,
  mystery,
  log: ["The world begins. Lorin has been found dead."],
}
