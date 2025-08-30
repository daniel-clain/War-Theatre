import { random } from "lodash"
import { Subject } from "rxjs"
import { Client } from "../../../shared/types/host"
import { Character, KnownCharacter } from "../../main-types/character"
import { Game } from "../../main-types/game"
import { KnownTile, Tile } from "../../main-types/tile"
import { sameCoords } from "./utility.service"

export class GameController {
  onTimeStep: Subject<number> = new Subject()
  gameTimerInterval?: NodeJS.Timeout

  constructor(public game: Game) {
    this.onTimeStep.subscribe((time) => {
      this.onTimeTick()
    })
  }

  onTimeTick() {
    const { players, world } = this.game
    if (world.time % 5 == 0) {
      this.charactersSeeTheirTile()
      this.progressCharacterPlans()

      players.forEach((player) => {
        if (player.isCurrentStateDifferentFromLastState()) {
          player.sendPlayerGameState()
        }
      })
    }
  }

  progressCharacterPlans() {
    this.game.world.characters.forEach((c) => {
      const p = c.activePlan
      if (p && !p.isComplete) {
        p.activate()
      }
    })
  }

  charactersSeeTheirTile() {
    const { world } = this.game
    const { time, characters } = world
    characters.forEach((seeingCharacter) => {
      const thisTile = seeingCharacter?.tile
      if (!thisTile) return
      const seenCharacters = seeingCharacter.tile?.characters.filter(
        (c) => c.name != seeingCharacter.name
      )

      const knowTile = seeingCharacter.worldView.knownTiles.find(
        (l) => l.x == thisTile.x && l.y == thisTile.y
      )!

      if (seenCharacters?.length) {
        seenCharacters.forEach(handleSeeingCharacter)
      }

      function handleSeeingCharacter(seenCharacter: Character) {
        console.log(seeingCharacter.name, " sees ", seenCharacter.name)
        if (!thisTile) return
        const seenCharacterRef: KnownCharacter = {
          name: seenCharacter.name,
          dead: seenCharacter.dead,
          tile: seeingCharacter.tile?.getState(),
          gameStepLastSeen: time,
        }
        const seenCharacterState = seeingCharacter.getState()

        const knowCharacter = seeingCharacter.worldView.knownCharacters.find(
          (c) => c.name == seenCharacter.name
        )

        if (!knowCharacter) {
          console.log(
            `${seeingCharacter.name} see ${seenCharacter.name} at x:${thisTile.x} y:${thisTile.y}`
          )

          console.log(
            seeingCharacter.name,
            "know before add",
            seeingCharacter.worldView.knownCharacters.map((c) => c.name)
          )

          if (seeingCharacter.player) {
            console.log(
              "last1",
              seeingCharacter.player.lastSentState?.player.character?.worldView
                .knownCharacters
            )
          }
          seeingCharacter.worldView.knownCharacters.push(seenCharacterRef)

          console.log(
            seeingCharacter.name,
            "know after add",
            seeingCharacter.worldView.knownCharacters.map((c) => c.name)
          )

          if (seeingCharacter.player) {
            console.log(
              "last2",
              seeingCharacter.player.lastSentState?.player.character?.worldView
                .knownCharacters
            )
            const diff =
              seeingCharacter.player.isCurrentStateDifferentFromLastState()
            console.log("diff", diff)
          }
          /* console.log(seeingCharacter.name, " known characters: ")
          seeingCharacter.worldView.knownCharacters.forEach((c) =>
            console.log(c.name)
          ) */

          knowTile.characterNames?.push(seenCharacterState.name)
        } else {
          console.log("known ", seenCharacterRef.name, "from tiled")

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
                  )
                  return false
                }
                return true
              }
            )
          })
          console.log(
            seeingCharacter.name,
            "add to ",
            knowTile,
            "if not already here"
          )
          //add known char to current tile
          if (
            !knowTile.characterNames.some((n) => n == seenCharacterRef.name)
          ) {
            knowTile.characterNames.push(seenCharacterRef.name)
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
                )
                return seenCharacterRef
              }
              return c
            })
        }
      }
    })
  }

  workThroughCharactersPlans() {
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

  assignCharactersToPlayers() {
    const {
      players,
      world: { characters },
    } = this.game
    players.forEach((p) => {
      const availableCharacters = characters.filter((c) =>
        players.some((p) => p.character?.name != c.name)
      )
      const randomCharacter =
        availableCharacters[random(0, availableCharacters.length)]
      p.character = randomCharacter
      randomCharacter.player = p
    })
  }

  startTheGame() {
    this.startTimeRunning()

    this.game.players.forEach((player) => {
      console.log("initial update")
      player.sendPlayerGameState()
    })
  }

  startTimeRunning() {
    const { world } = this.game

    this.gameTimerInterval = setInterval(() => {
      world.time++
      if (world.time > 100) {
        console.log("finish")
      } else {
        this.onTimeStep.next(world.time)
      }
    }, 1000)
  }

  get endTime() {
    return this.game.world.gameEndingMechanic
  }

  fastForwardToEnd() {}
  stopGame() {
    console.log("game stopped")
    if (this.gameTimerInterval) clearTimeout(this.gameTimerInterval)
    this.tearDownGame()
  }

  tearDownGame() {
    console.log(`tearing down game`)
    clearInterval(this.gameTimerInterval)
  }

  playerReconnect(client: Client) {
    const player = this.game.players.find(
      (p) => p.client?.clientId == client.clientId
    )!
    if (player.client?.socket) {
      player.client.socket = client.socket
    }

    console.log(player.client?.name, " reconnected")
  }

  makeTileKnownToCharacter(tile: Tile, character: Character) {
    const knownTile = character.worldView.knownTiles.find((t) =>
      sameCoords(t, tile)
    )
    const tileState = tile.getState()
    const newKnownTile: KnownTile = {
      characterNames: tileState.characters.map((c) => c.name),
      x: 2,
      y: 4,
      items: tileState.items,
      timeLastSeen: this.game.world.time,
      biome: tileState.biome,
      landmarks: tileState.landmarks,
    }
    if (!knownTile) {
      character.worldView.knownTiles.push(newKnownTile)
    } else {
      knownTile.timeLastSeen = this.game.world.time
    }
  }
  /* 
    characterMoveIn(character: Character) {
      character.tile?.characterMoveOut(character)

      console.log(character.name, " moving into ", this.getState())

      character.tile = this
      if (!this.characters.find((c) => c.name == character.name)) {
        this.characters.push(character)
      }

      this.makeTileKnownToCharacter(character)
    }

    characterMoveOut(character: Character) {
      console.log(character.name, " moving out of ", this.getState())
      this.characters = this.characters.filter((c) => c.name != character.name)
    }
 */
}
