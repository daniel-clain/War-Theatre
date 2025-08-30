import { Archtype_T } from "../../../shared/types/archetype"

// Define archetypes with their base trait distributions
export const archetypes: Archtype_T[] = [
  {
    name: "Warrior",
    baseTraits: {
      ambition: [7, 10],
      intelligence: [3, 6],
      honest: [5, 8],
      beauty: [4, 6],
      charisma: [3, 5],
    },
    skillWeights: {
      fighting: [8, 10],
      leadership: [6, 9],
      persuasion: [3, 5],
      magic: [0, 0],
    },
    valueWeights: {
      power: [7, 10],
      freedom: [3, 6],
      justice: [5, 8],
      wealth: [5, 7],
      beauty: [5, 7],
      honor: [5, 7],
      loyalty: [5, 7],
      knowledge: [5, 7],
    },
    attributesWeights: {
      wealth: [7, 10],
      reputation: [3, 6],
      health: [5, 8],
      strength: [5, 7],
    },
    honour: [7, 10],
  },
  {
    name: "Diplomat",

    baseTraits: {
      ambition: [7, 10],
      intelligence: [3, 6],
      honest: [5, 8],
      beauty: [4, 6],
      charisma: [3, 5],
    },
    skillWeights: {
      fighting: [8, 10],
      leadership: [6, 9],
      persuasion: [3, 5],
      magic: [0, 0],
    },
    valueWeights: {
      power: [7, 10],
      freedom: [3, 6],
      justice: [5, 8],
      wealth: [5, 7],
      beauty: [5, 7],
      honor: [5, 7],
      loyalty: [5, 7],
      knowledge: [5, 7],
    },
    attributesWeights: {
      wealth: [7, 10],
      reputation: [3, 6],
      health: [5, 8],
      strength: [5, 7],
    },
    honour: [4, 5],
  },
]
