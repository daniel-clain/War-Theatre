import { Subject } from "rxjs";
import { Scenario } from "../shared/types/scenario-variables";
import { Character } from "./main-types/character";
import { Player } from "./main-types/player";

export function createGame(scenario: Scenario, players: Player[]) {
  const props = {
    id: "" + Date.now(),
  };
  const instance = getScenarioInstance(scenario);
  const state = {
    world: instance.world,
    players,
  };
  const onStateChange: Subject<typeof state> = new Subject();

  const controller = createGameController(state);

  controller.startTheGame();

  controller.onUpdateForPlayer((pId: string, playersCharacter: Character) => {
    const player = state.players.find((p) => p.clientId == pId);

    player?.clientId;
  });

  return {
    onStateChange,
    props,
    state,
  };

  function getScenarioInstance(scenario: Scenario) {
    return {
      world: {
        time: 0,
        characters: [],
        towns: [],
        regions: [],
        landmarks: [],
        items: [],
        animals: [],
      },
    };
  }
}

export type Game = ReturnType<typeof createGame>;
export type GameState = Game["state"];
