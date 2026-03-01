import { useEffect, useState } from "react";
import { useWebsockets } from "./useWebsocket.service";

export function useAppService(websockets: ReturnType<typeof useWebsockets>) {
  const [activeView, setActiveView] = useState<"game" | "builder" | "host">(
    "host",
  );
  const { connected, send, hostState, playerGameState } = useWebsockets();

  useEffect(() => {
    switch (activeView) {
      case "game":
        break;
      case "builder":
        break;
      case "host":
        break;
      default:
        setActiveView("host");
    }
  }, []);
  return {
    activeView,
    setActiveView,
  };
}
