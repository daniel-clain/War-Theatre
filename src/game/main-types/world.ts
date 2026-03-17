import { Character } from "./character";
import { Item } from "./item";
import { Landmark } from "./landmark";
import { Mechanic } from "./mechanic";
import { Region } from "./region";
import { Tile } from "./tile";
import { Building, Town } from "./town";

export type World = {
  time: number;
  tiles: Tile[];
  mechanics: Mechanic[];
  characters: Character[];
  towns: Town[];
  regions: Region[];
  landmarks: Landmark[];
  buildings: Building[];
  items: Item[];
  animals: AnimalId[];
};

type AnimalId = string;
export type Animal = {
  animalId: AnimalId;
};
