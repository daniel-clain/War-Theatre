import { Action } from "rxjs/internal/scheduler/Action"
import { ArchetypeName } from "../../war-theatre/game/main-types/archetype"
import { Coords } from "../../war-theatre/game/main-types/biome"
import {
  CharacterId,
  Information,
  KnownCharacter,
  Situation,
  Skill,
  Value,
} from "../../war-theatre/game/main-types/character"
import { Faction } from "../../war-theatre/game/main-types/faction"
import { Item } from "../../war-theatre/game/main-types/item"
import { KnownLandmark } from "../../war-theatre/game/main-types/landmark"
import { Plan } from "../../war-theatre/game/main-types/plan"
import { Trait } from "../../war-theatre/game/main-types/traits"

type World_P = {
  mechanics: Mechanic_P[]
  characters: Character_P[]
  items: Item_P[]
  towns: Town_P[]
  factions: Faction_P[]
  landMarks: Landmark_P[]
  buildings: Building_P[]
  naturalEvents: NaturalEvent_P[]
  animals: Animal_P[]
}

type Character_P = {
  name: string
  archetype: ArchetypeName
  class: ArchetypeName

  dead: boolean
  money: number
  coords: Coords
  activePlan?: Plan
  activeThought?: Plan
  items: Item[]
  goal?: Goal
  worldView: WorldView
  plans: Plan[]
  faction?: Faction
  currentSituation: Situation
  backStory: string[]
  information: Information[]
  skills: Skill[]
  values: Value[]
  traits: Trait[]
  inPrison: boolean
  recentEmotion: Emotion[]
  recentThoughts: Thought[]
  recentExperiences: Experience[]
  mainExperiences: Experience[]
  recentAction: Action[]
  uglyBeautiful: UglyBeautiful
  egocentricStoic: EgocentricStoic
}

type WorldView = {
  knowTowns: KnownTown[]
  knownLandmarks: KnownLandmark[]
  knownFactions: KnownFaction[]
  knownCharacters: KnownCharacter[]
}

const world: World_P = {
  mechanics: [],
  characters: [],
  items: [],
  towns: [],
  factions: [],
  landMarks: [],
  buildings: [],
  naturalEvents: [],
  animals: [],
}

type Town_P = {
  name: string
  size: "village" | "town" | "large town" | "city" | "large city"
  townCenter: Coords
  buildings: BuildingId[]
  wall: boolean
  governor: CharacterId
  guards: CharacterId[]
  systems: TownSystem[]
}

type TownSystem =
  | "legal"
  | "prison"
  | "agricultural"
  | "law enforcement"
  | "trade and tax"
  | "election"
  | "entertainment"
  | "water"
  | "waste disposal"
  | "inspections to root out criminal activity"

type MedivalClass =
  | "Peasant"
  | "Merchant"
  | "Craftsman"
  | "Knight"
  | "Nobile"
  | "Cleric"

/* 
  rules
    - build it with character centric focus, only create content relative to their location, eg
      ~ if the character has a storm in their location, then create a naturalEvent(storm) and add it to the word for that players location, but if the player isnt in that location, then there in no need to create a storm for a tile that player isnt in yet
      ~ if a character has a backstory that they go to school, create the school in the world regardless of if the player is not at that location yet, we know that it needs to exist based on the content in that characters story.
      ~ if the character owns pets or items or buildings, make sure they are created
      ~ if the character has met other characters in the town, make sure they are created

*/
