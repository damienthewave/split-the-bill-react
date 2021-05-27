import React, { useState } from "react";
import { Alert, Button, Card, Form, Image } from "react-bootstrap";
import { CREATE_PERSON_PAGE_SUFFIX, LOGIN_PAGE } from "../../routes";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import "./SignupPage.css";
import { SignupDto } from "../../api/signup/signupDtos";
import { AppState } from "../../redux/appState";
import { UserTokenDto } from "../../api/login/userTokenDto";
import { signup } from "../../redux/signup/signupActions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import ApiCallError from "../../api/apiCallError";

interface SignupPageProps {
  apiCallsInProgress: boolean;
  userToken: UserTokenDto;

  signup: (signupDto: SignupDto) => Promise<void>;
}

const signupFormValidation = yup.object().shape({
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
  repeatedPassword: yup
    .string()
    .required("Required!")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  email: yup
    .string()
    .email()
    .required("Required!")
    .matches(
      /^[a-z0-9.]+@[a-z0-9][a-z0-9.]*\.[a-z]{2,3}$/,
      "Provide correct email."
    ),
});

interface SignupFormProps {
  username: string;
  password: string;
  repeatedPassword: string;
  email: string;
}

const SignupPage: React.FC<SignupPageProps> = ({ userToken, signup }) => {
  const [signupError, setSignupError] = useState<string>("");

  if (userToken.token) {
    return <Redirect to={CREATE_PERSON_PAGE_SUFFIX} />;
  }

  const onSignupFormSubmit = (
    values: SignupFormProps,
    formikHelpers: FormikHelpers<SignupFormProps>
  ) => {
    setSignupError("");
    formikHelpers.setSubmitting(true);

    const signupDto: SignupDto = {
      username: values.username,
      password: values.password,
      email: values.email,
    };

    signup(signupDto)
      .then(() => formikHelpers.setSubmitting(false))
      .catch((e: ApiCallError) => {
        setSignupError(e.message);
        formikHelpers.setSubmitting(false);
      });
  };

  const initialFormValues: SignupFormProps = {
    username: "",
    password: "",
    repeatedPassword: "",
    email: "",
  };

  return (
    <div className="signup-page">
      <Card className="signup-form" bg="light" border="success">
        <Image className="signup-page-logo" src="logo.png" />
        <Card.Title>
          <span className="signup-page-title">Split The Bill</span>
        </Card.Title>
        <Card.Text>Create new account</Card.Text>
        <Card.Body>
          <Alert show={signupError !== ""} variant={"danger"}>
            {signupError}
          </Alert>
          <Formik
            onSubmit={onSignupFormSubmit}
            initialValues={initialFormValues}
            validationSchema={signupFormValidation}
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
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <Form.Group>
                  <Form.Control
                    className="signup-page-form-input"
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
                    className="signup-page-form-input"
                    type="password"
                    placeholder="Password"
                    isInvalid={touched.password && !!errors.password}
                    isValid={touched.password && !errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.repeatedPassword}
                    name="repeatedPassword"
                    className="signup-page-form-input"
                    type="password"
                    placeholder="Repeat password"
                    isInvalid={
                      touched.repeatedPassword && !!errors.repeatedPassword
                    }
                    isValid={
                      touched.repeatedPassword && !errors.repeatedPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.repeatedPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    name="email"
                    className="signup-page-form-input"
                    type="email"
                    placeholder="Email"
                    isInvalid={touched.email && !!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="signup-page-signup-button"
                  variant="success"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Sign up!
                </Button>
              </Form>
            )}
          </Formik>
          <div className="signup-page-signup-div">
            <span>
              Already signed up? <a href={LOGIN_PAGE}>Login</a> now!
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
    signup: (signupDto: SignupDto) => dispatch(signup(signupDto)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
