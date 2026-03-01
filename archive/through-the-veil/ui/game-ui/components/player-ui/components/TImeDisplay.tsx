import React from "react"
import { useSelector } from "react-redux"
import { GameStore } from "../../game-store"

export default function TimeDisplay() {
  const time = useSelector(({ activeWorld }: GameStore) => activeWorld.time)
  return <div className="text-gray-700">🕒 Current Time: {time}</div>
}
