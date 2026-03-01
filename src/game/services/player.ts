import { Character, CharacterId } from "../main-types/character"
import { Player, PlayerGameState } from "../main-types/player"
import { World } from "../main-types/world"
import { Client } from "../types/host"

function unsetCharacter(player: Player, characters: Character[]): Player {
  if (player.characterId) {
    const c = characters.find((c) => c.characterId == player.characterId)
    if (c) {
      c.playerId = undefined
    }
  }
  return { ...player, characterId: undefined }
}

function setCharacter(player: Player, newCharacter: Character) {
  player.characterId = newCharacter.characterId
  newCharacter.playerId = player.playerId
}

function isCurrentStateDifferentFromLastState(
  player: Player,
  characters: Character[]
): boolean {
  if (!player.characterId) {
    return !!player.lastSentState
  }

  const current = characters.find((c) => c.characterId == player.characterId)
  const last = player.lastSentState?.character
  if (!last) return true

  const currentJson = JSON.stringify(current)
  const lastJson = JSON.stringify(last)

  const isDifferent = currentJson !== lastJson
  return isDifferent
}

export function getPlayerGameState(
  player: Player,
  world: World
): PlayerGameState {
  const character = world.characters.find(
    (c) => c.characterId == player.characterId
  )!
  return {
    worldTime: world.time,
    playerPoints: player.points,
    character,
  }
}

export function createPlayer(characterId: CharacterId, client: Client): Player {
  const p: Player = {
    playerId: client.clientId,
    characterId,
    client,
    points: 0,
  }
  return p
}
