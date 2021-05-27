import { Alert, Button, Card, Form, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { LoginDto } from "../../api/login/loginDtos";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import "./LoginPage.css";
import { CREATE_PERSON_PAGE_SUFFIX, SIGNUP_PAGE } from "../../routes";
import ApiCallError from "../../api/apiCallError";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { login } from "../../redux/login/loginActions";
import { RouteComponentProps } from "react-router";
import { Redirect } from "react-router-dom";

interface LoginPageProps {
  userToken: UserTokenDto;
  login: (loginDto: LoginDto) => Promise<void>;
}

interface LoginFormProps {
  username: string;
  password: string;
}

const LoginPage: React.FunctionComponent<
  LoginPageProps & RouteComponentProps
> = ({ userToken, login }) => {
  const [loginError, setLoginError] = useState<string>("");
  const [loginCredentials, setLoginCredentials] = useState<LoginFormProps>({
    username: "",
    password: "",
  });

  if (userToken.token) {
    return <Redirect to={"/"} />;
  }

  const setLoginCredentialsProperty = (property: string, value: string) => {
    setLoginCredentials({
      ...loginCredentials,
      [property]: value,
    });
  };

  const onLoginFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoginError("");

    login(loginCredentials).catch((e: ApiCallError) => {
      setLoginError(e.message);
    });
  };

  const onGoogleLogin = () => {
    alert("Google login!");
  };

  const onFacebookLogin = () => {
    alert("Facebook login!");
  };

  return (
    <div className="login-page">
      <Card className="login-form" bg="light" border="success">
        <Image className="login-page-logo" src="logo.png" />
        <Card.Title>
          <span className="login-page-title">Split The Bill</span>
        </Card.Title>
        <Card.Body>
          <Alert show={loginError !== ""} variant={"danger"}>
            {loginError}
          </Alert>
          <Form onSubmit={onLoginFormSubmit}>
            <Form.Control
              className="login-page-form-input"
              placeholder="Username"
              name="username"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLoginCredentialsProperty("username", e.currentTarget.value)
              }
              value={loginCredentials.username}
            />

            <Form.Control
              value={loginCredentials.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setLoginCredentialsProperty("password", e.currentTarget.value)
              }
              name="password"
              className="login-page-form-input"
              type="password"
              placeholder="Password"
            />

            <Button
              className="login-page-login-button"
              variant="success"
              type="submit"
            >
              Login
            </Button>
          </Form>

          <div className="login-page-social-div">
            <GoogleLoginButton
              align="center"
              className="login-page-social-button"
              onClick={onGoogleLogin}
            >
              <span className="login-page-social-button-label">
                Login using Google
              </span>
            </GoogleLoginButton>
            <FacebookLoginButton
              align="center"
              className="login-page-social-button"
              onClick={onFacebookLogin}
            >
              <span className="login-page-social-button-label">
                Login using Facebook
              </span>
            </FacebookLoginButton>
          </div>

          <div className="login-page-signup-div">
            <span>
              No account yet?<a href={SIGNUP_PAGE}> Sign up</a> now!
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    userToken: state.userToken,
  };
};

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
