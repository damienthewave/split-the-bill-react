import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { AppState } from "../redux/appState";
import "./App.css";
import LoginPage from "./login/LoginPage";
import MainPage from "./main/MainPage";
import SignupPage from "./signup/SignupPage";

interface AppProps {
  isAuthenticated: boolean;
}

function App({ isAuthenticated }: AppProps) {
  return (
    <div className="App">
      {isAuthenticated ? (
        <Switch>
          <Route component={MainPage} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/signup" component={SignupPage} />
          <Route component={LoginPage} />
        </Switch>
      )}
    </div>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.userToken.token.length !== 0,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
