import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { Client, ClientState } from "../../../shared/types/host";

export function ConnectedClientsList() {
  const { hostState, thisClientId } = useContext(AppContext);
  if (!hostState) return null;
  return (
    <div>
      <h3>Connected Clients</h3>
      <ul>
        {hostState?.connectedClients.map((currentClient: ClientState) => (
          <li key={currentClient.clientId}>{currentClient.name}</li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
