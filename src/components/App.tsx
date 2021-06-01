import React from "react";
import { Route, Switch } from "react-router";
import "./App.css";
import LoginPage from "./login/LoginPage";
import MainPage from "./main/MainPage";
import SignupPage from "./signup/SignupPage";
import { ToastContainer } from "react-toastify";
import CreatePersonPage from "./person/CreatePersonPage";
import {
  ADD_EXPENSE_PAGE_SUFFIX,
  CREATE_PERSON_PAGE_SUFFIX,
  LOGIN_PAGE_SUFFIX,
  SIGNUP_PAGE_SUFFIX,
} from "../routes";
import ProtectedRoute from "./common/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinnerContainer from "./common/loading-spinner/LoadingSpinnerContainer";
import AddExpensePage from "./expense/AddExpensePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={SIGNUP_PAGE_SUFFIX} component={SignupPage} />
        <Route exact path={LOGIN_PAGE_SUFFIX} component={LoginPage} />
        <ProtectedRoute exact path={CREATE_PERSON_PAGE_SUFFIX}>
          <CreatePersonPage />
        </ProtectedRoute>
        <ProtectedRoute exact path={ADD_EXPENSE_PAGE_SUFFIX}>
          <AddExpensePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/">
          <MainPage />
        </ProtectedRoute>
      </Switch>
      <LoadingSpinnerContainer />
      <ToastContainer />
    </div>
  );
}

export default App;
