import { configureStore, createSlice } from "@reduxjs/toolkit"
import { WorldState } from "../game/types"
import { dataStorageService } from "./developer-ui/services/data-storage-service"
import { saveData, updateOrAddById } from "./developer-ui/services/helper-funcs"
import {
  CompositionModule,
  EntityType,
} from "./game-ui/components/player-ui/components/entity"

export type UIGameState = {
  world: WorldState
  entityTypes: EntityType[]
}

type BehaviorModule = {}
export type View = "main" | "game"

export type GameStore = {
  activeView: View
  activeWorld: WorldState
  existingWorld: WorldState | null
  entityTypes: EntityType[]
  compositionModules: CompositionModule[]
}

const emptyWorldState: WorldState = {
  time: 0,
  characters: [],
  townBuildings: [],
  log: [],
}

const activeViewSlice = createSlice({
  name: "active view",
  initialState: "main" as View,
  reducers: {
    setActiveView(_, action: { payload: View }) {
      console.log("set active view", action.payload)
      return action.payload
    },
  },
})
const activeWorldStateSlice = createSlice({
  name: "active world state",
  initialState: emptyWorldState,
  reducers: {
    setActiveWorldState(_, { payload }: { payload: WorldState }) {
      console.log("update world state", payload)

      dataStorageService.postWorldState(payload)
      return payload
    },
  },
})
const existingWorldStateSlice = createSlice({
  name: "existing world state",
  initialState: null as WorldState | null,
  reducers: {
    setExistingWorld(_, action: { payload: WorldState }) {
      console.log("update world state", action.payload)
      return action.payload
    },
  },
})
const entityTypesSlice = createSlice({
  name: "entity types",
  initialState: [] as EntityType[],
  reducers: {
    setEntityTypes(_, action: { payload: EntityType[] }) {
      console.log("set entity types", action.payload)
      return action.payload
    },
    saveEntityType(state, { payload }: { payload: EntityType }) {
      console.log("saveEntityType", payload)
      const { deleteEntityType, postEntityType } = dataStorageService
      saveData(state, payload, postEntityType, deleteEntityType)
      return updateOrAddById(state, payload)
    },
  },
})
const compositionModuleSlice = createSlice({
  name: "composition module",
  initialState: [] as CompositionModule[],
  reducers: {
    setCompositionModules(_, action: { payload: CompositionModule[] }) {
      console.log("update behaviorModules state", action.payload)
      return action.payload
    },
    saveCompositionModule(state, { payload }: { payload: CompositionModule }) {
      console.log("save composition module", payload)
      const { deleteCompositionModule, postCompositionModule } =
        dataStorageService

      saveData(state, payload, postCompositionModule, deleteCompositionModule)
      return updateOrAddById(state, payload)
    },
  },
})

export const gameStore = configureStore<GameStore>({
  reducer: {
    activeView: activeViewSlice.reducer,
    existingWorld: existingWorldStateSlice.reducer,
    activeWorld: activeWorldStateSlice.reducer,
    entityTypes: entityTypesSlice.reducer,
    compositionModules: compositionModuleSlice.reducer,
  },
})

export const { setActiveView } = activeViewSlice.actions
export const { setActiveWorldState } = activeWorldStateSlice.actions
export const { setExistingWorld } = existingWorldStateSlice.actions
export const { setEntityTypes, saveEntityType } = entityTypesSlice.actions
export const { saveCompositionModule, setCompositionModules } =
  compositionModuleSlice.actions
