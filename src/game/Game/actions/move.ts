import { Coords } from "../../../shared/types/position"
import { Game_C } from "../game"
import { Character_C } from "../world/character/character"
import { Location_C } from "../world/location"
import { Action_C, Requirement } from "./actions"

export class MoveAction extends Action_C {
  destination: Coords | undefined
  requirements: Requirement[] = [
    {
      name: "target location must be set",
      test: () => !!this.destination,
    },
  ]

  private getNextLocation(): Location_C | undefined {
    if (!this.destination) return
    const current = { ...this.mover.location.getState() }

    console.log("current", current)
    console.log("this.destination", this.destination)
    const next: Coords = { x: current.x, y: current.y }

    if (current.x < this.destination.x) next.x++
    else if (current.x > this.destination.x) next.x--

    if (current.y < this.destination.y) next.y++
    else if (current.y > this.destination.y) next.y--

    console.log("next", next)
    const nextLocation = this.game.world.getLocationByCoords(next)

    return nextLocation
  }

  workOnAction() {
    if (!this.destination) return
    const { location } = this.character
    const notAtLocation = !location.isAtCoords(this.destination)
    if (notAtLocation) {
      const nextLocation = this.getNextLocation()
      console.log("nextLocation", nextLocation?.getState())
      if (nextLocation) {
        this.workToComplete++
        this.moveToLocation(nextLocation)
      } else {
        console.log("should have found next location")
      }
    }
    super.workOnAction()
  }

  moveToLocation(location: Location_C) {
    const { mover } = this
    console.log(mover.name, " moving to ", location.getState())
    location.characterMoveIn(mover)
  }

  constructor(public mover: Character_C, public game: Game_C) {
    super({
      name: "move to location",
      character: mover,
      effectOnExecute: () => {
        if (!this.destination) return
        console.log("execute move to ", this.destination)
      },
    })
  }
  getState() {
    return {
      ...super.getState(),
      targetLocation: this.destination,
    }
  }
}
