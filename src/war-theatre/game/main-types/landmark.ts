import { Coords } from "./biome"
import { FactionId } from "./faction"
import { Mechanic } from "./mechanic"
import { TownTypes } from "./town"

type LandmarkTypes =
  | "cave"
  | "obelisk"
  | "altar"
  | "farm"
  | "hideout"
  | TownTypes
export type LandmarkId = string
export type Landmark = {
  landmarkId: LandmarkId
  coords: Coords
  name?: string
  symbol: string
  controllingFaction?: FactionId
  type: LandmarkTypes
  mechanic?: Mechanic
}

export type KnownLandmark = Partial<Landmark>
