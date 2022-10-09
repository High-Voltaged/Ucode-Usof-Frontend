import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "~/redux";
import { NextUIProvider } from "@nextui-org/react";

import "~/styles/index.css";
import App from "~/containers/app/App.js";
import { AlertProvider } from "~/context/Alert";
import theme from "~/theme";

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <BrowserRouter>
        <Provider store={store}>
          <NextUIProvider theme={theme}>
            <App />
          </NextUIProvider>
        </Provider>
      </BrowserRouter>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
