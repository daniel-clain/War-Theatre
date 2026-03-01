import { AlignmentName, AlignmentRating } from "./alignment"
import { Archetype } from "./archetype"
import { Coords } from "./biome"
import { Faction } from "./faction"
import { Item } from "./item"
import { KnownLandmark } from "./landmark"
import { Plan } from "./plan"
import { PlayerId } from "./player"
import { Trait } from "./traits"

export type CharacterId = string
export type Character = {
  name: string
  characterId: CharacterId
  archetype: Archetype
  playerId?: PlayerId
  dead: boolean
  money: number
  coords: Coords
  activePlan: Plan
  items: Item[]
  plans: Plan[]
  experiences: Experience[]
  goal?: Goal
  worldView: WorldView

  faction?: Faction
  currentSituation?: Situation
  backStory?: string
  information?: Information[]
  values?: Value[]
  traits?: Trait[]

  inPrison: boolean
}

type Goal = {}

type StopEvilPlan = {
  type: "stop evil plan"
  evilPlan: Plan
}

type DoEvilPlan = {
  type: "do evil plan"
  evilPlan: Plan
}

type Experience = {
  time: number
  description: string
  informationGained: string
}

export type WorldView = {
  knownTiles: KnownLandmark[]
  knownCharacters: KnownCharacter[]
}

export type KnownCharacter = Partial<Character> & {
  name: string
  gameStepLastSeen: number
}

export type Belief<Ar extends AlignmentRating = AlignmentRating> = {
  alignmentRating?: Ar
  details: string
}
export type Value<A extends AlignmentName = AlignmentName> = {
  alignment?: A
  name: string
}

export type Situation = {
  description: string
  keyFactors: string[]
  decisionOptions: Plan[]
}

export type SkillName =
  | "strength"
  | "engineering"
  | "stealth"
  | "persuasion"
  | "combat"

export type Skill = {
  name: SkillName
  level: number
}

export type Information = {
  sourceCharacter: KnownCharacter
  partialWorldView: Partial<WorldView>
  believed: boolean | undefined
  detials: string
}
