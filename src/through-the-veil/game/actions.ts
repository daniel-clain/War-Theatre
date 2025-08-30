import { Character, WorldState } from "./types"

/**
 * Apply the takeYouthPills action for a given character.
 * Decreases the character's age by 10 (but not below 0).
 */
export function takeYouthPills({
  worldState,
  characterId,
}: {
  worldState: WorldState
  characterId: string
}): WorldState {
  const targetCharacter = worldState.characters.find(
    (char) => char.id === characterId
  )
  if (!targetCharacter) {
    return worldState
  }
  const updatedCharacter: Character = {
    ...targetCharacter,
    age: Math.max(0, targetCharacter.age - 10),
  }

  const newCharacters = worldState.characters.map((char) => {
    if (char.id === characterId) {
      const age = char.age

      return updatedCharacter
    }
    return char
  })

  return {
    ...worldState,
    characters: newCharacters,
    log: [
      ...worldState.log,
      `character ${updatedCharacter.name} updated ${updatedCharacter}.`,
    ],
  }
}
export const actions = { takeYouthPills }

export type Actions = typeof actions
export type ActionName = keyof Actions
export type GetActionArgsType<A extends ActionName> = Omit<
  Parameters<Actions[A]>[0],
  "uIGameState"
>
