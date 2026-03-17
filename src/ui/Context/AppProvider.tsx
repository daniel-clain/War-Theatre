import { createContext, ReactNode } from "react";

import {
  GetServerFunctionArgs,
  ServerFunctionNames,
} from "../../shared/types/message-to-server";
import { useHostService } from "./host.service";
import { useAppService } from "./useApp.service";
import { useScenarioBuilderService } from "./useScenarioBuilder.service";
import { useWebsockets } from "./useWebsocket.service";

export interface SendCallback {
  <Name extends ServerFunctionNames>(
    name: Name,
    args: GetServerFunctionArgs<Name>,
  ): void;
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const websockets = useWebsockets();
  const app = useAppService(websockets);
  const scenarioBuilder = useScenarioBuilderService(websockets);
  const host = useHostService(websockets);

  return (
    <AppContext.Provider value={{ ...app, ...host, ...scenarioBuilder }}>
      {children}
    </AppContext.Provider>
  );
};

export type ContextProps = ReturnType<typeof useAppService> &
  ReturnType<typeof useHostService> &
  ReturnType<typeof useScenarioBuilderService>;

export const AppContext = createContext<ContextProps>({} as ContextProps);
