import { createContext, ReactNode } from "react"
import { useLocal } from "./useLocal.service"

export const LocalProvider = ({ children }: { children: ReactNode }) => {
  const payerGameState = useLocal()
  return (
    <LocalContext.Provider value={payerGameState}>
      {children}
    </LocalContext.Provider>
  )
}

export type ContextProps = ReturnType<typeof useLocal>

export const LocalContext = createContext<ContextProps>({} as ContextProps)
