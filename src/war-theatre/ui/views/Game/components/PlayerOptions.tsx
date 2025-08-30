import { useContext } from "react"

import { objToArray } from "../../../../backend/Game/services/utility.service"
import { GameContext } from "../../../AppContext/game.provider"

export function PlayerOptions_C() {
  const { player } = useContext(GameContext)
  const { options } = player

  const optionsArray = objToArray(options)

  return (
    <div>
      {optionsArray.map((option) => {
        return (
          <button onClick={() => console.log("option", option)}>
            {option.name}
          </button>
        )
      })}
    </div>
  )
}
