import { Character_T } from '../../../../shared/types/character';

function generateCharacterOptions(character: Character_T, otherCharacters: Character_T[]) {
  const { experiences } = character
  const recentExperiences = getRecentExperiences()
  const prompt = `generate options for this game character based on the character's:
    - recentExperience: ${}
    - money: ${}
  
  `

  function getRecentExperiences() {
    return experiences.sort((a, b) => {
      return a.
    })
  }
}


const scenarioBackground