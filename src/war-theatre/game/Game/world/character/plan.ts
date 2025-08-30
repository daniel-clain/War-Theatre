import { Plan_T } from "../../../../shared/types/unorganised-types"
import { Action_C } from "../../actions/actions"

export class Plan_C {
  id?: string
  description?: string
  trigger?: string
  conditions?: string
  priority?: number
  getState(): Plan_T {
    const plan: Plan_T = {
      name: this.name,
      mainAction: this.mainAction,
    }
    return plan
  }
  get name(): string {
    return this.mainAction.name
  }
  workOnPlan() {
    this.mainAction.workOnAction()
  }
  constructor(public mainAction: Action_C) {}
}
