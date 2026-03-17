/**
 * A tile is a unit of the world that is 4 world units wide and 4 world units tall, specified in game config.
 */
export type Tile = {
  topLeftWorldUnit: WorldUnit;
  terrainType: TerrainType;
};

export type WorldUnit = {
  x: number;
  z: number;
};

export type TerrainType = "grass" | "water" | "rock" | "sand" | "mud";
