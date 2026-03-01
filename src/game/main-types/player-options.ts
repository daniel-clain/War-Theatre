import { values } from "lodash"
import { objToArray, sameCoords } from "../Game/services/utility.service"
import { KnownCharacter } from "./character"
import { Game } from "./game"
import { Plan } from "./plan"
import { Player } from "./player"
import { Coords } from "./tile"

/* 
  - player options and character options are different. character options are about progressing the game play
  - player options are more debugging options like, switching character


*/

export function getPlayerOptions(game: Game, player: Player) {
  const setActiveCharacter = new SetActiveCharacter(game, player)
  const choosePlan = new ChoosePlan(game, player)
  const activatePlan = new ActivatePlan(game, player)
  const setPlanTargetCharacter = new SetPlanTargetCharacter(game, player)
  const setPlanTargetTile = new SetPlanTargetTile(game, player)
  const jumpToClimax = new JumpToClimax(game, player)

  const options: PlayerOptions = {
    choosePlan,
    setActiveCharacter,
    activatePlan,
    setPlanTargetCharacter,
    setPlanTargetTile,
    jumpToClimax,
  }

  const x = objToArray(options)
  return options
}

interface PlayerOption_I {
  name: string
  run: (any: any) => void
}

export class ChoosePlan implements PlayerOption_I {
  name: string = "Choose Plan"
  constructor(private game: Game, private player: Player) {}
  run(planName: string) {
    const c = this.player.character
    if (c) {
      const plan = c.plans.find((p) => p.name == planName)!
      console.log(plan.name, " chosen")
      const o: Plan | undefined = c.plans.find((o) => o.name == plan.name)
      if (o) {
        c.activePlan = o
        console.log("c.activePlan", c.activePlan)
      }
    }
    this.game.gameStateUpdated.next()
  }
}
export class SetActiveCharacter implements PlayerOption_I {
  name: string = "SetActiveCharacter"
  constructor(private game: Game, private player: Player) {}
  run(characterName: string) {
    console.log(characterName)
    this.player.character = this.game.world.characters.find(
      (c) => c.name == characterName
    )!
    console.log(
      " this.player.character =  this.game.world.characters.find((c) => c.name == characterName)!",
      this.player.character
    )
    this.game.gameStateUpdated.next()
  }
}
export class ActivatePlan implements PlayerOption_I {
  name: string = "Activate Plan"
  constructor(private game: Game, private player: Player) {}
  run() {
    const playersCharacter = this.player.character

    if (playersCharacter) {
      const ap = playersCharacter?.activePlan
      if (ap) {
        ap.activate()
      } else {
        console.log("no active plan")
      }
      this.game.gameStateUpdated.next()
    }
  }
}
export class SetPlanTargetCharacter implements PlayerOption_I {
  name: string = "Set Plan Target Character"
  constructor(private game: Game, private player: Player) {}
  run(characterName: string) {
    const playersCharacter = this.player.character
    if (playersCharacter) {
      const knownCharacter: KnownCharacter =
        playersCharacter.worldView.knownCharacters.find(
          (c) => c.name == characterName
        )!
      const ap = playersCharacter.activePlan
      if (ap) {
        ap.targetCharacter = knownCharacter
        this.game.gameStateUpdated.next()
      }
    }
  }
}
export class SetPlanTargetTile implements PlayerOption_I {
  name: string = "Set Plan Target Tile"
  constructor(private game: Game, private player: Player) {}
  run(coords: Coords) {
    const playersCharacter = this.player.character

    if (playersCharacter) {
      const targetTile = this.game.world.tiles.find((t) =>
        sameCoords(t, coords)
      )!

      const ap = playersCharacter.activePlan
      if (ap) {
        ap.targetTile = targetTile
      }
    }
  }
}
export class JumpToClimax implements PlayerOption_I {
  name: string = "Set Plan Target Tile"
  constructor(private game: Game, private player: Player) {}
  run() {
    this.game.controller.fastForwardToEnd()
  }
}

export type PlayerOption =
  | ChoosePlan
  | SetActiveCharacter
  | ActivatePlan
  | SetPlanTargetCharacter
  | SetPlanTargetTile
  | JumpToClimax

export type PlayerOptions = {
  choosePlan: ChoosePlan
  setActiveCharacter: SetActiveCharacter
  activatePlan: ActivatePlan
  setPlanTargetCharacter: SetPlanTargetCharacter
  setPlanTargetTile: SetPlanTargetTile
}

export type PlayerOptionRun<T extends PlayerOption> = {
  [optionName in keyof T]: Parameters<T["run"]>
}

/* 
  player can do quick options like run, hide, fight, spy, 

  the prompt assess you situation and your existing plans, and talks about what optiosn you have, refering to existing plans, and or new suggested plans. the ai will also update existing plans for validity and auto remove ones that are invalid. when you prompt it, i gives you 1 to 5 options, and whichever you pick becomes your new active plan


  actions take energy and time, you must recover them with food water inaction, sleep, also relatie to (wound, sickness) 

  the game has a core part that arrives at climax, in that core part, there may be main stories for players that are better than others, so at the 50% mark, the game chooses one of the main story lines to be the main story line, and for each on the cancled ones, their story some how directs them to the decided main story line, and their options help them be sure that issue is settled as it introduces them into the main one, the efforts that they have made will still count in the final climax, the hero will have a plan, but the evil enemy will be too strong and will put up too many obstacles, so the hero needs to enlist allies to peel off enemy plans for him that he can confront the evil enemy with as much support from his allies as possible. if a player had their main storyline end, knowledge and mechanics learned and the items and power theyve gained are still tied into shutting down the enemy in the climax.
*/

/* 
  - ask people info about mechanics, characters, landmarks, what their plans are, 
  - promp for options, 
  - gain characters trust
  - ask character for info
  - warn character
  - pay character to 
    ~ deliver info
    ~ be double agent


  - option builder
    ~ go to location, get item, investiate (character, landmark, mechanic, location, faction), activate landmark, cast spell, 
    ~ to character
      - ask for info, give info, spy on, kill, protect, investigate, torture, imprison, enslave, capture, befriend, entertain
    ~ to item
      - equip/unequip, add to / remove from inventroy, destroy, create, activate, investigate, steal, 



*/
;`
  the game already has base mechanics
    - travel to location

  give me 1 to 5 options based on the characters properties, attribues and state
  - backstory: ${backstory}
  - previous experiences: ${previousExperiences}
  - beliefs: ${beliefs}
  - information: ${information}
  - values: ${values}
  - goal: ${goal}
  - plans: ${plans}
  - active plan ${plan}
  - known characters: ${knownCharacters}
  - known locations: ${knownLocations}
  - known mechanics: ${knownMechanics}
`
