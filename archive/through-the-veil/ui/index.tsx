import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { gameStore } from "./game-store"
import "./index.css"
import { ThroughTheVeil } from "./ThroughTheVeil"

const root = document.getElementById("root")!
ReactDOM.createRoot(root).render(
  <Provider store={gameStore}>
    <ThroughTheVeil />
  </Provider>
)
