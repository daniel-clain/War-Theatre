import { random } from "lodash"
import { Coords } from "../../main-types/biome"
export function sameCoords<T extends Coords, T2 extends Coords>(
  first: T,
  second: T2
): boolean {
  return first.x == second.x && first.y == second.y
}

sameCoords({ x: 1, y: 2 }, { x: 1, y: 2 })

export function objToArray<T>(obj: Record<string, T>): T[] {
  return Object.entries(obj).map(([key, value]) => {
    return value as T
  })
}

export function loopObject<T extends Record<string, unknown>, R>(
  obj: T,
  fn?: (key: keyof T, value: T[keyof T]) => R
): R[] {
  return Object.entries(obj).map(([key, value]) => {
    if (fn) {
      return fn(key as keyof T, value as T[keyof T])
    } else {
      return value as R
    }
  })
}

export type OptionProbability<T> = {
  option: T
  probability: number
}

export function selectByProbability<T>(
  optionProbabilities: OptionProbability<T>[]
): T {
  const filteredOptionProbabilities = optionProbabilities.filter(
    (x) => x.probability
  )
  const totalProbability = filteredOptionProbabilities.reduce(
    (totalProbability, { probability }) =>
      totalProbability + (probability || 0),
    0
  )
  if (totalProbability < 1) {
    throw "shouldn't be less than 1"
  }
  const randomProbability = random(1, totalProbability, true)
  let probabilityCount = 0

  const randomOption = filteredOptionProbabilities.find(({ probability }) => {
    if (
      randomProbability > probabilityCount &&
      randomProbability <= probabilityCount + probability
    )
      return true
    else probabilityCount += probability
  })!

  if (!randomOption) {
    debugger
  }
  return randomOption.option
}
