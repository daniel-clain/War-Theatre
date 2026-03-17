import { FactionId } from "./faction";
import { Mechanic } from "./mechanic";
import { BuildingTypeName } from "./town";
import { WorldObject } from "./world-object";

type LandmarkTypes =
  | "cave"
  | "obelisk"
  | "altar"
  | "farm"
  | "hideout"
  | BuildingTypeName;
export type LandmarkId = string;
export type Landmark = Required<WorldObject> & {
  objectType: "landmark";
  name?: string;
  controllingFaction?: FactionId;
  type: LandmarkTypes;
  mechanic?: Mechanic;
};
