import { Character_T } from "../../../shared/types/character"
import { Character_C } from "../world/character/character"

export interface ActionHasRequirements {
  requirements: Requirement[]
}

export type Requirement = {
  name: string
  test: () => boolean
}

type ActionProps = {
  name: string
  character: Character_C
  effectOnExecute: () => void
}

export type Action_T = Pick<
  Action_C,
  "name" | "workDone" | "workToComplete"
> & {
  character: Character_T
}

export class Action_C implements ActionHasRequirements {
  name: string
  character: Character_C
  effectOnExecute: () => void
  workToComplete: number = 1
  workDone: number = 0

  constructor({ name, character, effectOnExecute }: ActionProps) {
    this.name = name
    this.character = character
    this.effectOnExecute = effectOnExecute
  }
  requirements: Requirement[] = []

  getState() {
    const action: Action_T = {
      name: this.name,
      workDone: this.workDone,
      workToComplete: this.workToComplete,
      character: this.character.getState(),
    }
    return action
  }

  get isCompleted() {
    return this.workDone >= this.workToComplete
  }

  private isAbleToDo() {
    const reasonsCantDo = this.requirements.reduce((acc, r) => {
      if (!r.test()) {
        console.log(`failed to meet requirement ${r.name}`)
      }
      return acc
    }, undefined)

    console.log("reasonsCantDo", reasonsCantDo)
    if (!reasonsCantDo) {
      console.log("able to do ", this.name)
      return true
    } else {
    }
  }
  private executeAction() {
    console.log("execute action")
    this.effectOnExecute()
  }

  workOnAction() {
    /* need code for cleaning up plans */
    console.log("working on ", this.name)
    if (this.isAbleToDo()) {
      this.workDone++
      console.log(this.workDone, "/", this.workToComplete)
      if (this.isCompleted) {
        console.log("completed ", this.name)
        this.executeAction()
      }
    } else {
      console.log("cant do ", this.name)
    }
  }
}
