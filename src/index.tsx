import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import { configureStore } from "./redux/configureStore";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route component={App} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
