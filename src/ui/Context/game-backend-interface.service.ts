import { Subject } from "rxjs";
import { createGame } from "../../game/game";
import { Game } from "../../game/main-types/game";
import { PlayerGameState } from "../../game/main-types/player";
import { Scenario } from "../../shared/types/scenario-variables";

export type GameBackendInterface = {
  onPlayerGameStateUpdate: Subject<PlayerGameState>;
  game: Game;
};

export const gameBackendInterface = ((): GameBackendInterface => {
  const onPlayerGameStateUpdate = new Subject<PlayerGameState>();

  const game = createGame({} as Scenario, [
    { clientId: "1", name: "Danhousen", points: 0 },
  ]);

  game.onPlayerStateChange.subscribe(({ clientId, playerGameState }) => {
    onPlayerGameStateUpdate.next(playerGameState);
  });
  return {
    onPlayerGameStateUpdate,
    game,
  };
})();
