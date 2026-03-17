import { CSSProperties, useContext } from "react";
import { gameConfig } from "../../../../game/game-config";
import { TerrainType, Tile, WorldUnit } from "../../../../game/main-types/tile";
import { WorldObject } from "../../../../game/main-types/world-object";
import { GameContext } from "../../../Context/GameProvider";

const worldUnitsPerTile = gameConfig.worldUnitsPerTile;
const pixelPerWorldUnit = gameConfig.pixelPerWorldUnit;
const tileSizePx = worldUnitsPerTile * pixelPerWorldUnit;

const terrainColors: Record<TerrainType, string> = {
  grass: "#7cb342",
  water: "#42a5f5",
  rock: "#8d6e63",
  sand: "#ffd54f",
  mud: "#5d4037",
};

export function GameMap() {
  const { playerGameState } = useContext(GameContext);
  const character = playerGameState.character;
  const { knownTiles, knownObjects } = character.worldView;

  if (knownTiles.length === 0) {
    return (
      <div style={styles.container}>
        <h4>Map</h4>
        <div style={styles.empty}>No tiles discovered yet</div>
      </div>
    );
  }

  const minWorldX = Math.min(...knownTiles.map((t) => t.topLeftWorldUnit.x));
  const maxWorldX = Math.max(
    ...knownTiles.map((t) => t.topLeftWorldUnit.x + worldUnitsPerTile - 1),
  );
  const minWorldZ = Math.min(...knownTiles.map((t) => t.topLeftWorldUnit.z));
  const maxWorldZ = Math.max(
    ...knownTiles.map((t) => t.topLeftWorldUnit.z + worldUnitsPerTile - 1),
  );

  const worldUnitColumns = maxWorldX - minWorldX + 1;
  const worldUnitRows = maxWorldZ - minWorldZ + 1;
  const mapWidthPx = worldUnitColumns * pixelPerWorldUnit;
  const mapHeightPx = worldUnitRows * pixelPerWorldUnit;

  return (
    <div style={styles.container}>
      <h4>Map</h4>
      <div
        style={{ ...styles.mapRoot, width: mapWidthPx, height: mapHeightPx }}
      >
        {/* Layer 1: World unit grid — each cell = 1 world unit = pixelPerWorldUnit px */}
        <div style={styles.worldUnitGrid}>
          {Array.from({ length: worldUnitRows }, (_, row) => {
            console.log("rerender");
            const z = row + minWorldZ;
            return (
              <div id={`z${z}`} style={styles.row} key={row}>
                {Array.from({ length: worldUnitColumns }, (_, col) => {
                  const x = col + minWorldX;
                  const worldUnit: WorldUnit = { z, x };
                  const objectAtUnit = knownObjects.find(
                    (o) =>
                      o.origin.x === worldUnit.x && o.origin.z === worldUnit.z,
                  );
                  if (objectAtUnit) {
                    console.log(
                      `objectAtUnit z${worldUnit.z},x${worldUnit.x}`,
                      objectAtUnit,
                    );
                  }
                  return (
                    <WorldUnit_C {...{ worldUnit, row, col, objectAtUnit }} />
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Layer 2: Tiles — each tile = worldUnitsPerTile world units = tileSizePx px */}
        <div style={styles.tileLayer}>
          {knownTiles.map((tile) => (
            <Tile_C {...{ tile, minWorldX, minWorldZ }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorldUnit_C({
  worldUnit,
  row,
  col,
  objectAtUnit,
}: {
  worldUnit: WorldUnit;
  row: number;
  col: number;
  objectAtUnit: WorldObject | undefined;
}) {
  const buildingAtUnit = objectAtUnit && objectAtUnit.objectType === "building";
  const characterAtUnit =
    objectAtUnit && objectAtUnit.objectType === "character";
  const landmarkAtUnit = objectAtUnit && objectAtUnit.objectType === "landmark";
  const townAtUnit = objectAtUnit && objectAtUnit.objectType === "town";
  return (
    <div
      id={`z${worldUnit.z}x${worldUnit.x}`}
      key={`${row}-${col}`}
      style={{
        ...styles.worldUnitCell,
        width: pixelPerWorldUnit,
        height: pixelPerWorldUnit,
      }}
    >
      {buildingAtUnit && `🏡`}
      {characterAtUnit && `🙋‍♂️`}
      {landmarkAtUnit && `⛩️`}
      {townAtUnit && `🏰`}
    </div>
  );
}

function Tile_C({
  tile,
  minWorldX,
  minWorldZ,
}: {
  tile: Tile;
  minWorldX: number;
  minWorldZ: number;
}) {
  const left = (tile.topLeftWorldUnit.x - minWorldX) * pixelPerWorldUnit;
  const top = (tile.topLeftWorldUnit.z - minWorldZ) * pixelPerWorldUnit;
  return (
    <div
      key={`${tile.topLeftWorldUnit.x},${tile.topLeftWorldUnit.z}`}
      style={{
        ...styles.tileCell,
        left,
        top,
        width: tileSizePx,
        height: tileSizePx,
        background: terrainColors[tile.terrainType] ?? "#9e9e9e",
      }}
    />
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    overflow: "auto",
  },
  empty: {
    padding: 8,
    color: "#666",
  },
  mapRoot: {
    position: "relative",
    border: "1px solid #333",
  },
  worldUnitGrid: {
    zIndex: 1,
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
  },
  worldUnitCell: {
    boxSizing: "border-box",
    borderRight: "1px solid #eee",
    borderBottom: "1px solid #eee",
  },
  tileLayer: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  tileCell: {
    position: "absolute",
    boxSizing: "border-box",
    border: "1px solid #333",
  },
};
