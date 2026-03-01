import { Player } from "./player"
import { World } from "./world"

export type GameId = string
export type Game = {
  gameId: GameId
  world: World
  players: Player[]
}
