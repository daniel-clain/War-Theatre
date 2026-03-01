import { WorldState } from "./types"

let timer: NodeJS.Timeout | null = null

/**
 * Starts the ticking loop and updates Redux state every second.
 * @param world - the starting world state
 * @param updateWorld - callback to dispatch updated world to Redux
 */
export function startGameLoop(
  world: WorldState,
  updateWorld: (world: WorldState) => void
) {
  if (timer) clearInterval(timer)

  timer = setInterval(() => {
    world = tick(world)
    updateWorld(world)
  }, 1000)
}

/**
 * Stops the ticking loop.
 */
export function stopGameLoop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
