import { useContext } from "react"
import { GameProvider } from "../AppContext/game.provider"
import { RemoteContext } from "../AppContext/remote.provider"
import { Host_C } from "../Host/Host"
import { Game_C } from "./Game/Game"

export function RemoteGame() {
  const { clientPlayerGameState } = useContext(RemoteContext)

  return (
    <div>
      {clientPlayerGameState ? (
        <GameProvider game={clientPlayerGameState}>
          <Game_C />
        </GameProvider>
      ) : (
        <Host_C />
      )}
    </div>
  )
}
