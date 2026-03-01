import { useState } from "react";
import type { Scenario } from "../../shared/types/scenario-variables";
import { useWebsockets } from "./useWebsocket.service";

export function useScenarioBuilderService(
  websockets: ReturnType<typeof useWebsockets>
) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeScenario, setActiveScenario] = useState<
    Partial<Scenario> | undefined
  >();

  return {
    scenarios,
    activeScenario,
    setActiveScenario,
    deleteScenario,
    saveScenario,
  };
  function deleteScenario(id: string) {
    if (confirm("Are you sure you want to delete this scenario?")) {
      websockets.send({ name: "deleteScenario", args: { id } });
      setScenarios(scenarios.filter((scenario) => scenario.id !== id));
    }
  }

  function saveScenario(scenario: Partial<Scenario> | undefined) {
    if (
      scenario &&
      "id" in scenario &&
      scenario.id &&
      "name" in scenario &&
      scenario.name &&
      "scene" in scenario &&
      scenario.scene
    ) {
      const s = scenario as Scenario;
      websockets.send({ name: "saveScenario", args: { scenario: s } });
    }
  }
}
