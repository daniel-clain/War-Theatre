import ReactDOM from "react-dom/client";
import { gameBackendInterface } from "./Context/game-backend-interface.service";
import { GameProvider } from "./Context/GameProvider";
import { Game_C } from "./views/Game/Game";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <GameProvider gameBackendInterface={gameBackendInterface}>
    <Game_C />
  </GameProvider>,
  /* <AppProvider>
    <App_C />
  </AppProvider>, */
);
