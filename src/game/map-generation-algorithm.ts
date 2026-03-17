import { nanoid } from "nanoid";
import { gameConfig } from "./game-config";
import { TerrainType, Tile, WorldUnit } from "./main-types/tile";
import {
  Building,
  medivalTownBuildings,
  Town,
  TownWall,
  WallSegment,
} from "./main-types/town";
import { World } from "./main-types/world";
import { Polygon, WorldObject } from "./main-types/world-object";

export const generateMap = (): Pick<World, "tiles" | "towns" | "buildings"> => {
  const townOrigin = placeTownOrigin();
  const townBuildings = placeTownBuildings();
  const townWall = buildWallAroundTown();

  const tiles = generateTilesForUsedWorldUnits();

  const town: Town = {
    objectId: nanoid(),
    name: "Funky Town",
    objectType: "town",
    origin: townOrigin,
    townBuildings: townBuildings.map((building) => building.objectId),
    townWall: townWall,
  };

  return {
    tiles,
    towns: [town],
    buildings: townBuildings,
  };

  //////////////////////////

  function placeTownOrigin(): WorldUnit {
    return {
      x: 0,
      z: 0,
    };
  }

  function placeTownBuildings(): Building[] {
    const buildingBuffer = 10;
    const placedBuildings: Building[] = [];
    for (const buildingTemplate of townBuildingsBase) {
      const origin = findPlaceFromOrigin(
        townOrigin,
        buildingTemplate.hitBox,
        buildingBuffer,
        placedBuildings,
      );
      placedBuildings.push({
        objectId: nanoid(),
        origin,
        objectType: "building",
        buildingType: buildingTemplate.buildingType,
        hitBox: buildingTemplate.hitBox,
      });
    }
    return placedBuildings;
  }

  function buildWallAroundTown(): TownWall {
    const minDistanceFromBuilding = 15;
    const maxDistanceFromBuilding = 25;
    const closeEnoughToStart = 5;

    const startPoint = getTopCentre(townBuildings);
    const boundaryPoints: WorldUnit[] = [startPoint];

    let currentPoint = startPoint;
    let previousDirectionAngleRadians = Math.PI; // left from 12 o'clock (counter-clockwise first step)
    const maxIterations = 500;

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      const directionAngleRadians = findNextDirectionCounterClockwise(
        currentPoint,
        previousDirectionAngleRadians,
        townBuildings,
        minDistanceFromBuilding,
      );

      const endPoint = findSegmentEndAtMaxDistance(
        currentPoint,
        directionAngleRadians,
        townBuildings,
        maxDistanceFromBuilding,
      );

      boundaryPoints.push(endPoint);

      const distanceToStart = Math.hypot(
        endPoint.x - startPoint.x,
        endPoint.z - startPoint.z,
      );
      if (distanceToStart <= closeEnoughToStart && boundaryPoints.length >= 4) {
        break;
      }

      currentPoint = endPoint;
      previousDirectionAngleRadians = directionAngleRadians;
    }

    const wallSegments: WallSegment[] = [];
    for (let i = 0; i < boundaryPoints.length; i++) {
      const origin = boundaryPoints[i];
      const endPoint = boundaryPoints[(i + 1) % boundaryPoints.length];
      wallSegments.push({
        objectId: nanoid(),
        origin,
        endPoint,
        objectType: "wallSegment",
      });
    }

    return {
      wallSegments,
      gates: [],
    };
  }

  function generateTilesForUsedWorldUnits(): Tile[] {
    const worldUnitsPerTile = gameConfig.worldUnitsPerTile;
    const usedWorldUnits = collectUsedWorldUnits(townBuildings, townWall);
    if (usedWorldUnits.length === 0) return [];

    const minimumX = Math.min(...usedWorldUnits.map((u) => u.x));
    const maximumX = Math.max(...usedWorldUnits.map((u) => u.x));
    const minimumZ = Math.min(...usedWorldUnits.map((u) => u.z));
    const maximumZ = Math.max(...usedWorldUnits.map((u) => u.z));

    const tileMinimumX = Math.floor(minimumX / worldUnitsPerTile) - 1;
    const tileMaximumX = Math.floor(maximumX / worldUnitsPerTile) + 1;
    const tileMinimumZ = Math.floor(minimumZ / worldUnitsPerTile) - 1;
    const tileMaximumZ = Math.floor(maximumZ / worldUnitsPerTile) + 1;

    const tiles: Tile[] = [];
    const defaultTerrainType: TerrainType = "grass";

    for (let tileX = tileMinimumX; tileX <= tileMaximumX; tileX++) {
      for (let tileZ = tileMinimumZ; tileZ <= tileMaximumZ; tileZ++) {
        tiles.push({
          topLeftWorldUnit: {
            x: tileX * worldUnitsPerTile,
            z: tileZ * worldUnitsPerTile,
          },
          terrainType: defaultTerrainType,
        });
      }
    }
    return tiles;
  }

  function collectUsedWorldUnits(
    buildings: Building[],
    wall: TownWall,
  ): WorldUnit[] {
    const used: WorldUnit[] = [];
    for (const building of buildings) {
      const polygon = polygonInWorldSpace(
        building.origin,
        building.hitBox ?? [],
      );
      for (const point of polygon) {
        used.push(point);
      }
    }
    for (const segment of wall.wallSegments) {
      used.push(segment.origin);
      used.push(segment.endPoint);
    }
    return used;
  }
};

const townBuildingsBase: Pick<Building, "buildingType" | "hitBox">[] =
  medivalTownBuildings.map((type) => ({
    buildingType: type,
    hitBox: [
      { x: 0, z: 0 },
      { x: 10, z: 0 },
      { x: 10, z: 10 },
      { x: 0, z: 10 },
    ],
  }));

// object placement helpers
function findPlaceFromOrigin(
  origin: WorldUnit,
  hitBox: Polygon,
  unitsBuffer: number,
  alreadyPlacedBuildings: Building[],
): WorldUnit {
  const radialStepDegrees = 30;
  const radialSegmentCount = 360 / radialStepDegrees;
  const circleOutStepIncrement = 10;

  let placeOrigin: WorldUnit | undefined;
  let currentCircleOutStep = 0;

  while (!placeOrigin) {
    const radius = unitsBuffer + currentCircleOutStep;
    const randomStartSegment = Math.floor(Math.random() * radialSegmentCount);

    for (let i = 0; i < radialSegmentCount; i++) {
      const segment = (randomStartSegment + i) % radialSegmentCount;
      const angleRadians = (segment * radialStepDegrees * Math.PI) / 180;
      const testPlace: WorldUnit = {
        x: Math.round(origin.x + Math.cos(angleRadians) * radius),
        z: Math.round(origin.z + Math.sin(angleRadians) * radius),
      };

      if (testPlaceFits(testPlace, hitBox, alreadyPlacedBuildings)) {
        placeOrigin = testPlace;
        break;
      }
    }

    currentCircleOutStep += circleOutStepIncrement;
    if (currentCircleOutStep > 500) {
      throw new Error(
        "findPlaceFromOrigin: could not place within radius limit",
      );
    }
  }

  return placeOrigin;

  function testPlaceFits(
    candidateOrigin: WorldUnit,
    candidateHitBox: Polygon,
    existingObjects: WorldObject[],
  ): boolean {
    const candidatePolygon = polygonInWorldSpace(
      candidateOrigin,
      candidateHitBox,
    );
    if (candidatePolygon.length === 0) return true;
    for (const existing of existingObjects) {
      const existingPolygon = polygonInWorldSpace(
        existing.origin,
        existing.hitBox ?? [],
      );
      if (existingPolygon.length === 0) continue;
      if (doPolygonsOverlap(candidatePolygon, existingPolygon)) return false;
    }
    return true;
  }
}
function polygonInWorldSpace(origin: WorldUnit, polygon: Polygon): Polygon {
  return polygon.map((point) => ({
    x: origin.x + point.x,
    z: origin.z + point.z,
  }));
}
function doPolygonsOverlap(polygon1: Polygon, polygon2: Polygon): boolean {
  for (const point1 of polygon1) {
    for (const point2 of polygon2) {
      if (point1.x === point2.x && point1.z === point2.z) return true;
    }
  }
  return false;
}

// wall helpers
function distanceFromPointToSegment(
  point: WorldUnit,
  segmentStart: WorldUnit,
  segmentEnd: WorldUnit,
): number {
  const deltaX = segmentEnd.x - segmentStart.x;
  const deltaZ = segmentEnd.z - segmentStart.z;
  const lengthSquared = deltaX * deltaX + deltaZ * deltaZ;
  if (lengthSquared === 0) {
    const dx = point.x - segmentStart.x;
    const dz = point.z - segmentStart.z;
    return Math.sqrt(dx * dx + dz * dz);
  }
  let t =
    ((point.x - segmentStart.x) * deltaX +
      (point.z - segmentStart.z) * deltaZ) /
    lengthSquared;
  t = Math.max(0, Math.min(1, t));
  const nearestX = segmentStart.x + t * deltaX;
  const nearestZ = segmentStart.z + t * deltaZ;
  const dx = point.x - nearestX;
  const dz = point.z - nearestZ;
  return Math.sqrt(dx * dx + dz * dz);
}

function distanceFromPointToPolygon(
  point: WorldUnit,
  polygon: WorldUnit[],
): number {
  let minimumDistance = Infinity;
  const count = polygon.length;
  for (let i = 0; i < count; i++) {
    const start = polygon[i];
    const end = polygon[(i + 1) % count];
    const distance = distanceFromPointToSegment(point, start, end);
    minimumDistance = Math.min(minimumDistance, distance);
  }
  return minimumDistance;
}

function distanceFromBuildings(
  point: WorldUnit,
  buildings: Building[],
): number {
  let minimumDistance = Infinity;
  for (const building of buildings) {
    const polygonInWorld = (building.hitBox ?? []).map((vertex) => ({
      x: building.origin.x + vertex.x,
      z: building.origin.z + vertex.z,
    }));
    if (polygonInWorld.length > 0) {
      const distance = distanceFromPointToPolygon(point, polygonInWorld);
      minimumDistance = Math.min(minimumDistance, distance);
    }
  }
  return minimumDistance;
}

function getTopCentre(buildings: Building[]): WorldUnit {
  const allCorners = buildings.flatMap((building) =>
    (building.hitBox ?? []).map((point) => ({
      x: building.origin.x + point.x,
      z: building.origin.z + point.z,
    })),
  );
  if (allCorners.length === 0) return { x: 0, z: 0 };
  const minimumX = Math.min(...allCorners.map((c) => c.x));
  const maximumX = Math.max(...allCorners.map((c) => c.x));
  const maximumZ = Math.max(...allCorners.map((c) => c.z));
  return {
    x: Math.round((minimumX + maximumX) / 2),
    z: Math.round(maximumZ),
  };
}

const angleStepRadians = (2 * Math.PI) / 360; // 1 degree steps

function findNextDirectionCounterClockwise(
  currentPoint: WorldUnit,
  previousDirectionAngleRadians: number,
  buildings: Building[],
  minDistanceFromBuilding: number,
): number {
  // Minimum distance along ray as we rotate CCW
  function minDistanceAlongRay(angle: number): number {
    const directionX = Math.cos(angle);
    const directionZ = Math.sin(angle);
    let minimumAlongRay = Infinity;
    const step = 2; // world units along ray to sample
    const maxT = 500;
    for (let t = 0; t <= maxT; t += step) {
      const point = {
        x: currentPoint.x + t * directionX,
        z: currentPoint.z + t * directionZ,
      };
      const distance = distanceFromBuildings(point, buildings);
      minimumAlongRay = Math.min(minimumAlongRay, distance);
    }
    return minimumAlongRay;
  }

  let angle = previousDirectionAngleRadians;
  const tolerance = 0.5;

  for (let i = 0; i < 360; i++) {
    const minDist = minDistanceAlongRay(angle);
    if (
      minDist >= minDistanceFromBuilding - tolerance &&
      minDist <= minDistanceFromBuilding + tolerance
    ) {
      return angle;
    }
    angle += angleStepRadians; // counter-clockwise
  }

  return angle;
}

function findSegmentEndAtMaxDistance(
  startPoint: WorldUnit,
  directionAngleRadians: number,
  buildings: Building[],
  maxDistanceFromBuilding: number,
): WorldUnit {
  const directionX = Math.cos(directionAngleRadians);
  const directionZ = Math.sin(directionAngleRadians);
  const step = 1;
  let t = 0;
  let previousDistance = distanceFromBuildings(startPoint, buildings);

  while (t < 1000) {
    t += step;
    const point = {
      x: Math.round(startPoint.x + t * directionX),
      z: Math.round(startPoint.z + t * directionZ),
    };
    const distance = distanceFromBuildings(point, buildings);
    if (distance >= maxDistanceFromBuilding) {
      return point;
    }
    previousDistance = distance;
  }

  return {
    x: Math.round(startPoint.x + t * directionX),
    z: Math.round(startPoint.z + t * directionZ),
  };
}
