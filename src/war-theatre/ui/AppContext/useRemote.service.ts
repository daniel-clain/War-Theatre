import { useEffect, useState } from "react"
import { ClientPlayerOptions } from "../../backend/MainGame/player"
import { Coords } from "../../backend/MainGame/tile"
import { getThisClientId, getThisName } from "./setupClientLocalStorage"
import {
  ClientPlayerGameState,
  ClientPlayerState,
  useWebsockets,
} from "./useWebsocket.service"

export function useRemote() {
  const thisClientId = getThisClientId()
  const [localName, setLocalName] = useState<string | undefined>(getThisName())

  const { connected, send, hostState, playerGameState } = useWebsockets()

  useEffect(() => {
    console.log(localName, connected)
    if (localName && connected) {
      if (nameIsNotSet()) {
        console.log("set name connect to host")
        send<"connectToHost">({
          name: "connectToHost",
          args: { clientId: thisClientId, name: localName },
        })
      }
    }
  }, [connected, localName])

  const playerInGame: boolean = !!hostState?.activeGames.some((g) =>
    g.playerIds.some((pid) => pid == thisClientId)
  )

  const playerOptions: ClientPlayerOptions = {
    setPlanTargetTile,
    setActiveCharacter,
    activatePlan,
    setPlanTargetCharacter,
    choosePlan,
  }

  const playerState: ClientPlayerState = {
    character: playerGameState?.player.character,
    options: playerOptions,
  }
  const clientPlayerGameState: ClientPlayerGameState | undefined =
    !playerGameState
      ? undefined
      : {
          player: playerState,
          world: playerGameState.world,
        }

  return {
    playerInGame,
    thisClientId,
    localName,
    setLocalName,
    hostState,
    connected,
    send,
    stopGame,
    clientPlayerGameState,
    playerOptions,
  }

  function setActiveCharacter(characterName: string) {
    send({ name: "setActiveCharacter", args: [characterName] })
  }
  function setPlanTargetCharacter(characterName: string) {
    send({ name: "setPlanTargetCharacter", args: [characterName] })
  }
  function setPlanTargetTile(coords: Coords) {
    send({ name: "setPlanTargetTile", args: [coords] })
  }
  function activatePlan() {
    send({ name: "activatePlan" })
  }
  function choosePlan(planName: string) {
    send({ name: "choosePlan", args: [planName] })
  }

  function stopGame() {
    console.log("need websocket message to stop the game")
  }

  function nameIsNotSet() {
    const existingConnectedPlayerById = hostState?.connectedClients.find(
      ({ clientId }) => clientId == thisClientId
    )
    if (!existingConnectedPlayerById) {
      console.error("should have found existing player with id ", thisClientId)
      return true
    } else {
      if (!existingConnectedPlayerById.name) {
        return true
      } else {
        return false
      }
    }
  }
}
