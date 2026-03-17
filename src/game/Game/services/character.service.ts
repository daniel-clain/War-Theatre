import { gameConfig } from "../../game-config";
import { Character } from "../../main-types/character";
import { Tile, WorldUnit } from "../../main-types/tile";
import { World } from "../../main-types/world";
import { WorldObject } from "../../main-types/world-object";

export function moveCharacterToWorldUnit(
  character: Character,
  worldUnit: WorldUnit,
  world: World,
): void {
  character.origin = worldUnit;
  const worldUnitsPerTile = gameConfig.worldUnitsPerTile;
  const tile = getTileAtWorldUnit(worldUnit, world.tiles, worldUnitsPerTile);
  if (!tile) return;
  const knownTileIds = new Set(
    character.worldView.knownTiles.map(
      (t) => `${t.topLeftWorldUnit.x},${t.topLeftWorldUnit.z}`,
    ),
  );
  const tileId = `${tile.topLeftWorldUnit.x},${tile.topLeftWorldUnit.z}`;
  if (!knownTileIds.has(tileId)) {
    character.worldView.knownTiles.push(tile);
  }
  const knownObjectIds = new Set(
    character.worldView.knownObjects.map((o) => o.objectId),
  );
  const objectsInTile = getWorldObjectsIntersectingTile(
    tile,
    world,
    worldUnitsPerTile,
  );
  for (const obj of objectsInTile) {
    if (!knownObjectIds.has(obj.objectId)) {
      knownObjectIds.add(obj.objectId);
      character.worldView.knownObjects.push(obj);
    }
  }
}

function getTileAtWorldUnit(
  worldUnit: WorldUnit,
  tiles: Tile[],
  worldUnitsPerTile: number,
): Tile | undefined {
  const tileX = Math.floor(worldUnit.x / worldUnitsPerTile) * worldUnitsPerTile;
  const tileZ = Math.floor(worldUnit.z / worldUnitsPerTile) * worldUnitsPerTile;
  return tiles.find(
    (t) => t.topLeftWorldUnit.x === tileX && t.topLeftWorldUnit.z === tileZ,
  );
}

function getWorldObjectsIntersectingTile(
  tile: Tile,
  world: World,
  worldUnitsPerTile: number,
): WorldObject[] {
  const tileMinX = tile.topLeftWorldUnit.x;
  const tileMinZ = tile.topLeftWorldUnit.z;
  const tileMaxX = tileMinX + worldUnitsPerTile - 1;
  const tileMaxZ = tileMinZ + worldUnitsPerTile - 1;
  const result: WorldObject[] = [];
  function tileContainsPoint(x: number, z: number): boolean {
    return x >= tileMinX && x <= tileMaxX && z >= tileMinZ && z <= tileMaxZ;
  }
  function segmentIntersectsTile(
    origin: WorldUnit,
    endPoint: WorldUnit,
  ): boolean {
    if (
      tileContainsPoint(origin.x, origin.z) ||
      tileContainsPoint(endPoint.x, endPoint.z)
    ) {
      return true;
    }
    const segMinX = Math.min(origin.x, endPoint.x);
    const segMaxX = Math.max(origin.x, endPoint.x);
    const segMinZ = Math.min(origin.z, endPoint.z);
    const segMaxZ = Math.max(origin.z, endPoint.z);
    return !(
      segMaxX < tileMinX ||
      segMinX > tileMaxX ||
      segMaxZ < tileMinZ ||
      segMinZ > tileMaxZ
    );
  }
  function polygonIntersectsTile(
    origin: WorldUnit,
    polygon: WorldUnit[],
  ): boolean {
    for (const vertex of polygon) {
      if (tileContainsPoint(origin.x + vertex.x, origin.z + vertex.z)) {
        return true;
      }
    }
    return false;
  }
  for (const town of world.towns) {
    if (tileContainsPoint(town.origin.x, town.origin.z)) {
      result.push(town);
    }
    for (const segment of town.townWall.wallSegments) {
      if (segmentIntersectsTile(segment.origin, segment.endPoint)) {
        result.push(segment);
      }
    }
  }
  for (const landmark of world.landmarks) {
    const hitBox = landmark.hitBox ?? [];
    if (hitBox.length === 0) {
      if (tileContainsPoint(landmark.origin.x, landmark.origin.z)) {
        result.push(landmark);
      }
    } else if (polygonIntersectsTile(landmark.origin, hitBox)) {
      result.push(landmark);
    }
  }
  return result;
}
