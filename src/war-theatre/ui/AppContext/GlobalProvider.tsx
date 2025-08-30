import { createContext, ReactNode } from "react"

import {
  GetServerFunctionArgs,
  ServerFunctionNames,
} from "../../shared/types/message-to-server"
import { useAppService } from "./useApp.service"

export interface SendCallback {
  <Name extends ServerFunctionNames>(
    name: Name,
    args: GetServerFunctionArgs<Name>
  ): void
}

export const Provider = ({ children }: { children: ReactNode }) => {
  const app = useAppService()

  return <Context.Provider value={app}>{children}</Context.Provider>
}

export type ContextProps = ReturnType<typeof useAppService>

export const Context = createContext<ContextProps>({} as ContextProps)
