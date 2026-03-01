import { Express, RequestHandler } from "express"
import fs from "fs"
import path from "path"

const BASE_PATH = path.resolve(__dirname, "../game-data")

const folders = {
  worldState: path.join(BASE_PATH, "worldState"),
  entityTypes: path.join(BASE_PATH, "entityTypes"),
  compositionModules: path.join(BASE_PATH, "compositionModules"),
}

type FolderKey = keyof typeof folders

function getFolder(key: FolderKey): string {
  return folders[key]
}

export function setupRoutes(expressApp: Express) {
  ensureFoldersExist()

  expressApp.post("/save-world-state", saveWorldStateHandler)
  expressApp.get("/get-world-state", getWorldStateHandler)

  createCrudRoutes({
    routePrefix: "entity-type",
    folderKey: "entityTypes",
  })
  createCrudRoutes({
    routePrefix: "composition-module",
    folderKey: "compositionModules",
  })

  function createCrudRoutes({
    routePrefix,
    folderKey,
  }: {
    routePrefix: string
    folderKey: FolderKey
  }) {
    expressApp.get(`/get-${routePrefix}s`, (req, res) => {
      try {
        res.json(listJsonFiles(folderKey))
      } catch (err) {
        res.status(500).send(String(err))
      }
    })

    expressApp.post(`/save-${routePrefix}`, (req, res) => {
      console.log(`save ${routePrefix}`, req.body)

      try {
        const fileName = req.body.fileName
        const json = req.body
        saveJsonFile(folderKey, fileName, json)
        res.json({ saved: fileName })
      } catch (err) {
        res.status(400).send(String(err))
      }
    })

    expressApp.delete(`/delete-${routePrefix}/:fileName`, (req, res) => {
      try {
        deleteJsonFile(folderKey, req.params.fileName)
        res.json({ deleted: req.params.fileName })
      } catch (err) {
        res.status(404).send(String(err))
      }
    })
  }
}

const saveWorldStateHandler: RequestHandler = (req, res) => {
  const { world } = req.body
  const filePath = path.join(folders.worldState, "world-state.json")
  fs.writeFileSync(filePath, world, "utf8")
  res.json({ success: true })
}

const getWorldStateHandler: RequestHandler = (req, res) => {
  const filePath = path.join(folders.worldState, "world-state.json")
  if (!fs.existsSync(filePath)) return res.status(404).send("Not found")
  const content = fs.readFileSync(filePath, "utf8")
  res.type("text/plain").send(content)
}

//////////////////////////////////////

function ensureFoldersExist() {
  Object.values(folders).forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  })
}

function listJsonFiles(folderKey: FolderKey) {
  const dir = getFolder(folderKey)
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const content = fs.readFileSync(path.join(dir, file), "utf8")
      return JSON.parse(content)
    })
}

function saveJsonFile(folderKey: FolderKey, fileName: string, data: any) {
  if (!fileName.endsWith(".json")) throw new Error("Must be .json file")
  const filePath = path.join(getFolder(folderKey), fileName)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
}

function deleteJsonFile(folderKey: FolderKey, fileName: string) {
  if (!fileName.endsWith(".json")) throw new Error("Must be .json file")
  const filePath = path.join(getFolder(folderKey), fileName)
  if (!fs.existsSync(filePath)) throw new Error("File not found")
  fs.unlinkSync(filePath)
}
