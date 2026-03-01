import { Socket } from "socket.io";
import { Scenario } from "../../shared/types/scenario-variables";

export type HostState = {
  connectedClients: ClientState[];
  activeGames: HostGameState[];
  gameLobbies: GameLobby[];
  scenarios: Scenario[];
};
export type ClientId = string;
export type Client = {
  name: string;
  clientId: ClientId;
  points: number;
  socket: Socket | undefined;
  inForNextGame?: boolean;
};

export type ClientState = Omit<Client, "socket">;

export type HostGameState = {
  time: number;
  playerIds: string[];
};

export type GameLobby = {
  gameLobbyId: string;
  creator: ClientState;
  playersJoined: ClientState[];
};
