import { nanoid } from "nanoid";
import { ClientState } from "../shared/types/host";
import { Scenario } from "../shared/types/scenario-variables";
import { createGameController } from "./Game/services/game.controller.service";
import {
  createPlayers,
  getScenarioInstance,
} from "./Game/services/game.setup.service";
import { GameState } from "./main-types/game";

export function createGame(scenario: Scenario, clients: ClientState[]) {
  const props = {
    id: nanoid(),
  };
  const { world } = getScenarioInstance(scenario);

  const state: GameState = {
    world,
    players: createPlayers(clients, world.characters),
  };

  const controller = createGameController(state);

  controller.startTheGame();

  return {
    onPlayerStateChange: controller.onPlayerStateChange,
    getPlayerGameState: controller.getPlayerGameState,
    props,
    state,
  };
}
