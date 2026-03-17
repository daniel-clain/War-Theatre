import { Subject } from "rxjs";
import { ClientId } from "../../../shared/types/host";
import { Character } from "../../main-types/character";
import { GameState } from "../../main-types/game";
import { Plan } from "../../main-types/plan";
import { PlayerGameState } from "../../main-types/player";

export function createGameController(state: GameState) {
  const onTimeStep: Subject<number> = new Subject();
  let gameTimerInterval: NodeJS.Timeout | undefined = undefined;
  const onPlayerStateChange: Subject<{
    clientId: ClientId;
    playerGameState: PlayerGameState;
  }> = new Subject();

  onTimeStep.subscribe((time) => {
    onTimeTick();
  });
  return {
    onPlayerStateChange,
    onTimeStep,
    state,
    onTimeTick,
    progressCharacterPlans,
    charactersSeeTheirTile,
    workThroughCharactersPlans,
    startTheGame,
    startTimeRunning,
    tearDownGame,
    getPlayerGameState,
  };

  function onTimeTick() {
    const { players, world } = state;
    if (world.time % 5 == 0) {
      charactersSeeTheirTile();
      progressCharacterPlans();

      players.forEach((player) => {
        sendPlayerGameState(player.clientId);
      });
    }
  }
  function sendPlayerGameState(clientId: ClientId) {
    const playerGameState = getPlayerGameState(clientId);
    onPlayerStateChange.next({
      clientId,
      playerGameState,
    });
  }

  function getPlayerGameState(clientId: ClientId): PlayerGameState {
    const player = state.players.find((p) => p.clientId == clientId)!;
    const character = state.world.characters.find(
      (c) => c.objectId == player.characterId,
    )!;
    return {
      worldTime: state.world.time,
      character,
    };
  }

  function progressCharacterPlans() {
    state.world.characters.forEach((c) => {
      const p = c.activePlan;
      if (p && !p.isComplete) {
        workOnPlan(c, p);
      }
    });
  }
  function workOnPlan(character: Character, plan: Plan) {
    /*  if (!plan.mainAction) {
      throw new Error("Plan should have a main action");
    }
    plan.mainAction.workOnAction(); */
  }

  function charactersSeeTheirTile() {
    /* const { world } = state;
    const { time, characters } = world;
    characters.forEach((seeingCharacter) => {
      const thisTile = seeingCharacter?.tile;
      if (!thisTile) return;
      const seenCharacters = seeingCharacter.tile?.characters.filter(
        (c) => c.name != seeingCharacter.name
      );

      const knowTile = seeingCharacter.worldView.knownTiles.find(
        (l) => l.x == thisTile.x && l.y == thisTile.y
      )!;

      if (seenCharacters?.length) {
        seenCharacters.forEach(handleSeeingCharacter);
      }

      function handleSeeingCharacter(seenCharacter: Character) {
        console.log(seeingCharacter.name, " sees ", seenCharacter.name);
        if (!thisTile) return;
        const seenCharacterRef: KnownCharacter = {
          name: seenCharacter.name,
          dead: seenCharacter.dead,
          coords: seeingCharacter.coords,
          gameStepLastSeen: time,
        };
        const seenCharacterState = seeingCharacter.getState();

        const knowCharacter = seeingCharacter.worldView.knownCharacters.find(
          (c) => c.name == seenCharacter.name
        );

        if (!knowCharacter) {
          console.log(
            `${seeingCharacter.name} see ${seenCharacter.name} at x:${thisTile.x} y:${thisTile.y}`
          );

          console.log(
            seeingCharacter.name,
            "know before add",
            seeingCharacter.worldView.knownCharacters.map((c) => c.name)
          );

          if (seeingCharacter.player) {
            console.log(
              "last1",
              seeingCharacter.player.lastSentState?.player.character?.worldView
                .knownCharacters
            );
          }
          seeingCharacter.worldView.knownCharacters.push(seenCharacterRef);

          console.log(
            seeingCharacter.name,
            "know after add",
            seeingCharacter.worldView.knownCharacters.map((c) => c.name)
          );

          if (seeingCharacter.clientId) {
            const player = state.players.find(
              (p) => p.clientId == seeingCharacter.clientId
            )!;
            console.log(
              "last2",
              player.lastSentState?.character?.worldView
                .knownCharacters
            );
            const diff =
              isCurrentStateDifferentFromLastState(player, seeingCharacter);
            console.log("diff", diff);
          }
          /* console.log(seeingCharacter.name, " known characters: ")
          seeingCharacter.worldView.knownCharacters.forEach((c) =>
            console.log(c.name)
          ) 

          knowTile.characterNames?.push(seenCharacterState.name);
        } else {
          console.log("known ", seenCharacterRef.name, "from tiled");

          seeingCharacter.worldView.knownTiles.forEach((loopKnownTile) => {
            //remove known char from other existing tile
            loopKnownTile.characterNames = loopKnownTile.characterNames.filter(
              (n) => {
                if (n == seenCharacterRef.name) {
                  console.log(
                    " removing ",
                    seenCharacterRef.name,
                    " from ",
                    seeingCharacter.name,
                    " known tile ",
                    loopKnownTile
                  );
                  return false;
                }
                return true;
              }
            );
          });
          console.log(
            seeingCharacter.name,
            "add to ",
            knowTile,
            "if not already here"
          );
          //add known char to current tile
          if (
            !knowTile.characterNames.some((n) => n == seenCharacterRef.name)
          ) {
            knowTile.characterNames.push(seenCharacterRef.name);
          }

          //update known character in list
          seeingCharacter.worldView.knownCharacters =
            seeingCharacter.worldView.knownCharacters.map((c) => {
              if (c.name == seenCharacterRef.name) {
                console.log(
                  "update know character ref from ",
                  c,
                  " to ",
                  seenCharacterRef
                );
                return seenCharacterRef;
              }
              return c;
            });
        }
      }
    }); */
  }

  function workThroughCharactersPlans() {
    /* this.game.world.characters.forEach((c) => {
      if (!c.activePlan) {
        //console.error(`${c.name} should have a plan`)
        return
      }

      if (!c.activePlan.mainAction) {
        throw "project should have action"
      }

      const plan = c.activePlan

      if (!plan.mainAction.isCompleted) {
        console.log(
          "action.workDone",
          c.activePlan.mainAction.name,
          c.activePlan.mainAction.workDone
        )
        plan.workOnPlan()
        if (plan.mainAction.isCompleted) {
          c.activePlan = null
          c.plans = c.plans.filter((p) => p.name != plan.name)
        }
        c.actionPoints--
      }
    }) */
  }

  function startTheGame() {
    startTimeRunning();

    state.players.forEach((player) => {
      console.log("initial update");
      sendPlayerGameState(player.clientId);
    });
  }

  function startTimeRunning() {
    const { world } = state;

    gameTimerInterval = setInterval(() => {
      world.time++;
      if (world.time > 100) {
        //console.log("finish");
      } else {
        onTimeStep.next(world.time);
      }
    }, 1000);
  }

  function tearDownGame() {
    console.log(`tearing down game`);
    clearInterval(gameTimerInterval);
  }
}
