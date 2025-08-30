import { CharacterId } from "./character"
import { LandmarkId } from "./landmark"

export type FactionId = string
export type Faction = {
  name: string
  factionId: FactionId
  leader: CharacterId
  wealth: number
  members: CharacterId[]
  controlledLandmarks: LandmarkId[]
}
