/* 
  - at miday, the pulse will go off, and depending on how the runestones are activated, tehre will be a different effect
  - recursive plan to send scout to each runestone to verify that stone is good value
  
*/

const guy1 = {name: 'fred'}
const guy2 = {}

const combos = [
  {
    arrangement: "if all 3 dark purple",
    minorEffect: "whole body contorting pain",
    majorEffect: "large pain until dead",
  },
  {
    arrangement: "if all 3 yellow gold",
    minorEffect: "cleanse curse and banish minor demons, clear brainwashing",
    majorEffect:
      "destroy all demons, destroy curse source, bless all good an holy sheild",
  },
]


const runeStonePlan = {
  trigger: 'status of [runestone x] hasnt been checked in 6 hours',
  effect: 'get updated info on the state of the runestone',

  work: [
    {
      action: 'get state of the runestone',
      requirements: '$this.location == [runestone x].location',
      totalWorkRequired: 1, 
    }]
}


function inspectLandmark()


const runeStoneOne = {
  activatedColor: 'dark purple'
}


const characterMessenger = {
  archtype: 'explorer',
  traits: 'contientious, agreeable, clear minded',
  values: 'compassion, integrity, courage, reciprocity, loyalty, duty',
  beliefs: ['my fation saved me, i owe them so much, i have sworn my commitment, i must fulfil my role as best i can']
  experiences: [
    {what: 'character $guy1 has come to ask me to complete the plan $getRuneStoneStateUpdate'}
  ]
}
