import { random } from "lodash"
import { Game } from "../main-types/game"
import { World } from "../main-types/world"
import { Client } from "../types/host"
import { createPlayer } from "./player"

export function createGame(
  scenarioCreator: (g: Game) => World,
  clients?: Client[]
): Game {
  const world = scenarioCreator(this)
  const players = (clients ?? []).map((client) => {
    const charsWithoutPlayers = world.characters.filter((c) => !c.playerId)
    const randomCharacter =
      charsWithoutPlayers[random(0, charsWithoutPlayers.length)]
    return createPlayer(randomCharacter.characterId, client)
  })
  const g: Game = {
    gameId: "" + Date.now(),
    world,
    players,
  }
  return g
}
