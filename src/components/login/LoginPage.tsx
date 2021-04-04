import { Button, Card, Form, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { LoginDto } from "../../api/login/loginDtos";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { AppState } from "../../redux/appState";
import { login } from "../../redux/login/loginActions";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import "./LoginPage.css";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useState,
} from "react";

interface LoginPageProps {
  apiCallsInProgress: boolean;
  userToken: UserTokenDto;

  login: (loginDto: LoginDto) => Promise<void>;
}

const LoginPage = ({
  apiCallsInProgress,
  userToken,
  login,
}: LoginPageProps) => {
  const [credentials, setCredentials] = useState<LoginDto>({
    username: "",
    password: "",
  });

  const setCredentialsProperty = (property: string, value: string) => {
    setCredentials({
      ...credentials,
      [property]: value,
    });
  };

  const onBasicLogin = (event: FormEvent) => {
    event.preventDefault();
    alert(credentials.username + ", " + credentials.password);
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
          <Form onSubmit={onBasicLogin}>
            <Form.Control
              value={credentials.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCredentialsProperty("username", e.currentTarget.value)
              }
              className="login-page-form-input"
              placeholder="Username"
            />

            <Form.Control
              value={credentials.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCredentialsProperty("password", e.currentTarget.value)
              }
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
              No account yet?<a href="https://google.com"> Sign up</a> now!
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    apiCallsInProgress: state.apiCallsInProgress > 0,
    userToken: state.userToken,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (loginDto: LoginDto) => dispatch(login(loginDto)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
