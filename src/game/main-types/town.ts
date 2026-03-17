import { WorldUnit } from "./tile";
import { ObjectId, WorldObject } from "./world-object";

export type Town = WorldObject & {
  objectType: "town";
  townBuildings: ObjectId[];
  townWall: TownWall;
  name: string;
};

export type Building = Required<WorldObject> & {
  objectType: "building";
  buildingType: BuildingTypeName;
};
export type TownWall = {
  wallSegments: WallSegment[];
  gates: TownWallGate[];
};
export type TownWallGate = WorldObject & {
  objectType: "townWallGate";
  endPoint: WorldUnit;
};
export type WallSegment = WorldObject & {
  objectType: "wallSegment";
  endPoint: WorldUnit;
};

export const medivalTownBuildings = [
  "Keep",
  "Blacksmith",
  "Market",
  "Stable",
  "Church",
  "Library",
  "Prison",
  "Court House",
  "Tavern",
  "Inn",
  "Barracks",
  "Warehouse",
  "Lumber Mill",
  "Potter",
  "Baker",
  "Butcher",
  "Granery",
  "Graveyard",
  "Infirmary",
  "School",
  "Gardens",
] as const;

export type BuildingTypeName = (typeof medivalTownBuildings)[number];
