import { Button, Card, Form, Image, Alert } from "react-bootstrap";
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
import { SIGNUP_PAGE } from "../../routes";
import { Redirect } from "react-router-dom";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import ApiCallError from "../../api/apiCallError";
import React, { useState } from "react";

interface LoginPageProps {
  apiCallsInProgress: boolean;
  userToken: UserTokenDto;

  login: (loginDto: LoginDto) => Promise<void>;
}

const loginFormValidation = yup.object().shape({
  username: yup
    .string()
    .required("Required!")
    .matches(
      /^[a-z0-9]{4,15}$/,
      "Should contain only lowercase letters or numbers and be 4-15 characters long."
    ),
  password: yup
    .string()
    .required("Required!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Should be minimum eight characters, at least one letter and one number"
    ),
});

interface LoginFormProps {
  username: string;
  password: string;
}

const LoginPage = ({ userToken, login }: LoginPageProps) => {
  const [loginError, setLoginError] = useState<string>("");

  if (userToken.token) {
    return <Redirect to="/" />;
  }

  const onLoginFormSubmit = (
    values: LoginFormProps,
    formikHelpers: FormikHelpers<LoginFormProps>
  ) => {
    setLoginError("");
    formikHelpers.setSubmitting(true);

    const loginDto: LoginDto = {
      username: values.username,
      password: values.password,
    };

    login(loginDto)
      .then(() => formikHelpers.setSubmitting(false))
      .catch((e: ApiCallError) => {
        setLoginError(e.message);
        formikHelpers.setSubmitting(false);
      });
  };

  const onGoogleLogin = () => {
    alert("Google login!");
  };

  const onFacebookLogin = () => {
    alert("Facebook login!");
  };

  const initialFormValues: LoginFormProps = {
    username: "",
    password: "",
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
          <Formik
            onSubmit={onLoginFormSubmit}
            initialValues={initialFormValues}
            validationSchema={loginFormValidation}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Form.Group>
                  <Form.Control
                    className="login-page-form-input"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    isInvalid={touched.username && !!errors.username}
                    isValid={touched.username && !errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    name="password"
                    className="login-page-form-input"
                    type="password"
                    placeholder="Password"
                    isInvalid={touched.password && !!errors.password}
                    isValid={touched.password && !errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="login-page-login-button"
                  variant="success"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>

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

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (loginDto: LoginDto) => dispatch(login(loginDto)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
