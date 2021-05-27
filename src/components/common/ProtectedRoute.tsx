import React, { Component, NamedExoticComponent, ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppState } from "../../redux/appState";
import { SignupDto } from "../../api/signup/signupDtos";
import { signup } from "../../redux/signup/signupActions";
import { connect } from "react-redux";
import { LOGIN_PAGE_SUFFIX } from "../../routes";
import MainNavbar from "./MainNavbar";
import { emptyPersonReadDto, PersonReadDto } from "../../api/person/personDtos";

interface ProtectedRouteProps {
  children: ReactNode;
  component: NamedExoticComponent;
  isAuthenticated: boolean;
  person: PersonReadDto;
  [x: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  component,
  isAuthenticated,
  person,
  ...rest
}) => {
  return (
    <div>
      {person !== emptyPersonReadDto ? <MainNavbar person={person} /> : <></>}
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            />
          )
        }
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: state.userToken.token.length !== 0,
    person: state.person,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signup: (signupDto: SignupDto) => dispatch(signup(signupDto)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
