type Option = {}
export function getOptions(): Option[] {
  const options: Option[] = [
    {
      description: "",
      plan: {
        effect: {
          chanceToStop,
        },
      },
    },
  ]
  return options
}

/* 

  - the game lets them do 2 things at the same time, play the basic loop and secondary loop at the same time, as the state changes, some is basic rts game, secondsary is diplomatic logic puzzle solving game
  - when players do bad things, then they can be trapped and proven guilty, bad players want to keep it secret, a chain of info can lead to a suspect being trapped. if the suspect knows theyre onto him, they can plan normal for a while and not fall into any traps or give evidence
  - always looking for the best option
  - they wont have down time between big automated plans because they will be doing fallback things
  - the option planner is broken down based on your situation categories
  - eg pray at the rock daily or get a debuf, you will lose 


  - what info is included to generate options
  - extending options
*/

/* 


  - see something suspicious
  - investigate
  - get more information about target


*/
