import { useWebsockets } from "./useWebsocket.service";

export function useGameService(websockets: ReturnType<typeof useWebsockets>) {
  const { playerGameState, hostState } = websockets;

  return { playerGameState, hostState };
}
