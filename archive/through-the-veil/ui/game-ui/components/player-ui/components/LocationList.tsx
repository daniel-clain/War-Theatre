import React from "react"
import { useSelector } from "react-redux"
import { UIGameState } from "../../app-store"

export default function LocationList() {
  const locations = useSelector(
    ({ world: { locations } }: UIGameState) => locations
  )
  console.log("locations", locations)

  return (
    <div>
      <h2 className="font-semibold mb-1">Locations</h2>
      <ul className="space-y-1 text-sm">
        {locations.map((loc) => (
          <li key={loc.id} className="p-2 bg-white border rounded shadow">
            <strong>{loc.name}</strong>
            <br />
            {loc.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
