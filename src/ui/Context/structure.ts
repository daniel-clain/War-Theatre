import { Socket } from "socket.io"

const evilPlan1 = {}

const evilPlan2 = {}

/* 

most basic game
- 1 player is evi, you have to figure out who they are and fight them stop their plan and win.
- 
*/

type PlanRequirement = {
  description: string
  fulfilled: boolean
  planToFulfill: Plan
}

class Plan {
  targetLocation?: Location
  targetCharacter?: Location
  constructor(public name: string, public planningCharacter?: Character) {}
  requirements: PlanRequirement[] = []
  addRequirement(requirements: PlanRequirement) {
    this.requirements.push(requirements)
  }

  doWork() {}
  requirementsAreMet() {
    return this.requirements.every((r) => r.fulfilled)
  }
  onComplete() {}
  effectsOnExecute: (() => void)[] = []

  execute() {
    this.effectsOnExecute.forEach((effect) => effect())
  }
}

type PlanCreator = (character: Character) => Plan

class Location {
  constructor(public x: number, public y: number, public items: Item[] = []) {}
}

type City = {
  location: Location
}

const plans: Plan[] = []

class Item {
  constructor(public name: string, public quantity: number = 1) {}
}

class Player {
  character?: Character
  constructor(public socket: Socket) {}
  sendUpdatedState() {}
}

class Character {
  constructor(public name: string, public location: Location) {}
  activePlan?: Plan = undefined
  honour = 0
  hunger = 5
  dead = false
  player?: Player
  playerPlans: Plan[] = []
  fallbackPlans: Plan[] = []
  autoPlans: Plan[] = []
  hasStateUpdate: boolean = true
  items: Item[] = []

  addFallBackPlan(func: (character: Character) => Plan) {
    this.autoPlans.push(func(this))
  }

  workOnPlans() {
    if (!this.activePlan) {
      this.activePlan = this.getFallbackPlan()
    }
  }

  getFallbackPlan(): Plan {
    return this.fallbackPlans.find((p) => p.requirementsAreMet())!
  }
}

class Game {
  characters: Character[] = []
  evilPlan?: Plan
  time: number = 0

  constructor() {}

  loopThroughTime() {
    if (!this.evilPlan?.planningCharacter) this.chanceToAssignEvilPlan()

    this.characters.forEach((character) => {
      if (!character.activePlan) {
        character.activePlan = character.fallbackPlans[0]
      }
      console.log(
        `${character.name} is working on ${character.activePlan.name}`
      )

      if (character.hasStateUpdate) {
        character.player?.sendUpdatedState()
      }
    })
  }

  chanceToAssignEvilPlan() {
    this.giveEvilPlanToMostEvilCharacter()
  }

  giveEvilPlanToMostEvilCharacter() {
    if (this.evilPlan) {
      const mostEvilCharacter = characters.reduce((x, z) => {
        return z.honour < x.honour ? z : x
      })
      console.log(`giving evil plan to ${mostEvilCharacter.name}`)
      mostEvilCharacter.activePlan = this.evilPlan
      mostEvilCharacter.playerPlans.push(this.evilPlan)
      this.evilPlan.planningCharacter = mostEvilCharacter
    }
  }

  addCharacter(character: Partial<Character>) {
    this.characters.push(character as Character)
  }
}
/* 

class GoToFlowers extends Plan{
  targetLocation?: Location | undefined;
  constructor() {
    super('go to flowers')
  }

  requirements: PlanRequirement[] = [{
    description: "",
    fulfilled: isSameLocation(goToNearbyLocationWithFlowers.targetLocation, ),
    planToFulfill: undefined
  }]


}

const createDeathRitual = (game: Game) => {

  
  const moveToLocation = new Plan("Move to location")

  const goToNearbyLocationWithFlowers = new Plan("Go to location thats not no flowers")
  goToNearbyLocationWithFlowers.requirements.push({fulfilled: , planToFulfill: moveToLocation})

  function isSameLocation(a: Location, b: Location) {
    return a.x == b.x && a.y == b.y
  }

  moveToLocation.requirements.push()
  
  const collectFlowers = new Plan("look for death lotus flowers")

  collectFlowers.addRequirement({
    description: 'must be in a location with death lotus flowers', fulfilled: !!collectFlowers.character?.location.items.some(({ name }) => name == 'death lotus flowers'),
    planToFulfill:
      goToNearbyLocationWithFlowers
  }), 
  collectFlowers.effectsOnExecute = [
    () => {
      const {character } = collectFlowers
      if (character)
        character.location.items = character.location.items.filter(
          (item) => {
            if (item.name == "death lotus flowers") {
              const existing = character.items.find(
                ({ name }) => name == Item.name
              )
              if (existing) {
                existing.quantity += item.quantity
              } else {
                character.items.push(item)
              }
              return false
            } else return true
          }
        )
    },
  ]

  const deathRitual = new Plan("Death Ritual")

  deathRitual.doWork = () => {
    deathRitual.requirements.find(r => !r.fulfilled)?.planToFulfill.doWork()
  }

  deathRitual.requirements.push({
    description: "must have 10 death lotus flowers",
    fulfilled:
      deathRitual.character?.items.find((i) => i.name == "death lotus flower")
        ?.quantity == 10,
    planToFulfill: collectFlowers,
  })

  return deathRitual
}


const theGame = new Game(createDeathRitual) */

//gpt data for plan

type CreateFallBackPlan = { name: string }

const createEatFoodPlan = (character: Character) => {
  const p: Plan = new Plan("eat when hungry", character)

  return p
}

const location = new Location(0, 0)

const joe = new Character("joe", location)

const fred = new Character("fred", location)

const greg = new Character("greg", location)

joe.addFallBackPlan(createEatFoodPlan)

const testCharacters = [joe, fred, greg]
//testCharacters.forEach(theGame.addCharacter)

class OpenAiGen {
  gameGenPrompt(prompt: string) {
    const response = {} as {
      characters: Character[]
      evilPlan: Plan
    }
    return response
  }
}
const openAiGen = new OpenAiGen()

const aiGenScenario = openAiGen.gameGenPrompt(`
  generate a game scenario that 
  * need these requirements:
      - world style and theme is like: game of thrones, skyrim, the witcher
      - world description: all players are put in a world, where the most evil player gets and evil plan. the evil plan needs several requirement to be fulfilled before it can activate. 
      - json structure like this:
        scenario = {
          characters: Character[],
          evilPlan: EvilPlan
          locations: Location[]
        }
      - the evil plan should have several requirements needed for the evil character to activate the evil plan

  * types
      type Location = {x: number, y: number, items: Item[]}

      type Character = {
        name: string
        backStory: string
        location: Location
        items: Item[]
        baseTraits: {
          honor: 'good' | 'standard' | 'evil'
        },
        plans: Plan[]
        activePlan: Plan
        information: Information[]
        beliefs: Belief[]
        experiences: []

        currentSituation: {
          focus: string, 
          keyInfo: []
          planOptions: Plan[]
        }
      }

      type Plan = {      
        description: string
        workDone: 0
        workToDo: 0

        effect: string   
        timeToExecute: 5 | 10 | 15
        requirements: Requirement[]        
        successChance: 'certain' | 'very high' | 'high' | 'medium' | 'low' | 'very low' | 'none'
        onSuccess: {
          descritpion: string
          gained: {
            information: [], items: [], money: []
          }
        }
        modifiers: {
          name: string
          increaseTheSuccessChance: +20% | +30% | +40%
        }[]

      }
      type EvilPlan = {
        effect: 'kill all good players'
      } & Plan

      type Requirement = {
        type: 'be in same location as target location',
        targetLocation: {x: number, y: number}
        planToFulfill: moveToLocation(this.targetLocation)
      } & {
        type: 'be in same location as target character'
        targetCharacter: characterId
        planToFulfill: moveToLocation(targetCharacter.location)
      } & {
        type: 'must have item'
        itemName: string
        planToFulfill: Plan
      }


  * existing plans
      moveToLocation: {
        effect: 'move 1 location towards target location'
      }
      stealItemOffCharacter: {
        targetItem: itemId
        targetCharacter: characterId
        effect: 'remove targetItem from targetCharacter items and add it to yours'
      }
      getItem: {
        targetItem: itemId
        effect: 'thisCharacter gets targetItem from thisCharacter.location.items
      }

    * evil plan should have
      if evil character works on evil plan and all requirements are fulfilled, then the plan will activate and it will wait for its timeToExecute, and then it will do its effect. the evil plan effect is to 'kill all good players'. 
      - each character needs and inciting incident relative to tracking down and stopping the evil plan. when the game starts, players get some clue to the evil plan
      - the evil plan should have 2 things that it requires to start, 1 thing that can disable it, 1 thing that can empower it, 1 thing that can weaken it. in the end, the only possible result is total victory, if the evil plan suceeds or fails
  
    * players get prompted options as the game state changes, what would this characters options be considering this players backstory, traits, skills, beliefs, values, world view. as a players beliefs change, old plans may recalculate and not be as valued, you may see another option for a better plan. plan creater ui tool is for prompting the game.

    * for each character, generate 4 options
      - options structure:
        options: Plan[]

    * eg evil plan
        scenario = {
          characters: [{name: 'maleficent', baseTraits: {honor: 'evil'}, items: [{name: 'staff of power}]}],
          evilPlan: {

            effect: 'kill all good players'
            requirements: [{name: 'planning character has staff of power'}, {name: 'must be at ritual site'}, {name: 'ritural site must have altar, ritural site must have 10 death lotus', 'ritural site must have sacraficed innocence'} }]
            modifiers: {
              name: 'dark power crystals',
              requirements: [{name: 'increase success chance by 10% for each power crystal that is in the target location'}]
              increaseTheSuccessChance: +20% | +30% | +40%
            }[]
          }

          locations: Location[]
        }

    * generate the current situation for each character and give them 3 options each based on their current situation, their recent experiences, their beliefs, values, info


  
`)

const { characters, evilPlan } = aiGenScenario

export const genGame = new Game()
genGame.evilPlan = evilPlan
characters.forEach(genGame.addCharacter)
genGame.giveEvilPlanToMostEvilCharacter()

export const metaGame = {
  activeGame: genGame,
  players: [{ name: "daniel", points: 0 }],
}

const finalEvent = {
  requirements: ["ritual location", "time window"],
}

const person = {
  options: [{ id: 1 }, { id: 2 }],
}

const decisionChoiceMap = {
  1: [],
}

/* 
  - players time branch goes out with decisions and then is pulled back in
  - types of options: [do maintenance on slow buildup of potential threat]
    ~ 

*/
