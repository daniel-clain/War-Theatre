import { useContext } from "react"
import { RemoteContext } from "../../AppContext/remote.provider"

export function GameLobbyList_C() {
  const { hostState, thisClientId, send } = useContext(RemoteContext)
  return (
    <section id="game-lobby-list">
      <h3>Game Lobby List</h3>

      {hostState?.gameLobbies.map((loopGame) => (
        <div className="game-lobby" key={loopGame.gameLobbyId}>
          <div className="game-lobby__creator">
            <label>Creator </label>
            <span>{loopGame.creator.name}</span>
          </div>
          <div className="game-lobby__joined-players">
            {loopGame.playersJoined.map((loopPlayer) => (
              <div className="game-lobby__joined-player">
                {loopPlayer.name}
                {loopPlayer.clientId == thisClientId ? (
                  <button
                    onClick={() =>
                      send({
                        name: "setInForNextGame",
                        args: {
                          isIn: loopPlayer.inForNextGame ?? false,
                        },
                      })
                    }
                  >
                    {loopPlayer.inForNextGame ? `✔️` : `❌`}
                  </button>
                ) : loopPlayer.inForNextGame ? (
                  `✔️`
                ) : (
                  `❌`
                )}
              </div>
            ))}
          </div>
          {loopGame.creator.clientId == thisClientId && (
            <button
              onClick={() => {
                send({ name: "startGame" })
              }}
            >
              Start Game
            </button>
          )}
        </div>
      ))}
    </section>
  )
}
