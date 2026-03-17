import { Subject } from "rxjs";
import { ClientId } from "../types/host";
import { Player, PlayerGameState } from "./player";
import { World } from "./world";

export type GameId = string;
export type Game = {
  props: GameProps;
  state: GameState;
  onPlayerStateChange: Subject<{
    clientId: ClientId;
    playerGameState: PlayerGameState;
  }>;
  getPlayerGameState: (clientId: ClientId) => PlayerGameState;
};
export type GameProps = {
  id: GameId;
};
export type GameState = {
  world: World;
  players: Player[];
};
