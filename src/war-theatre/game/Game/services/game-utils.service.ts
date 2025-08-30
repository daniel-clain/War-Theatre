import { Character, KnownCharacter } from "../../MainGame/character"
import { Town, TownBuilding } from "../../MainGame/city"
import { Faction } from "../../MainGame/faction"
import { Item } from "../../MainGame/item"
import { Coords, Tile } from "../../MainGame/tile"
import { Landmark } from "./../../MainGame/landmark"

export function addLandmarkToTile(landmark: Landmark, tile: Tile) {
  landmark.tile = tile
  tile.landmarks.push(landmark)
}

export function setFactionControlsLandmark(
  faction: Faction,
  landmark: Landmark
) {
  landmark.controllingFaction = faction
  faction.controlledLandmarks.push(landmark)
}

export function characterWithinRangeOfLocation(
  c: Character,
  r: number,
  l: Coords
) {}

export function setCharacterKnownsCharacter(
  knowingCharacter: Character,
  knownCharacter: KnownCharacter
) {
  const alreadyKnown = knowingCharacter.worldView.knownCharacters.some(
    (c) => c.name == knownCharacter.name
  )
  if (alreadyKnown) {
    knowingCharacter.worldView.knownCharacters =
      knowingCharacter.worldView.knownCharacters.map((c) =>
        c.name == knownCharacter.name ? Object.assign(c, knownCharacter) : c
      )
  } else {
    knowingCharacter.worldView.knownCharacters.push(knownCharacter)
  }
}

export function addBuildingsToTown(town: Town, townBuildings: TownBuilding[]) {
  townBuildings.forEach((buildingToAdd) => {
    const exists = town.townBuildings.some(
      (existing) => existing.type == buildingToAdd.type
    )
    if (exists) {
      console.log(
        `town ${town.name} already has building ${buildingToAdd.type}`
      )
    } else {
      town.townBuildings.push(buildingToAdd)
    }
  })
}

export function addItemToTile(item: Item, tile: Tile) {}
