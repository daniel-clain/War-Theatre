import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import { PlayerGameState } from "../../game/main-types/player";
import { HostState } from "../../shared/types/host";
import {
  MessagesToServer,
  PlayerOptionNames,
  ServerFunctionNames,
} from "../../shared/types/message-to-server";

const envUrl = process.env.REACT_APP_WEBSOCKET_URL;
console.log("envUrl", envUrl);
const socket = socketIOClient(`http://${envUrl}`);

export function useWebsockets() {
  const [hostState, setHostState] = useState<HostState>();
  const [playerGameState, setPlayerGameState] = useState<PlayerGameState>();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log("socket use effect", socket.id);
  }, [socket]);

  socket.on("connect", () => {
    console.log("Connected to WebSocket server");
    setConnected(true);

    socket.on("HostState", (bs: HostState) => {
      console.log("HostState received from server:", bs);
      setHostState(bs);
    });

    socket.on<"PlayerGameState">("PlayerGameState", (ps: PlayerGameState) => {
      console.log("PlayerGameState received from server:", ps);
      setPlayerGameState(ps);
    });
  });
  socket.on("connect_error", (error: any) => {
    //console.error("Connection failed:", error)

    setConnected(false);
  });

  function send<T extends ServerFunctionNames | PlayerOptionNames>({
    name,
    args,
  }: MessagesToServer<T>) {
    console.log("send", name);
    socket?.send({ name, args });
  }

  return { hostState, playerGameState, connected, send };
}
