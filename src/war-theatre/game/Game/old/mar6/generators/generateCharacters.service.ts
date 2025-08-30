import { random } from "lodash"

// Utility function to generate stats within a range
function generateStat(range: [number, number]) {
  return random(range[0], range[1])
}

// Generate a random character based on archetype
/* function generateCharacter(player: Player_T) {
  const archetype = sample(archetypes)! // Randomly select an archetype

  const goToLocation: Option = {
    name: "go to location",
    description: "",
  }

  const character: Character_T = {
    player,
    information: [],
    beliefs: [],
    faction: null,
    archetype: archetype.name,
    actionPoints: 3,
    actionInProgress: null,
    options: [goToLocation],
    honor: generateStat(archetype.baseTraits.ambition),
    worldView: {},
    activePlan: null,
    position: {
      col: random(gameConfig.columns),
      row: random(gameConfig.rows),
    },
    // Generate traits based on archetype
    traits: {
      ambition: generateStat(archetype.baseTraits.ambition),
      intelligence: generateStat(archetype.baseTraits.intelligence),
      honest: generateStat(archetype.baseTraits.honest),
      beauty: generateStat(archetype.baseTraits.beauty),
      charisma: generateStat(archetype.baseTraits.charisma),
    },
    // Generate skills based on traits and archetype
    skills: {
      fighting: generateStat(archetype.skillWeights.fighting),
      persuasion: generateStat(archetype.skillWeights.persuasion),
      leadership: generateStat(archetype.skillWeights.leadership),
      magic: generateStat(archetype.skillWeights.magic),
    },
    // Generate qualities based on traits and archetype
    attributes: {
      strength: generateStat(archetype.attributesWeights.strength),
      health: generateStat(archetype.attributesWeights.health),
      reputation: generateStat(archetype.attributesWeights.reputation),
      wealth: generateStat(archetype.attributesWeights.wealth),
    },
    // Generate values based on traits and archetype
    values: {
      power: generateStat(archetype.valueWeights.power),
      freedom: generateStat(archetype.valueWeights.freedom),
      justice: generateStat(archetype.valueWeights.justice),
      wealth: generateStat(archetype.valueWeights.wealth),
      loyalty: generateStat(archetype.valueWeights.loyalty),
      knowledge: generateStat(archetype.valueWeights.knowledge),
      honor: generateStat(archetype.valueWeights.honor),
      beauty: generateStat(archetype.valueWeights.beauty),
    },
    plans: [],
  }

  return character
} */

// Main function to generate characters for all players
/* export function generateRandomCharacter(player: Player_T) {
  const character: Character_T = generateCharacter(player)

  return character
}
 */
