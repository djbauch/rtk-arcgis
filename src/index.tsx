import * as React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap.css";
import App from "./App";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/Root"

import { Provider } from "react-redux";
import { store } from "./app/store";

// MUI's default typography relies only on these. See https://mui.com/material-ui/getting-started/installation/
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
