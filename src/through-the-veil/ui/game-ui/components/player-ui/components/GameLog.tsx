import React from "react"
import { useSelector } from "react-redux"
import { GameStore } from "../../game-store"

export default function GameLog() {
  const log = useSelector(({ activeWorld }: GameStore) => activeWorld.log)
  return (
    <div className="bg-gray-100 p-3 rounded shadow max-h-48 overflow-y-auto">
      <h2 className="font-semibold mb-2">Recent Events</h2>
      <ul className="text-sm space-y-1">
        {log.map((line, i) => (
          <li key={i}>• {line}</li>
        ))}
      </ul>
    </div>
  )
}
