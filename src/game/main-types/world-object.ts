import { WorldUnit } from "./tile";

export type WorldObject = {
  objectId: ObjectId;
  objectType: ObjectType;
  origin: WorldUnit;
  hitBox?: Polygon;
};

export type ObjectType =
  | "building"
  | "character"
  | "landmark"
  | "town"
  | "townWallGate"
  | "wallSegment";

export type ObjectId = string;

export type Polygon = WorldUnit[];
