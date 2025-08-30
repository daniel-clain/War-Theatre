import { createContext, ReactNode } from "react"
import { useRemote } from "./useRemote.service"

export const RemoteProvider = ({ children }: { children: ReactNode }) => {
  const remote = useRemote()
  return (
    <RemoteContext.Provider value={remote}>{children}</RemoteContext.Provider>
  )
}

export type ContextProps = ReturnType<typeof useRemote>

export const RemoteContext = createContext<ContextProps>({} as ContextProps)
