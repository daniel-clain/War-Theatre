import { useContext } from "react"
import { RemoteContext } from "../../AppContext/remote.provider"

export function ConnectedClientsList() {
  const { hostState } = useContext(RemoteContext)
  if (!hostState) return null
  return (
    <div>
      <h3>Connected Clients</h3>
      <ul>
        {hostState?.connectedClients.map((currentClient) => (
          <li key={currentClient.clientId}>{currentClient.name}</li>
        ))}
      </ul>
      <hr />
    </div>
  )
}
