import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { configureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
