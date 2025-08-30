import "./Host/host"
import { Host } from "./Host/host"
import { exposeFrontendApp, websocketServer } from "./server.implementation"

exposeFrontendApp({
  relativePathToBuild: "../../build",
  port: 4000,
})

new Host(websocketServer)
