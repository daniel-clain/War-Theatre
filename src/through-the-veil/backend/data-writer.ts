import bodyParser from "body-parser"
import cors from "cors"
import express, { Express } from "express"
import { setupRoutes } from "./api-endpoints"

console.log("ding")

const expressApp: Express = express()
const PORT = 3030

// Middleware to parse JSON
expressApp.use(bodyParser.json())
expressApp.use(cors())
setupRoutes(expressApp)

// Start server
expressApp.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
