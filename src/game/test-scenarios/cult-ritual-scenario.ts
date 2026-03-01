import { addBuildingsToTown } from "../Game/services/game-utils.service"
import { getCharacterArchetype } from "../main-types/archetype"
import { Character } from "../main-types/character"
import { Faction } from "../main-types/faction"
import { Game } from "../main-types/game"
import { Item } from "../main-types/item"
import { Landmark } from "../main-types/landmark"
import { Mechanic } from "../main-types/mechanic"
import {
  PlanBase,
  PlanInfo,
  PlanRequirements,
  Requirement,
} from "../main-types/plan"
import { World } from "../main-types/world"
import {
  Blacksmith,
  Church,
  Library,
  Market,
  Prison,
  Town,
  TownWalls,
} from "./city"
import { Tile } from "./tile"

class DeathPulse extends PlanBase implements PlanRequirements {
  name = "death pulse"

  channelInterval: NodeJS.Timeout | undefined = undefined
  totalChannelTime = 10

  channelRequirements: Requirement[] = [
    {
      name: "channeller must be alive",
      test: () => !this.thisCharacter.dead,
    },
  ]

  info1: PlanInfo = {
    name: "time to take effect",
    description: `will take ${this.totalChannelTime} seconds to take effect after activating`,
  }

  info2: PlanInfo = {
    name: "time until effect",
    description: `activated, will take effect in ${
      this.totalChannelTime - this.channelProgress
    }`,
  }

  info = [this.info1]

  channel() {
    console.log(this.name, " chanel")
    super.channel()
  }

  protected effectOnExecute() {
    console.log("death pulse effect")
    this.world.characters.forEach((c) => {
      if (c.name != this.thisCharacter.name) {
        c.dead = true
      }
    })
  }
  getState() {
    const { name } = this
    return {
      ...super.getBaseState(),
      name,
    }
  }
}

class DeathPulseMechanic extends Mechanic {
  constructor(game: Game) {
    super(game, "Death Pulse", true, 400)
  }

  info = [
    `every 1000 years, the planets align to create a pulse every time the moon lignes up at midnight. there is only 1 night with a perfect alignment. however, on the 10 days leading up the and leading away from the alignment, there is still a pulse. the main night the pulse is so intense that is creates all the people in a long radius have excruciatingly painful peircing feeling all throughtout their body. it only lasts for about 10 seconds and then they go back to normal, the further days away from the main day, the less intense and far reachig the pain is. there are historical records a long time ago that shows that if a certain ritual is performed on the main night then it will send out a death pulse that will kill everyone the wave passes through. the wave will not effect anyone who has an energised stone as a medalion to protect them. if the ritual is performed at midnight the pulse will cause everyone to die, however if the ritual is cast and its not midnight the ritual will not work. in the past, 3 runed monoliths were built to protect the city from effects of the pulze that comes every 1000 years, the only way the runed monoliths dont block the pulse is if theyre charged with more light energy than dark. the monolith runes passivly block the event, however, the monolith runes can be charged with light or dark energy, if there are more dark energy monoliths than light, then pulse will not be blocked. 
    `,
  ]

  activeIf = ["within 10 day of the main day"]

  executeIf = ["time equals midnight"]

  effect() {
    const range = 10
    const location = { x: 1, y: 1 }
    const charactersInRange: Character[] = this.game.world.characters.filter(
      (character) => characterWithinRangeOfLocation(character, range, location)
    )

    charactersInRange.forEach((c) => {
      c.dead = true
    })
  }
}

export const createCultRitualScenario = (game: Game): World => {
  const darkCrystalItem1: Item = {
    name: "dark crystal 1",
    type: "artefact",
  }

  const darkCrystalItem2: Item = {
    name: "dark crystal 2",
    type: "artefact",
  }

  const lightCrystalItem: Item = {
    name: "light crystal",
    type: "artefact",
  }
  const blackCrystalTile = new Tile(1, 1)

  const deathPulseMechanic = new DeathPulseMechanic(game)

  const farmTile = new Tile(-3, -3)
  const mainTownTile = new Tile(0, 0)
  const obelisk1Tile = new Tile(1, 6)
  const obelisk2Tile = new Tile(-3, 0)
  const obelisk3Tile = new Tile(3, -4)
  const pulseCenterTile = new Tile(0, 3)

  const obelisk1Mechanic = new Mechanic(game, "Obelisk 1 Mechanic", false)
  const obelisk2Mechanic = new Mechanic(game, "Obelisk 2 Mechanic", true)
  const obelisk3Mechanic = new Mechanic(game, "Obelisk 3 Mechanic", true)

  const farmLandmark = new Landmark("farm", "Harry's farm", farmTile)
  const obelisk1 = new Landmark(
    "obelisk",
    "Obelisk 1",
    obelisk1Tile,
    obelisk1Mechanic
  )
  const obelisk2 = new Landmark(
    "obelisk",
    "Obelisk 2",
    obelisk2Tile,
    obelisk2Mechanic
  )
  const obelisk3 = new Landmark(
    "obelisk",
    "Obelisk 3",
    obelisk3Tile,
    obelisk3Mechanic
  )

  const mainTownKoraton = new Town("town", "Koraton", mainTownTile)

  addLandmarkToTile(farmLandmark, farmTile)
  addLandmarkToTile(mainTownKoraton, mainTownTile)

  addLandmarkToTile(obelisk1, obelisk1Tile)
  addLandmarkToTile(obelisk2, obelisk2Tile)
  addLandmarkToTile(obelisk3, obelisk3Tile)

  const heroHarry = new Character({
    name: "Harry",
    archetype: getCharacterArchetype("Hero"),
    tile: farmTile,
    experiences: [
      { description: "felt a pain throughout body", time: 0, tile: farmTile },
    ],
  })

  const bestFriendSteven = new Character({
    name: "Steven",
    archetype: getCharacterArchetype("Jester"),
    tile: mainTownTile,
    items: [lightCrystalItem],
  })

  const blackSmithBruno = new Character({
    name: "blackSmithBruno",
    archetype: getCharacterArchetype("Creator"),
    tile: mainTownTile,
    experiences: [
      { description: "felt a pain throughout body", time: 0, tile: farmTile },
    ],
  })

  const cultLeaderVictor = new Character({
    name: "Victor",
    archetype: getCharacterArchetype("Outlaw"),
    tile: obelisk1Tile,
    items: [darkCrystalItem2],
  })

  const wiseScholarAlfred = new Character({
    name: "Alfred",
    archetype: getCharacterArchetype("Sage"),
    tile: mainTownTile,
    experiences: [
      { description: "felt a pain throughout body", time: 0, tile: farmTile },
    ],
  })

  const townGuardStefan = new Character({
    name: "Stefan",
    archetype: getCharacterArchetype("Regular Person"),
    tile: mainTownTile,
    experiences: [
      {
        description: "felt a pain throughout body",
        time: 0,
        tile: mainTownTile,
      },
    ],
  })

  const sisterJacinta = new Character({
    name: "Jacinta",
    archetype: getCharacterArchetype("Innocent"),
    tile: mainTownTile,
    information: [
      {
        believed: true,
        sourceCharacter: { name: wiseScholarAlfred.name, gameStepLastSeen: 10 },
        partialWorldView: {},
        detials:
          "many poeple in town are reporting that they felt a pain all throughout their body at midnight and then it went away",
      },
    ],
    experiences: [
      { description: "felt a pain throughout body", time: 0, tile: farmTile },
    ],
  })
  const townMayorGarret = new Character({
    name: "Garret",
    archetype: getCharacterArchetype("Ruler"),
    tile: mainTownTile,
  })

  const koratonianFaction = new Faction(
    "Koratonians",
    townMayorGarret,
    5000,
    [
      townMayorGarret,
      heroHarry,
      bestFriendSteven,
      blackSmithBruno,
      cultLeaderVictor,
      wiseScholarAlfred,
      sisterJacinta,
    ],
    [mainTownKoraton]
  )

  setFactionControlsLandmark(koratonianFaction, mainTownKoraton)

  addBuildingsToTown(mainTownKoraton, [
    new Blacksmith(mainTownKoraton),
    new Market(mainTownKoraton),
    new Church(mainTownKoraton),
    new Library(mainTownKoraton),
    new Prison(mainTownKoraton),
    new TownWalls(mainTownKoraton),
  ])

  const characters = [
    townMayorGarret,
    heroHarry,
    bestFriendSteven,
    blackSmithBruno,
    cultLeaderVictor,
    wiseScholarAlfred,
    sisterJacinta,
  ]

  const tiles = [
    blackCrystalTile,
    farmTile,
    mainTownTile,
    obelisk1Tile,
    obelisk2Tile,
    obelisk3Tile,
    pulseCenterTile,
  ]
  const items = [darkCrystalItem1, darkCrystalItem1, lightCrystalItem]

  const mechanics = [obelisk1Mechanic, obelisk2Mechanic, obelisk3Mechanic]

  const gameEndingMechanic = deathPulseMechanic

  const world = new World(
    gameEndingMechanic,
    mechanics,
    characters,
    tiles,
    items
  )

  return { world }
}
function characterWithinRangeOfLocation(
  character: Character,
  range: number,
  location: { x: number; y: number }
): unknown {
  throw new Error("Function not implemented.")
}

function addLandmarkToTile(farmLandmark: Landmark, farmTile: Tile) {
  throw new Error("Function not implemented.")
}

function setFactionControlsLandmark(
  koratonianFaction: Faction,
  mainTownKoraton: Town
) {
  throw new Error("Function not implemented.")
}
