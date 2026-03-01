import { CSSProperties, useContext } from "react";
import { sameCoords } from "../../../../game/Game/services/utility.service";
import { Coords } from "../../../../game/main-types/biome";
import { PlayerState } from "../../../../game/main-types/player";
import { AppContext } from "../../../Context/AppProvider";

const tileWidth = 80;
const tileHeight = 70;
export function GameMap() {
  const { playerGameState } = useContext(AppContext);

  const { world } = playerGameState!;

  const biggestX = world.towns.reduce(
    (max, town) => Math.max(max, town.coords.x),
    0
  );
  const biggestY = world.towns.reduce(
    (max, town) => Math.max(max, town.coords.y),
    0
  );

  const xAmount = biggestX;
  const yAmount = biggestY;
  return (
    <div style={{ ...styles.mapContainer }}>
      <h4>Map</h4>
      <div style={{ ...styles.map, width: xAmount * tileWidth + 1 }}>
        {Array.from({ length: yAmount }, (_, y) => {
          return (
            <div style={styles.mapRow} key={y}>
              {Array.from({ length: xAmount }, (_, x) => (
                <MapTile coords={{ x, y }} player={player} key={"" + x + y} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MapTile({ coords, player }: { coords: Coords; player?: PlayerState }) {
  const character = player?.character;
  console.log("character", character);

  if (!character || !character.coords) {
    return <div style={styles.mapTile}></div>;
  } else {
    const isPlayersCharacterLocation = sameCoords(character?.coords, coords);
    const knownTile = character.worldView.knownTiles.find((knownTile) =>
      sameCoords(knownTile, coords)
    );
    if (knownTile) {
      console.log("knownLocation", knownTile);
    }

    const knownCharactersInLocation =
      character.worldView.knownCharacters.filter(
        ({ tile }) => tile && sameCoords(tile, coords)
      );
    const townInTile = knownTile?.landmarks.find((l) => l.type == "town");

    return (
      <div
        style={{
          ...styles.mapTile,
          ...(knownTile ? styles.knownTile : {}),
          ...(townInTile ? styles.cityTile : {}),
        }}
      >
        <div style={styles.mapTileContent}>
          {townInTile && (
            <div>
              {townInTile.symbol} {townInTile.name}
            </div>
          )}
          {isPlayersCharacterLocation && (
            <div>
              {character.dead ? "💀" : "😎"} {character.name}
            </div>
          )}
          {knownCharactersInLocation?.map((knownCharacter) => {
            return (
              <div>
                {knownCharacter.dead ? "💀" : "🤓"} {knownCharacter.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const styles: Record<string, CSSProperties> = {
  mapContainer: {
    overflow: "auto",
  },
  map: {
    borderTop: 1,
    borderLeft: 1,
    borderStyle: "solid",
    borderColor: "black",
    display: "flex",
    flexDirection: "column",
    overflow: "visible",
  },
  mapRow: { display: "flex" },
  mapTile: {
    width: tileWidth - 1,
    height: tileHeight - 1,
    background: "#daded7",
    borderStyle: "solid",
    borderColor: "black",
    borderRight: 1,
    borderBottom: 1,
  },
  knownTile: {
    background: "#b5e8ab",
  },
  playerName: {
    fontSize: 12,
  },
  mapTileContent: {
    padding: 4,
  },
  cityTile: {
    background: "#f2e69d",
  },
};
