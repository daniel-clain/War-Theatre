import { connected } from "process"

function Index(){
  const players: { name, id }[]
  games: {players: [], characters: []}
}
if (connected) {
  if (inGame) {
    return <GameView {...{ playersGame }} />
  } else {
    return <GameLobbyScreen />
  }
} else {
  return <NoConnectionScreen />;
}