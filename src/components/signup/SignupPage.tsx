import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import { LOGIN_PAGE } from "../../routes";
import "./SignupPage.css";

const SignupPage = () => {
  interface SignupFormCredentials {
    username: string;
    password: string;
    repeatedPassword: string;
    email: string;
  }

  const [formCredentials, setFormCredentials] = useState<SignupFormCredentials>(
    {
      username: "",
      password: "",
      repeatedPassword: "",
      email: "",
    }
  );

  const setCredentialsProperty = (property: string, value: string) => {
    setFormCredentials({
      ...formCredentials,
      [property]: value,
    });
  };

  const onSignupSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(
      formCredentials.username +
        ", " +
        formCredentials.password +
        ", " +
        formCredentials.email
    );
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
          <Form onSubmit={onSignupSubmit}>
            <Form.Control
              value={formCredentials.username}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCredentialsProperty("username", e.currentTarget.value)
              }
              className="signup-page-form-input"
              placeholder="Username"
            />

            <Form.Control
              value={formCredentials.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCredentialsProperty("password", e.currentTarget.value)
              }
              className="signup-page-form-input"
              type="password"
              placeholder="Password"
            />

            <Form.Control
              value={formCredentials.repeatedPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCredentialsProperty(
                  "repeatedPassword",
                  e.currentTarget.value
                )
              }
              className="signup-page-form-input"
              type="password"
              placeholder="Repeat password"
            />

            <Form.Control
              value={formCredentials.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCredentialsProperty("email", e.currentTarget.value)
              }
              className="signup-page-form-input"
              type="email"
              placeholder="Email"
            />

            <Button
              className="signup-page-signup-button"
              variant="success"
              type="submit"
            >
              Sign up!
            </Button>
          </Form>

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

export default SignupPage;
