import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import LoginPage from "./login/LoginPage";
import MainPage from "./main/MainPage";
import SignupPage from "./signup/SignupPage";
import GroupDetails from "./group/GroupDetails";
import { ToastContainer } from "react-toastify";
import CreatePersonPage from "./person/CreatePersonPage";
import {
  CREATE_PERSON_PAGE_SUFFIX,
  LOGIN_PAGE_SUFFIX,
  SIGNUP_PAGE_SUFFIX,
  GROUPS_PAGE_SUFFIX 
} from "../routes";
import ProtectedRoute from "./common/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinnerContainer from "./common/loading-spinner/LoadingSpinnerContainer";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={SIGNUP_PAGE_SUFFIX} component={SignupPage} />
        <Route exact path={LOGIN_PAGE_SUFFIX} component={LoginPage} />
        <ProtectedRoute path={CREATE_PERSON_PAGE_SUFFIX}>
          <Route
            exact
            path={CREATE_PERSON_PAGE_SUFFIX}
            component={CreatePersonPage}
          />
        </ProtectedRoute>
        <ProtectedRoute path={GROUPS_PAGE_SUFFIX}>
          <Route exact path={GROUPS_PAGE_SUFFIX+"/:id"} component={GroupDetails} />
        </ProtectedRoute>
        <ProtectedRoute path="/">
          <MainPage />
        </ProtectedRoute>
      </Switch>
      <LoadingSpinnerContainer />
      <ToastContainer />
    </div>
  );
}

export default App;
