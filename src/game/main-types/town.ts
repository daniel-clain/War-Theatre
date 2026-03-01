import { random } from "lodash";
import { Character } from "./character";
import { Item } from "./item";
import { Landmark } from "./landmark";

export type TownTypes = "villiage" | "town" | "city";
export type TownId = string;
export type Town = Landmark & {
  townBuildings: TownBuilding[];
  type: TownTypes;
  name: string;
};

export function createTown(
  partialTown: Partial<Town> & Pick<Town, "name">
): Town {
  const town: Town = {
    landmarkId: random(1, 1000000) + "",
    coords: { x: 0, y: 0 },
    type: "town",
    townBuildings: [],
    ...partialTown,
  };
  return town;
}

export class TownBuilding {
  characters: Character[] = [];
  items: Item[] = [];
  constructor(public town: Town, public type: BuildingTypeName) {}
}

const medivalTownBuildings = [
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
  "Militia Barracks",
  "Gardens",
] as const;

type BuildingTypeName = (typeof medivalTownBuildings)[number];
