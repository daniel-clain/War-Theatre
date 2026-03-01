import React from "react"
import { useSelector } from "react-redux"
import { UIGameState } from "../../app-store"

export default function ClueList() {
  const gameState = useSelector((gameState: UIGameState) => gameState)

  return (
    <div>
      {/* <h2 className="font-semibold mb-1">Clues</h2>
      <ul className="space-y-1 text-sm">
        {clues.map((clue) => (
          <li key={clue.id} className="p-2 bg-white border rounded shadow">
            <strong>{clue.description}</strong>
            <br />
            Found at: {clue.locationId}
            <br />
            {clue.discovered ? "✅ Found" : "❌ Hidden"}
          </li>
        ))}
      </ul> */}
    </div>
  )
}
