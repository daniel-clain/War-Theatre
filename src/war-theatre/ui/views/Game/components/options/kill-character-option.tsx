/* import { useContext, useState } from "react"
import { Context } from "../../../../AppContext/GlobalProvider"

export function KillCharacterOption() {
  const { player, send } = useContext(Context)
  const [selectedCharacterName, setSelectedCharacterName] = useState<
    string | undefined
  >(player?.character?.name)

  const wv = player?.character?.worldView
  if (!wv) {
    return null
  }
  const { knownCharacters, knownLocations } = wv

  return (
    <div>
      <h3>select who to kill</h3>
      <select
        value={selectedCharacterName}
        onChange={(event) => {
          console.log(event)
          const name = event.target.value as any
          console.log("character", name)
          setSelectedCharacterName(name)
        }}
      >
        {knownCharacters.map((victimOption) => (
          <option
            selected={victimOption.name == selectedCharacterName}
            value={victimOption.name}
          >
            {victimOption.name}
          </option>
        ))}
      </select>

    </div>
  )
}
 */
