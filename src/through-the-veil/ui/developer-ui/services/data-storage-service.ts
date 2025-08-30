import { WorldState } from "../../../game/types"
import {
  CompositionModule,
  EntityType,
} from "../../game-ui/components/player-ui/components/entity"

const hostAddress = "http://localhost"
const port = 3030

export const dataStorageService = {
  fetchWorldState,
  postWorldState,

  fetchEntityTypes,
  fetchCompositionModules,

  postEntityType,
  postCompositionModule,

  deleteEntityType,
  deleteCompositionModule,
}

/////////////////////

async function fetchWorldState() {
  return await fetch(`${hostAddress}:${port}/get-world-state`).then((res) =>
    handleResponse(res, "world state", "get")
  )
}
function postWorldState(worldState: WorldState) {
  return post("save-world-state", worldState, "save world state")
}

//-----------------------------

async function fetchEntityTypes() {
  return await get("get-entity-types", "entity types")
}
async function fetchCompositionModules() {
  return await get("get-composition-modules", "composition modules")
}
//-----------------------------

function postEntityType(entity: EntityType) {
  return post("save-entity-type", entity, entity.name)
}

function postCompositionModule(modlue: CompositionModule) {
  return post("save-composition-module", modlue, modlue.name)
}
//-----------------------------

function deleteEntityType(entity: EntityType) {
  return deleteFile("delete-entity-type", entity.name, entity.fileName)
}

function deleteCompositionModule(modlue: CompositionModule) {
  return deleteFile("delete-composition-module", modlue.name, modlue.fileName)
}

//////////////////////////

function get(endpoint, name) {
  return fetch(`${hostAddress}:${port}/${endpoint}`).then((res) =>
    res.json().then((x) => test(x))
  )
}

async function test(x) {
  console.log("fart")
  return x
}

function post(endpoint, data, name) {
  return fetch(`${hostAddress}:${port}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => handleResponse(res, name, "post"))
}

function deleteFile(endpoint, name, fileName: string) {
  return fetch(`${hostAddress}:${port}/${endpoint}/${fileName}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => handleResponse(res, name, "delete"))
}

////////////////////////

async function handleResponse(
  res: Response,
  name: string,
  method: "get" | "post" | "delete"
): Promise<any> {
  return res
    .json()
    .then((data) => {
      console.log(`${method} ${name} successful`, data)
    })
    .catch((err) => {
      console.error(`${method} ${name} error`, err)
    })
}
