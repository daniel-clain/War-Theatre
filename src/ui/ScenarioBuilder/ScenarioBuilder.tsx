import { useContext } from "react";
import type { Scenario } from "../../shared/types/scenario-variables";
import { AppContext } from "../Context/AppProvider";
import { ScenarioCrud } from "./components/ScenarioCrud";

export function ScenarioBuilder_C() {
  const { activeScenario, setActiveScenario } = useContext(AppContext);
  return (
    <div>
      <ScenarioCrud />
      {activeScenario && (
        <form>
          <label>
            Name:{" "}
            <input
              type="text"
              value={activeScenario?.name}
              onChange={(e) =>
                setActiveScenario({
                  ...activeScenario,
                  name: e.target.value,
                } as Partial<Scenario>)
              }
            />
          </label>
        </form>
      )}
    </div>
  );
}
