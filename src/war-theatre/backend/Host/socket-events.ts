import { Socket } from "socket.io"
import { Client, ClientState, GameLobby } from "../../shared/types/host"
import { Game } from "../MainGame/game"
import { createCultRitualScenario } from "../MainGame/scenario-one"
import { Host } from "./host"

export function handleSocketMessages({
  host,
  socket,
}: {
  host: Host
  socket: Socket
}) {
  function connectToHost({
    clientId,
    name,
  }: {
    clientId: string
    name: string
  }) {
    console.log("connect to host ", name, clientId)
    const existingClient = host.connectedClients.find(
      (p) => p.clientId == clientId
    )
    if (existingClient) {
      console.log(`${existingClient.name} has reconnected`)

      existingClient.name = name
      existingClient.socket = socket
      const existingGame = host.games.find((g) =>
        g.players.find((p) => p.client?.clientId == existingClient.clientId)
      )

      existingGame?.controller.playerReconnect(existingClient)

      host.connectedClients.forEach((client) => {
        console.log(
          `${client.name}: ${client.socket ? " connected" : " disconnected"}`
        )
      })
    } else {
      console.log("no existing, pushing ", clientId, name)
      host.connectedClients.push({
        clientId,
        name,
        socket,
      })
    }

    host.emitHostStateToClients()
  }

  function createGameLobby() {
    const client = getClientState()
    host.gameLobbies.push({
      creator: client,
      playersJoined: [],
      gameLobbyId: "" + Date.now(),
    })
    host.emitHostStateToClients()
  }

  function joinGameLobby({ lobbyId }: { lobbyId: string }) {
    const client = getClientState()
    host.gameLobbies.map((gameLobby) => {
      if (gameLobby.gameLobbyId == lobbyId) {
        gameLobby.playersJoined.push(client)
      }
      return gameLobby
    })
    host.emitHostStateToClients()
  }

  function startGame() {
    const gameLobby = getGameLobbyBySocket()
    const connectedClients: Client[] = [
      gameLobby.creator,
      ...gameLobby.playersJoined,
    ].map(
      (client) =>
        host.connectedClients.find((c) => c.clientId == client.clientId)!
    )
    const game = new Game(createCultRitualScenario)
    host.games.push(game)
    console.log("game started")
    host.gameLobbies = host.gameLobbies.filter(
      (l) => l.gameLobbyId != gameLobby.gameLobbyId
    )
    host.emitHostStateToClients()
  }

  function setInForNextGame({ isIn }: { isIn: boolean }) {
    host.connectedClients.find((c) => {
      if (c.socket?.id == socket.id) {
        c.inForNextGame = isIn
        return true
      }
      return false
    })
    host.emitHostStateToClients()
  }

  function endGame() {
    const game = getGameBySocket()

    game.controller.tearDownGame()

    host.games = host.games.filter((g) => g.id != game.id)
    host.emitHostStateToClients()
  }

  return {
    endGame,
    connectToHost,
    startGame,
    setInForNextGame,
    createGameLobby,
    joinGameLobby,
  }

  function getClientState(): ClientState {
    const client = host.connectedClients.find(
      (client) => client.socket?.id == socket.id
    )!
    return host.getClientsState(client)
  }

  function getGameLobbyBySocket(): GameLobby {
    const client = getClientState()
    return host.gameLobbies.find(
      (lobby) => lobby.creator.clientId == client.clientId
    )!
  }
  function getGameBySocket(): Game {
    const client = getClientState()
    const game = host.games.find((game) =>
      game.players.some((player) => player.client?.clientId == client.clientId)
    )!
    return game
  }
}

export function handleSocketDisconnect({
  host,
  socket,
}: {
  host: Host
  socket: Socket
}) {
  socket.on("disconnect", () => {
    console.log("Client disconnected")
    const disconnectedClient = host.connectedClients.find(
      (client) => client.socket?.id == socket.id
    )
    if (disconnectedClient) {
      disconnectedClient.socket = undefined
    }

    host.connectedClients.forEach((client) => {
      console.log(
        `${client.name}: ${client.socket ? " connected" : " disconnected"}`
      )
    })
  })
}
