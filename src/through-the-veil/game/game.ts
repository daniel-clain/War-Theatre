import { ActionName, Actions, actions, GetActionArgsType } from "./actions"
import { WorldState } from "./types"

let world: WorldState
let updateWorldState: (worldState: WorldState) => void
let gameTimeInterval

function startGame(
  worldState: WorldState,
  updateWorldStateFunction: (updatedWorld: WorldState) => void
) {
  updateWorldState = updateWorldStateFunction
  console.log("game starts with world", world)
  world = worldState
  clearInterval(gameTimeInterval)
  gameTimeInterval = setInterval(() => {
    world = { ...world, time: world.time + 1 }
    updateWorldState(world)
  }, 1000)
}

function doAction<Name extends ActionName>(
  actionName: Name,
  args: GetActionArgsType<Name>
) {
  const func = actions[actionName] as Actions[Name]

  const updatedWorld: WorldState = func({ world, ...(args as any) })

  world = updatedWorld

  updateWorldState(world)
}

export const game = {
  startGame,
  doAction,
}
