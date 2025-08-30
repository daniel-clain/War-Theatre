import { Server, Socket } from "socket.io"
import {
  Client,
  ClientState,
  GameLobby,
  HostGameState,
  HostState,
} from "../../shared/types/host"
import {
  MessagesToServer,
  ServerFunctionNames,
} from "../../shared/types/message-to-server"
import { Game } from "../MainGame/game"
import { handleSocketDisconnect, handleSocketMessages } from "./socket-events"

export class Host {
  connectedClients: Client[] = []
  games: Game[] = []
  gameLobbies: GameLobby[] = []

  constructor(public websocketServer: Server) {
    websocketServer.on("connection", this.handleNewSocketConnection.bind(this))
  }
  handleNewSocketConnection(socket: Socket) {
    const host: Host = this
    const funcs = handleSocketMessages({ host, socket })

    socket.on(
      "message",
      <Name extends ServerFunctionNames>(message: MessagesToServer<Name>) => {
        const { name, args } = message
        if (funcs[name]) {
          console.log("received", name, args)
          funcs[name](args as any)
        }
      }
    )
    handleSocketDisconnect({ host, socket })
  }
  emitHostStateToClients() {
    const activeGames: HostGameState[] = this.games.map(
      ({ world: { time }, players }) => ({
        time,
        playerIds: players.map((p) => p.client!.clientId),
      })
    )
    const connectedClients = this.connectedClients.map(this.getClientsState)

    const hostState: HostState = {
      activeGames,
      connectedClients,
      gameLobbies: this.gameLobbies,
    }

    this.websocketServer.emit("HostState", hostState)
  }

  getClientsState(client: Client): ClientState {
    const { clientId, name, inForNextGame } = client
    const clientState: ClientState = {
      clientId,
      name,
      inForNextGame,
    }
    return clientState
  }
}
