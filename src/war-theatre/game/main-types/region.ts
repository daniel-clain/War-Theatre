import { FactionId } from "./faction"
import { TownId } from "./town"
export type RegionId = string
export type Region = {
  regionId: RegionId
  areaPolygon: string
  name: string
  ownedBy?: FactionId
  mainTown?: TownId
}
