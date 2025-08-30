import { useState } from "react"

import "./App.css"
import { LocalProvider } from "./AppContext/local.provider"
import { LocalGame } from "./views/LocalGame"
import { RemoteGame } from "./views/RemoteGame"

export function App_C() {
  const [gameType, setGameType] = useState<"local" | "remote" | undefined>()

  return (
    <div>
      {!gameType && (
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setGameType("local")}>Local Game</button>
          <button onClick={() => setGameType("remote")}>Remote Game</button>
        </div>
      )}

      {gameType == "local" && (
        <LocalProvider>
          <LocalGame />
        </LocalProvider>
      )}
      {gameType == "remote" && (
        <LocalProvider>
          <RemoteGame />
        </LocalProvider>
      )}
    </div>
  )
}
