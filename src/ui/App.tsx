import { useContext } from "react";
import "./App.css";
import { Host_C } from "./Host/Host";
import { ScenarioBuilder } from "./views/ScenarioBuilder/ScenarioBuilder";

import { AppContext } from "./Context/AppProvider";
import { Game_C } from "./views/Game/Game";

export function App_C() {
  const { activeView, playerInGame, setActiveView } = useContext(AppContext);
  return (
    <div>
      {playerInGame ? (
        <Game_C />
      ) : (
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setActiveView("builder")}>
            Scenario Builder
          </button>
          {activeView === "builder" && <ScenarioBuilder />}
          <Host_C />
        </div>
      )}
    </div>
  );
}
