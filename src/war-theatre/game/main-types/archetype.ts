import {
  loopObject,
  selectByProbability,
} from "../Game/services/utility.service"
import { AlignmentRating } from "./alignment"
import { Value } from "./character"
import { TraitSpectrumNames } from "./traits"

type HasName = {
  name: string
}

export function getCharacterArchetype(
  archetypeName?: ArchetypeName
): Archetype {
  let archetype: Archetype | undefined = archetypeName
    ? archetypes[archetypeName]
    : undefined

  if (!archetype) {
    const archetypeProbabilities = loopObject(archetypes, (_, archetype) => {
      return {
        option: archetype,
        probability: rarityPercentage[archetype.rarity],
      }
    })
    archetype = selectByProbability(archetypeProbabilities)
  }

  return archetype
}

export type Archetype<N extends ArchetypeName = ArchetypeName> = {
  name: N
  rarity: RarityName
  traits: Record<TraitSpectrumNames, AlignmentRating>
}

export type Rating = "0" | "1" | "2" | "3" | "4" | "5"

type RarityName = "rare" | "uncommon" | "common"

type RarityRating<N extends RarityName> = N extends "rare"
  ? "5"
  : N extends "uncommon"
  ? "3"
  : "1"

type RarityValue = Value & {
  alignmentRating: Rating
}

const rarityPercentage: Record<RarityName, number> = {
  rare: 10,
  uncommon: 30,
  common: 100,
}
type RarityPercentage = typeof rarityPercentage

const archetypeNames = [
  "Hero",
  "Outlaw",
  "Sage",
  "Explorer",
  "Ruler",
  "Caregiver",
  "Magician",
  "Creator",
  "Lover",
  "Jester",
  "Innocent",
  "Regular Person",
] as const

export type ArchetypeName = (typeof archetypeNames)[number]

export const archetypes: Record<ArchetypeName, Archetype<ArchetypeName>> = {
  Hero: {
    name: "Hero",
    rarity: "rare",
    traits: {
      Empathy: "4",
      "Self-Interest": "-3",
      Discipline: "5",
      Justice: "5",
      Hopefulness: "5",
      Loyalty: "5",
      Mercy: "3",
      Honesty: "4",
      Courage: "5",
      Humility: "3",
      Forgiveness: "3",
      Freedom: "3",
      Altruism: "-3",
    },
  },
  Outlaw: {
    name: "Outlaw",
    rarity: "uncommon",
    traits: {
      Empathy: "-3",
      "Self-Interest": "5",
      Discipline: "-2",
      Justice: "-4",
      Hopefulness: "-2",
      Loyalty: "2",
      Mercy: "-3",
      Honesty: "-5",
      Courage: "4",
      Humility: "-2",
      Forgiveness: "-4",
      Freedom: "5",
      Altruism: "-4",
    },
  },
  Sage: {
    name: "Sage",
    rarity: "rare",
    traits: {
      Empathy: "3",
      "Self-Interest": "1",
      Discipline: "4",
      Justice: "3",
      Hopefulness: "3",
      Loyalty: "3",
      Mercy: "2",
      Honesty: "5",
      Courage: "2",
      Humility: "4",
      Forgiveness: "3",
      Freedom: "2",
      Altruism: "-2",
    },
  },
  Explorer: {
    name: "Explorer",
    rarity: "uncommon",
    traits: {
      Empathy: "2",
      "Self-Interest": "3",
      Discipline: "-2",
      Justice: "2",
      Hopefulness: "4",
      Loyalty: "2",
      Mercy: "3",
      Honesty: "4",
      Courage: "5",
      Humility: "2",
      Forgiveness: "2",
      Freedom: "5",
      Altruism: "-2",
    },
  },
  Ruler: {
    name: "Ruler",
    rarity: "uncommon",
    traits: {
      Empathy: "2",
      "Self-Interest": "4",
      Discipline: "5",
      Justice: "3",
      Hopefulness: "3",
      Loyalty: "5",
      Mercy: "2",
      Honesty: "3",
      Courage: "4",
      Humility: "1",
      Forgiveness: "2",
      Freedom: "-2",
      Altruism: "-3",
    },
  },
  Caregiver: {
    name: "Caregiver",
    rarity: "uncommon",
    traits: {
      Empathy: "5",
      "Self-Interest": "-5",
      Discipline: "3",
      Justice: "4",
      Hopefulness: "5",
      Loyalty: "5",
      Mercy: "5",
      Honesty: "4",
      Courage: "3",
      Humility: "5",
      Forgiveness: "5",
      Freedom: "2",
      Altruism: "-5",
    },
  },
  Magician: {
    name: "Magician",
    rarity: "rare",
    traits: {
      Empathy: "3",
      "Self-Interest": "2",
      Discipline: "4",
      Justice: "2",
      Hopefulness: "4",
      Loyalty: "3",
      Mercy: "3",
      Honesty: "3",
      Courage: "4",
      Humility: "3",
      Forgiveness: "3",
      Freedom: "4",
      Altruism: "-2",
    },
  },
  Creator: {
    name: "Creator",
    rarity: "uncommon",
    traits: {
      Empathy: "3",
      "Self-Interest": "2",
      Discipline: "5",
      Justice: "3",
      Hopefulness: "5",
      Loyalty: "3",
      Mercy: "3",
      Honesty: "4",
      Courage: "3",
      Humility: "3",
      Forgiveness: "3",
      Freedom: "4",
      Altruism: "-2",
    },
  },
  Lover: {
    name: "Lover",
    rarity: "uncommon",
    traits: {
      Empathy: "5",
      "Self-Interest": "-2",
      Discipline: "2",
      Justice: "3",
      Hopefulness: "4",
      Loyalty: "5",
      Mercy: "4",
      Honesty: "4",
      Courage: "3",
      Humility: "4",
      Forgiveness: "4",
      Freedom: "3",
      Altruism: "-3",
    },
  },
  Jester: {
    name: "Jester",
    rarity: "uncommon",
    traits: {
      Empathy: "3",
      "Self-Interest": "2",
      Discipline: "-3",
      Justice: "2",
      Hopefulness: "5",
      Loyalty: "3",
      Mercy: "3",
      Honesty: "3",
      Courage: "2",
      Humility: "3",
      Forgiveness: "3",
      Freedom: "5",
      Altruism: "-2",
    },
  },
  Innocent: {
    name: "Innocent",
    rarity: "common",
    traits: {
      Empathy: "5",
      "Self-Interest": "-4",
      Discipline: "3",
      Justice: "4",
      Hopefulness: "5",
      Loyalty: "5",
      Mercy: "5",
      Honesty: "5",
      Courage: "2",
      Humility: "5",
      Forgiveness: "5",
      Freedom: "2",
      Altruism: "-4",
    },
  },
  "Regular Person": {
    name: "Regular Person",
    rarity: "common",
    traits: {
      Empathy: "2",
      "Self-Interest": "0",
      Discipline: "2",
      Justice: "2",
      Hopefulness: "2",
      Loyalty: "2",
      Mercy: "2",
      Honesty: "2",
      Courage: "2",
      Humility: "2",
      Forgiveness: "2",
      Freedom: "2",
      Altruism: "0",
    },
  },
}
