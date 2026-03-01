import ReactDOM from "react-dom/client";
import { App_C } from "./App";
import { AppProvider } from "./Context/AppProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <AppProvider>
    <App_C />
  </AppProvider>,
);
