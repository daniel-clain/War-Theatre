import { GetOptionArgs, Player } from "../main-types/player"
import { PlayerOptions } from "../main-types/player-options"
import { World } from "../main-types/world"
import { Client } from "../types/host"
import { getPlayerGameState } from "./player"

export function sendUpdateToCharactersPlayerClient(
  player: Player,
  world: World
) {
  const socket = player.client?.socket
  if (socket) {
    const playerGameState = getPlayerGameState(player, world)
    socket.emit("PlayerGameState", playerGameState)
  }
}

export function onCharacterActionFromPlayerClient(
  client: Client,
  callback: () => void
) {
  const socket = client?.socket
  if (socket) {
    socket.on(
      "message",
      <Name extends keyof PlayerOptions>(message: {
        name: Name
        args?: GetOptionArgs<Name>
      }) => {
        const { name, args } = message
        console.log("received", name, args)
      }
    )
  }
}
