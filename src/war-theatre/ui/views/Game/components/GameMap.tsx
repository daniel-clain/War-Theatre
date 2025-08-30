import { CSSProperties, useContext } from "react"
import { sameCoords } from "../../../../backend/Game/services/utility.service"
import { PlayerState } from "../../../../backend/MainGame/player"
import { Coords } from "../../../../backend/MainGame/tile"
import { gameConfig } from "../../../../shared/game-config"
import { GameContext } from "../../../AppContext/game.provider"

const tileWidth = 80
const tileHeight = 70
export function GameMap() {
  const { player } = useContext(GameContext)

  const { xAmount, yAmount } = gameConfig.worldSize
  return (
    <div style={{ ...styles.mapContainer }}>
      <h4>Map</h4>
      <div style={{ ...styles.map, width: xAmount * tileWidth + 1 }}>
        {Array.from({ length: yAmount }, (_, y) => {
          return (
            <div style={styles.mapRow} key={y}>
              {Array.from({ length: xAmount }, (_, x) => {
                return (
                  <MapTile coords={{ x, y }} player={player} key={"" + x + y} />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MapTile({ coords, player }: { coords: Coords; player?: PlayerState }) {
  const character = player?.character
  console.log("character", character)

  if (!character || !character.tile) {
    return <div style={styles.mapTile}></div>
  } else {
    const isPlayersCharacterLocation = sameCoords(character?.tile, coords)
    const knownTile = character.worldView.knownTiles.find((knownTile) =>
      sameCoords(knownTile, coords)
    )
    if (knownTile) {
      console.log("knownLocation", knownTile)
    }

    const knownCharactersInLocation =
      character.worldView.knownCharacters.filter(
        ({ tile }) => tile && sameCoords(tile, coords)
      )
    const townInTile = knownTile?.landmarks.find((l) => l.type == "town")

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
            )
          })}
        </div>
      </div>
    )
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
}
