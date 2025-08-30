import { CSSProperties, useContext } from "react"
import { CharacterState } from "../../../../backend/MainGame/character"
import { GameContext } from "../../../AppContext/game.provider"

type Props = {
  character: CharacterState
}

export function Character_C(props: Props) {
  const {
    player: { options },
  } = useContext(GameContext)
  const { character } = props

  const {
    worldView,
    name,
    dead,
    actionPoints,
    activePlan,
    tile,
    alignment,
    items,
    beliefs,
  } = character

  console.log("character", character)

  return (
    <div style={styles.container}>
      <div style={styles.dataGroup}>
        <h4>Options</h4>
        not set
      </div>

      <div style={styles.dataGroup}>
        <h4>{name}</h4>

        <div style={styles.dataRow}>
          <div style={styles.dataName}>Tile</div>
          <div style={styles.dataValue}>
            {tile ? `x${tile.x}, y:${tile.y}` : "not set"}
          </div>
        </div>
        <div style={styles.dataRow}>
          <div style={styles.dataName}>Dead</div>
          <div style={styles.dataValue}>{"" + dead}</div>
        </div>
        <div style={styles.dataRow}>
          <div style={styles.dataName}>Action Points</div>
          <div style={styles.dataValue}>{actionPoints}</div>
        </div>
        <div style={styles.dataRow}>
          <div style={styles.dataName}>Active Plan</div>
          <div style={styles.dataValue}>{activePlan?.name}</div>
        </div>

        <div style={styles.dataRow}>
          <div style={styles.dataName}>other character in tile</div>
          <div style={styles.dataValue}>
            {tile?.characters
              .filter((c) => c.name != character.name)
              .map((c) => (
                <div key={c.name}>{c.name}</div>
              ))}
          </div>
        </div>

        <div style={styles.dataRow}>
          <div style={styles.dataName}>alignment</div>
          <div style={styles.dataValue}>{alignment}</div>
        </div>

        <div style={styles.dataRow}>
          <div style={styles.dataName}>items</div>
          <div style={styles.dataValue}>
            {!items.length ? "no items" : items.map((i) => <div>{i.name}</div>)}
          </div>
        </div>
      </div>

      <div style={styles.dataGroup}>
        <h4>Traits</h4>
        <div style={styles.dataRow}></div>
      </div>

      <div style={styles.dataGroup}>
        <h4>Beliefs</h4>
        {beliefs.map((b) => (
          <div style={styles.dataRow}>
            <div style={styles.dataValue}>{b.details}</div>
          </div>
        ))}
      </div>

      <div style={styles.dataGroup}>
        <h4>World View</h4>
        <div style={styles.dataRow}>
          <div style={styles.dataName}>Known Tiles</div>
        </div>
        {worldView.knownTiles.map((location) => (
          <div style={styles.dataGroup}>
            <div style={styles.dataRow} key={"" + location.x + location.y}>
              <div style={styles.dataValue}>
                {location.x + ", " + location.y}
              </div>
            </div>
            {location.characterNames
              .map((name) =>
                worldView.knownCharacters.find((c) => c.name == name)
              )
              .map((c) => (
                <div style={styles.dataGroup} key={c?.name}>
                  <div style={styles.dataRow}>
                    <div style={styles.dataName}>Name</div>
                    <div style={styles.dataValue}>{c?.name}</div>
                  </div>
                  <div style={styles.dataRow}>
                    <div style={styles.dataName}>Dead</div>
                    <div style={styles.dataValue}>{c?.dead}</div>
                  </div>
                  <div style={styles.dataRow}>
                    <div style={styles.dataName}>Current Action</div>
                    <div style={styles.dataValue}>{c?.activePlan?.name}</div>
                  </div>
                </div>
              ))}
          </div>
        ))}
        <div style={styles.dataRow}>
          <div style={styles.dataName}>Known Characters</div>
        </div>
        {worldView.knownCharacters.map((c) => (
          <div style={styles.dataGroup} key={c.name}>
            <div style={styles.dataRow}>
              <div style={styles.dataName}>Name</div>
              <div style={styles.dataValue}>{c.name}</div>
            </div>
            <div style={styles.dataRow}>
              <div style={styles.dataName}>Dead</div>
              <div style={styles.dataValue}>{"" + c.dead}</div>
            </div>
            <div style={styles.dataRow}>
              <div style={styles.dataName}>Last Seen Active Plan</div>
              <div style={styles.dataValue}>{c.activePlan?.name}</div>
            </div>
            <div style={styles.dataRow}>
              <div style={styles.dataName}>Last Seen Location</div>
              <div style={styles.dataValue}>
                x{c.tile?.x}, y:{c.tile?.y}
              </div>
            </div>
            <div style={styles.dataRow}>
              <div style={styles.dataName}>Time Last Seen</div>
              <div style={styles.dataValue}>{c.gameStepLastSeen}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles: Record<any, CSSProperties> = {
  container: {
    gap: 20,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#c4b69b",
    padding: 10,
    borderRadius: 2,
  },
  dataGroup: {
    backgroundColor: "#eaece3",
    border: "1px solid black",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  dataRow: {
    display: "flex",
    gap: 4,
    fontSize: 14,
    justifyContent: "flex-start",
  },
  dataName: {
    fontWeight: "bold",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
  },
  dataValue: {},
}
