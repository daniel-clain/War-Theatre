import { useContext } from "react"
import { GameProvider } from "../AppContext/game.provider"
import { LocalContext } from "../AppContext/local.provider"
import { Game_C } from "./Game/Game"

export function LocalGame() {
  const { payerGameState } = useContext(LocalContext)

  return !payerGameState ? null : (
    <GameProvider game={payerGameState}>
      <Game_C />
    </GameProvider>
  )
}
