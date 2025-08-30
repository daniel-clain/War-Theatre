export function getThisClientId(): string {
  let id = localStorage.getItem("playerId")
  if (!id) {
    id = "" + new Date().getTime()
    localStorage.setItem("playerId", id)
  }
  return id
}

export function getThisName(): string | undefined {
  return localStorage.getItem("playerName") ?? undefined
}
