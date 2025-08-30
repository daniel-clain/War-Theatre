import ReactDOM from "react-dom/client"
import { App_C } from "./frontend/App"
import { Provider } from "./frontend/AppContext/GlobalProvider"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider>
    <App_C />
  </Provider>
)
