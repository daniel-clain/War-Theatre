import { useEffect, useState } from "react";
import { PlayerGameState } from "../../game/main-types/player";
import { GameBackendInterface } from "./game-backend-interface.service";

export function useGameService(gameBackendInterface: GameBackendInterface) {
  const [playerGameState, setPlayerGameState] = useState<PlayerGameState>(
    gameBackendInterface.game.getPlayerGameState("1"),
  );
  useEffect(() => {
    const subscription = gameBackendInterface.onPlayerGameStateUpdate.subscribe(
      (playerGameState) => {
        setPlayerGameState(playerGameState);
      },
    );
    return () => subscription.unsubscribe();
  }, []);
  return { playerGameState };
}
