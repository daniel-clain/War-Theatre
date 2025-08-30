import { useContext } from "react"
import { RemoteContext } from "../../AppContext/remote.provider"

export function ActiveGamesList_C() {
  const { hostState } = useContext(RemoteContext)
  return (
    <div>
      <h3>Active Games</h3>
      {hostState?.activeGames.map((g) => (
        <div>player: {g.playerIds.length}</div>
      ))}
    </div>
  )
}
