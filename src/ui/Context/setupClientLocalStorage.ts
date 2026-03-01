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

const SELECTED_SCENARIO_ID_KEY = "selectedScenarioId"

export function getSelectedScenarioId(): string | undefined {
  return localStorage.getItem(SELECTED_SCENARIO_ID_KEY) ?? undefined
}

export function setSelectedScenarioId(id: string) {
  localStorage.setItem(SELECTED_SCENARIO_ID_KEY, id)
}
