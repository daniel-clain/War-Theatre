import { Subject } from "rxjs"
import { Character_T } from "../../../shared/types/character"
import { ServerGame } from "../../../shared/types/game"

function startBotGameplay(serverGame: ServerGame, onTimeUpdate: Subject<void>) {
  onTimeUpdate.subscribe(() => {
    serverGame.state.players
      .filter((p) => p.isBot)
      .forEach((p) => {
        const playersCharacter = serverGame.state.world.characters.find(
          (c) => c.player.id == p.id
        )!

        if (!playersCharacter.actionInProgress) {
          decideAction()
        }

        if (c.actionPoints > 1) {
          const characterInTheSameTile = getCharacterInTheSameTile()
          if (characterInTheSameTile) {
          }
        }

        function getCharacterInTheSameTile() {
          const {
            position: { row, col },
          } = c
          return [...serverGame.aiCharacters, ...serverGame.playerCharacters]
            .filter((loopC) => loopC.player.id != c.player.id)
            .find(
              ({ position: theirPos }) =>
                theirPos.col == col && theirPos.row == row
            )
        }
      })
  })

  function decideAction(character: Character_T) {
    character.actionInProgress = {}
  }
}
