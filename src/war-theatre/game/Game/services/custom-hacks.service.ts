import { Game_C } from "../game"

export function customHacks(game: Game_C) {
  makeAllLocationsKnown()

  function makeAllLocationsKnown() {
    game.world.locations.forEach((location) => {
      game.world.characters.forEach((character) => {
        location.makeLocationKnownToCharacter(character)
      })
    })
  }
}
