import { Character } from "./character"
import { Item } from "./item"
import { Landmark } from "./landmark"

export type TownTypes = "villiage" | "town" | "city"
export type TownId = string
export type Town = Landmark & {
  townId: TownId
  totalPeople: number
  townBuildings: TownBuilding[]
  type: TownTypes
  name: string
}

export class TownBuilding {
  characters: Character[] = []
  items: Item[] = []
  constructor(public town: Town, public type: BuildingTypeName) {}
}

type BuildingTypeName =
  | "TownHall"
  | "Blacksmith"
  | "Market"
  | "Stable"
  | "Church"
  | "Library"
  | "Prison"
  | "TownWalls"

export class TownHall extends TownBuilding {
  constructor(town: Town) {
    super(town, "TownHall")
  }
}
export class Blacksmith extends TownBuilding {
  constructor(town: Town) {
    super(town, "Blacksmith")
  }
}
export class Market extends TownBuilding {
  constructor(town: Town) {
    super(town, "Market")
  }
}
export class Stable extends TownBuilding {
  constructor(town: Town) {
    super(town, "Stable")
  }
}
export class Church extends TownBuilding {
  constructor(town: Town) {
    super(town, "Church")
  }
}
export class Library extends TownBuilding {
  constructor(town: Town) {
    super(town, "Library")
  }
}
export class Prison extends TownBuilding {
  constructor(town: Town) {
    super(town, "Prison")
  }
}
export class TownWalls extends TownBuilding {
  constructor(town: Town) {
    super(town, "TownWalls")
  }
}
