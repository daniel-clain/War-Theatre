import { useEffect, useState } from "react"

import { createGame } from "../../game/services/game"
import { createCultRitualScenario } from "../../game/test-scenarios/cult-ritual-scenario"
import { ClientPlayerGameState } from "./useWebsocket.service"

export function useLocal() {
  const [payerGameState, setPlayerGameState] = useState<
    ClientPlayerGameState | undefined
  >()
  const [update, setUpdate] = useState<boolean>()

  useEffect(() => {
    const game = createGame(createCultRitualScenario, [
      { clientId: "123", name: "Dan" },
    ])
    const playerGameState = game.services.getPlayerGameState()
    setPlayerGameState(playerGameState)
    game.gameStateUpdated.subscribe(() => {
      const playerGameState = game.services.players[0].getPlayerGameState()
      setPlayerGameState(playerGameState)
      //setUpdate((x) => !x)
    })
    return () => {
      game.controller.stopGame()
    }
  }, [])

  return { payerGameState }
}
