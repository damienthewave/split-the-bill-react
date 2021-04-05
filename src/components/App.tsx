import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { AppState } from "../redux/appState";
import "./App.css";
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";

interface AppProps {
  isAuthenticated: boolean;
}

function App({ isAuthenticated }: AppProps) {
  return (
    <div className="App">
      {isAuthenticated ? (
        <Switch>{/* Components go here */}</Switch>
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
  console.log(state);
  return {
    isAuthenticated: state.userToken.token.length !== 0,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
