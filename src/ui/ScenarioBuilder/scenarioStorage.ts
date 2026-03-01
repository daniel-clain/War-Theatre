export type ScenarioDraft = {
  id: string
  name: string
  prompt: string
}

const SCENARIO_STORAGE_KEY = "scenarioDrafts"

export function loadScenarios(): ScenarioDraft[] {
  try {
    const raw = localStorage.getItem(SCENARIO_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ScenarioDraft[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveScenarios(scenarios: ScenarioDraft[]) {
  localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(scenarios))
}

export function createBlankScenario(): ScenarioDraft {
  return { id: "" + Date.now(), name: "", prompt: "" }
}
