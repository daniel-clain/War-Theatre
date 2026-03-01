import "./App.css";
import { useContext, useState } from "react";
import { Host_C } from "./Host/Host";
import { ScenarioBuilder } from "./views/ScenarioBuilder/ScenarioBuilder";

import { Game_C } from "./views/Game/Game";
import { useAppService } from "./Context/useApp.service";
import { AppContext } from "./Context/AppProvider";

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
