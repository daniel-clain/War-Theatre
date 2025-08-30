import { TownBuilding } from "../../war-theatre/game/main-types/town"
import { Entity } from "../ui/player-ui/components/entity"

export type Character = Entity & {
  age: number
  entityType: "character"
}

export type Location = {
  id: string
  name: string
  description: string
}

export type Clue = {
  id: string
  description: string
  locationId: string
  relatedCharacterId?: string
  discovered: boolean
}

export type Mystery = {
  victim: string
  culprit: string
  motive: string
  method: string
}

export type WorldState = {
  time: number
  characters: Character[]
  townBuildings: TownBuilding[]
  log: string[]
}
