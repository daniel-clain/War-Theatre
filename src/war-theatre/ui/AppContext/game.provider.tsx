import { createContext, PropsWithChildren } from "react"
import { useGame } from "./useGame.service"
import { ClientPlayerGameState } from "./useWebsocket.service"

type Props = {
  game: ClientPlayerGameState
}
export const GameProvider = ({ children, game }: PropsWithChildren<Props>) => {
  const g = useGame(game)
  return <GameContext.Provider value={g}>{children}</GameContext.Provider>
}

export type ContextProps = ReturnType<typeof useGame>
export const GameContext = createContext<ContextProps>({} as ContextProps)
