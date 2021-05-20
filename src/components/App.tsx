import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import LoginPage from "./login/LoginPage";
import MainPage from "./main/MainPage";
import SignupPage from "./signup/SignupPage";
import { ToastContainer } from "react-toastify";
import CreatePersonPage from "./person/CreatePersonPage";
import { CREATE_PERSON_PAGE_SUFFIX, LOGIN_PAGE_SUFFIX, SIGNUP_PAGE_SUFFIX } from "../routes";
import ProtectedRoute from "./common/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={SIGNUP_PAGE_SUFFIX} component={SignupPage} />
        <Route exact path={LOGIN_PAGE_SUFFIX} component={LoginPage} />

        <ProtectedRoute path={CREATE_PERSON_PAGE_SUFFIX}>
          <Route exact path={CREATE_PERSON_PAGE_SUFFIX} component={CreatePersonPage} />
        </ProtectedRoute>
        <ProtectedRoute path='/'>
          <MainPage />
        </ProtectedRoute>
      </Switch>
      {/*{isAuthenticated ? (*/}
      {/*  <Switch>*/}
      {/*    <Route path={CREATE_PERSON_PAGE} component={CreatePersonPage} />*/}
      {/*    /!*<Route path="/main" component={MainPage} />*!/*/}
      {/*  </Switch>*/}
      {/*) : (*/}
      {/*  <Switch>*/}
      {/*    <Route exact path="/signup" component={SignupPage} />*/}
      {/*    <Route component={LoginPage} />*/}
      {/*  </Switch>*/}
      {/*)}*/}
      <ToastContainer />
    </div>
  );
}

export default App;
