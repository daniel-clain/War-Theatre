import fs from "fs";
import path from "path";
import { Socket } from "socket.io";
import { ClientState, GameLobby } from "../../shared/types/host";
import { Scenario } from "../../shared/types/scenario-variables";

import { createGame, Game } from "../../game/game";
import { Player } from "../../game/main-types/player";
import { Host } from "./host";

export function handleSocketMessages({
  host,
  socket,
}: {
  host: Host;
  socket: Socket;
}) {
  function connectToHost({
    clientId,
    name,
  }: {
    clientId: string;
    name: string;
  }) {
    console.log("connect to host ", name, clientId);
    const existingClient = host.connectedClients.find(
      (p) => p.clientId == clientId
    );
    if (existingClient) {
      console.log(`${existingClient.name} has reconnected`);

      existingClient.name = name;
      existingClient.socket = socket;
      const existingGame = host.games.find((g) =>
        g.state.players.find((p) => p.clientId == existingClient.clientId)
      );

      existingGame?.onStateChange.subscribe((state) => {
        const player = state.players.find(
          (p) => p.clientId == existingClient.clientId
        );
        if (player) {
          player.clientId = existingClient.clientId;
        }
      });

      host.connectedClients.forEach((client) => {
        console.log(
          `${client.name}: ${client.socket ? " connected" : " disconnected"}`
        );
      });
    } else {
      console.log("no existing, pushing ", clientId, name);
      host.connectedClients.push({
        clientId,
        name,
        socket,
        points: 0,
      });
    }

    host.emitHostStateToClients();
  }

  function createGameLobby() {
    const client = getClientState();
    host.gameLobbies.push({
      creator: client,
      playersJoined: [],
      gameLobbyId: "" + Date.now(),
    });
    host.emitHostStateToClients();
  }

  function joinGameLobby({ lobbyId }: { lobbyId: string }) {
    const client = getClientState();
    host.gameLobbies.map((gameLobby) => {
      if (gameLobby.gameLobbyId == lobbyId) {
        gameLobby.playersJoined.push(client);
      }
      return gameLobby;
    });
    host.emitHostStateToClients();
  }

  function startGame(scenario: Scenario) {
    const gameLobby = getGameLobbyBySocket();
    const players: Player[] = [
      gameLobby.creator,
      ...gameLobby.playersJoined,
    ].map((client): Player => {
      const c = host.connectedClients.find(
        (c) => c.clientId == client.clientId
      )!;
      if (!c) {
        throw `should have found Client ${client.clientId} `;
      }
      return {
        clientId: c.clientId,
      };
    });
    const game = createGame(scenario, players);

    host.games.push(game);

    console.log("game started");
    host.gameLobbies = host.gameLobbies.filter(
      (l) => l.gameLobbyId != gameLobby.gameLobbyId
    );
    host.emitHostStateToClients();
  }

  function setInForNextGame({ isIn }: { isIn: boolean }) {
    host.connectedClients.find((c) => {
      if (c.socket?.id == socket.id) {
        c.inForNextGame = isIn;
        return true;
      }
      return false;
    });
    host.emitHostStateToClients();
  }

  function endGame() {
    const game = getGameBySocket();

    game.onStateChange.complete();

    host.games = host.games.filter((g) => g.props.id != game.props.id);
    host.emitHostStateToClients();
  }

  return {
    endGame,
    connectToHost,
    startGame,
    setInForNextGame,
    createGameLobby,
    joinGameLobby,
    loadScenarios,
    saveScenario,
    deleteScenario,
  };

  function loadScenarios() {
    const scenariosDir = path.join(process.cwd(), "saved scenarios");
    const files = fs.readdirSync(scenariosDir);
    const scenarios = files.map((file) => {
      const filePath = path.join(scenariosDir, file);
      const scenario = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      ) as Scenario;
      return scenario;
    });
    return scenarios;
  }
  function deleteScenario({ id }: { id: string }) {
    const scenariosDir = path.join(process.cwd(), "saved scenarios");
    const files = fs.readdirSync(scenariosDir);
    const scenarios = files.map((file) => {
      const filePath = path.join(scenariosDir, file);
      const scenario = JSON.parse(
        fs.readFileSync(filePath, "utf-8")
      ) as Scenario;
      return scenario;
    });
  }
  function saveScenario({ scenario }: { scenario: Scenario }) {
    const scenariosDir = path.join(process.cwd(), "saved scenarios");
    fs.writeFileSync(
      path.join(scenariosDir, `${scenario.id}.json`),
      JSON.stringify(scenario, null, 2),
      "utf-8"
    );
  }

  function getClientState(): ClientState {
    const client = host.connectedClients.find(
      (client) => client.socket?.id == socket.id
    )!;
    return host.getClientsState(client);
  }

  function getGameLobbyBySocket(): GameLobby {
    const client = getClientState();
    return host.gameLobbies.find(
      (lobby) => lobby.creator.clientId == client.clientId
    )!;
  }
  function getGameBySocket(): Game {
    const client = getClientState();
    const game = host.games.find((game) =>
      game.state.players.some((player) => player.clientId == client.clientId)
    )!;
    return game;
  }
}

export function handleSocketDisconnect({
  host,
  socket,
}: {
  host: Host;
  socket: Socket;
}) {
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    const disconnectedClient = host.connectedClients.find(
      (client) => client.socket?.id == socket.id
    );
    if (disconnectedClient) {
      disconnectedClient.socket = undefined;
    }

    host.connectedClients.forEach((client) => {
      console.log(
        `${client.name}: ${client.socket ? " connected" : " disconnected"}`
      );
    });
  });
}
