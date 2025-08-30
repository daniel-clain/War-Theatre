import { random } from "lodash"
import { Client } from "../../../shared/types/host"
import { Game_C } from "../game"
import { Player_C } from "../player"
import { Character_C } from "../world/character/character"
import { World_C } from "./game.world.service"

export class GameSetup {
  constructor(public game: Game_C) {}

  createWorld() {
    const world = new World_C(this.game)

    return world
  }

  createPlayers(clients: Client[]) {
    const {
      world: { characters },
    } = this.game

    const players: Player_C[] = []
    clients.forEach((c) => {
      const { clientId, name, socket } = c
      if (!socket) throw "there should be a socket"
      const randomCharacter = getRandomCharacter()
      console.log("randomCharacter", randomCharacter.name)
      const player = new Player_C(
        this.game,
        clientId,
        name,
        randomCharacter,
        socket
      )
      randomCharacter.player = player

      players.push(player)
    })

    return players

    function getRandomCharacter(): Character_C {
      console.log(
        "characters",
        characters.map((c) => c.name)
      )
      const availableCharacters = characters.filter((c) => !c.player)
      console.log(
        "availableCharacters",
        availableCharacters.map((c) => c.name)
      )

      const randomIndex = random(0, availableCharacters.length - 1)
      console.log("randomIndex", randomIndex)
      const randomCharacter = availableCharacters[randomIndex]

      console.log("randomCharacter", randomCharacter.name)
      return randomCharacter
    }
  }
}
