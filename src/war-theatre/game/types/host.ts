import { Socket } from "socket.io"

export type HostState = {
  connectedClients: ClientState[]
  activeGames: HostGameState[]
  gameLobbies: GameLobby[]
}
export type ClientId = string
export type Client = {
  name: string
  clientId: ClientId
  socket: Socket | undefined
  inForNextGame?: boolean
}

export type ClientState = Omit<Client, "socket">

export type HostGameState = {
  time: number
  playerIds: string[]
}

export type GameLobby = {
  gameLobbyId: string
  creator: ClientState
  playersJoined: ClientState[]
}
