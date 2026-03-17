import { createContext, ReactNode } from "react";

import {
  GetServerFunctionArgs,
  ServerFunctionNames,
} from "../../shared/types/message-to-server";
import { GameBackendInterface } from "./game-backend-interface.service";
import { useGameService } from "./useGame.service";

export interface SendCallback {
  <Name extends ServerFunctionNames>(
    name: Name,
    args: GetServerFunctionArgs<Name>,
  ): void;
}

export const GameProvider = ({
  gameBackendInterface,
  children,
}: {
  gameBackendInterface: GameBackendInterface;
  children: ReactNode;
}) => {
  const game = useGameService(gameBackendInterface);

  return (
    <GameContext.Provider value={{ ...game }}>{children}</GameContext.Provider>
  );
};

export type ContextProps = ReturnType<typeof useGameService>;

export const GameContext = createContext<ContextProps>({} as ContextProps);
