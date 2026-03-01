export type BiomeId = string
export type BiomeType =
  | "forest"
  | "swamp"
  | "plains"
  | "costal"
  | "mountains"
  | "jungle"
  | "grasslands"

export type Biome = {
  biomeType: BiomeType
  biomeId: BiomeId
  areaPolygon: string
}

export type Coords = {
  x: number
  y: number
}
