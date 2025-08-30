import { useContext } from "react"
import { GameContext } from "../../../AppContext/game.provider"

export function CharacterSelectDropdown() {
  const { player, world } = useContext(GameContext)

  return (
    <select
      value="Select Character"
      onChange={(event) => {
        const char = world.characters.find((c) => c.name == event.target.value)
        if (char) {
          player.options.setActiveCharacter(char.name)
        }
      }}
    >
      <option value="Select Character">Select Character</option>
      {world.characters.map((c) => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  )
}
