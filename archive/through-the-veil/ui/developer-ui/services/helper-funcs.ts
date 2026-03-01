import {
  CompositionModule,
  EntityType,
} from "../../game-ui/components/player-ui/components/entity"

export function updateOrAddById<T extends { id: string }>(
  state: T[],
  payload: T
): T[] {
  return state.some((i) => i.id === payload.id)
    ? state.map((i) => (i.id === payload.id ? payload : i))
    : [...state, payload]
}

export function saveData<T extends EntityType | CompositionModule>(
  state: T[],
  payload: T,
  postFunc: (entity: T) => Promise<void>,
  deleteFunc: (entity: T) => Promise<void>
) {
  const found = state.find((i) => i.id == payload.id)
  const fileNameChanged = found && found.fileName != payload.fileName
  if (fileNameChanged) {
    deleteFunc(found).then(() => postFunc(payload))
  } else {
    postFunc(payload)
  }
}
