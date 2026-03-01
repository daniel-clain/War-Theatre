import { random } from "lodash";
import { CSSProperties, useContext, useState } from "react";
import type { Scenario } from "../../../shared/types/scenario-variables";
import { AppContext } from "../../Context/AppProvider";

export function ScenarioCrud() {
  const {
    scenarios,
    activeScenario,
    setActiveScenario,
    deleteScenario,
    saveScenario,
  } = useContext(AppContext);
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() =>
          setActiveScenario({ id: random(100).toString() } as Partial<Scenario>)
        }
      >
        New Scenario
      </button>
      <div style={selectScenarioContainerStyle}>
        <button onClick={() => setExpanded(true)}>
          Select Scenario {scenarios.length}
        </button>
        {expanded && (
          <div style={scenariosListStyle}>
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                style={
                  activeScenario?.id === scenario.id
                    ? { backgroundColor: "lightgray" }
                    : {}
                }
              >
                <button
                  onClick={() => (
                    setActiveScenario(scenario), setExpanded(false)
                  )}
                >
                  {scenario.name}
                </button>
                <button
                  onClick={() => (
                    deleteScenario(scenario.id), setActiveScenario(undefined)
                  )}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => saveScenario(activeScenario)}>
        Save Scenario
      </button>
    </div>
  );
}
const selectScenarioContainerStyle: CSSProperties = {
  position: "relative",
};
const scenariosListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 20,
  position: "absolute",
  width: "200px",
  maxHeight: "500px",
  overflowY: "auto",
  backgroundColor: "white",
  border: "1px solid black",
  borderRadius: 10,
  zIndex: 1000,
  top: 0,
  left: 0,
  transform: "translateY(-100%)",
};
