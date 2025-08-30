import React from "react"

import TimeDisplay from "./components/TImeDisplay"

export default function PlayerUi() {
  console.log("PlayerUi")
  return (
    <>
      <TimeDisplay />

      <div className="grid grid-cols-3 gap-4"></div>
    </>
  )
}
