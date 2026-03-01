import { isArray } from "lodash"
import { useSelector } from "react-redux"
import { game } from "../../../game/game"
import { Character } from "../../../game/types"
import { log } from "console"

export default function CharacterList() {
  const characters = useSelector(
    (gameState: UIGameState) => gameState.world.characters
  )
  console.log("characters", characters)
  return (
    <div>
      <h2 className="font-semibold mb-1">Characters</h2>
      <ul className="space-y-1 text-sm">
        {/* {characters.map((c) => (
          <li key={c.id} className="p-2 bg-white border rounded shadow">
            <strong>{c.name}</strong> ({c.role})<br />
            Location: {c.locationId}
            <br />
            Knowledge: {c.knowledge.length ? c.knowledge.join(", ") : "Unknown"}
          </li>
        ))} */}
        <h3>New</h3>
        name <input />
        <br></br>
        type
        <input />
        <br></br>
        value
        <input />
        <br></br>
        {characters.map((c) => {
          return (
            <div key={c.id}>
              <div>
                <hr />
                <p>id: {c.id}</p>
                <button
                  onClick={() => {
                    game.doAction("updateEntity", {
                      entity: {
                        ...c,
                        id: Date.now().toString(),
                      },
                    })
                  }}
                >
                  reset id
                </button>

                <p>properties: </p>
                {Object.keys(c).map((key) => {
                  const value = c[key]
                  return (
                    <div key={key}>
                      <h3>{key}</h3>
                      {typeof value == "string" || typeof value == "number" ? (
                        <input
                          value={value}
                          type={typeof value == "number" ? "number" : "text"}
                        />
                      ) : isArray(value) ? (
                        <div>
                          {key} array
                          {value.map((item) => (
                            <div key={item}>{item}</div>
                          ))}
                        </div>
                      ) : typeof value == "boolean" ? (
                        <input type="checkbox" checked={value} />
                      ) : (
                        <p>value: {value}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </ul>
    </div>
  )

  function updateCharacter<C extends Character, K extends keyof C>(
    id: K,
    value: C[K]
  ) {}
}
