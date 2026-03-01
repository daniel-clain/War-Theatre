import { Character_C } from "../world/character/character"
import { Action_C, ActionHasRequirements, Requirement } from "./actions"

export class KillAction extends Action_C implements ActionHasRequirements {
  target: Character_C | undefined = undefined
  requirements: Requirement[] = [
    {
      name: "killer target must be set",
      test: () => !!this.killer,
    },
    {
      name: "kill target must be set",
      test: () => !!this.target,
    },
    {
      name: "killer is in same location as target",
      test: this.sameLocationTest,
    },
  ]

  constructor(public killer: Character_C) {
    super({
      name: "kill character",
      character: killer,
      effectOnExecute: () => {
        if (this.target) {
          this.target.dead = true
        }
      },
    })
  }

  private sameLocationTest(): boolean {
    return !!this.killer?.location.characters.some(
      (c) => c.name == this.target?.name
    )
  }
  getState() {
    return {
      ...super.getState(),
      target: this.target?.getState(),
    }
  }
}
