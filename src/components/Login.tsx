import React, { useState } from "react";
import { Form, Button, Toast } from "react-bootstrap";
import axios from "axios";
import useInput from "./hooks/use-input";
import Cookies from "universal-cookie";

const cookies = new Cookies();
//check if input field is empty
const isNotEmpty = (value: string) => value.trim() !== "";

//check length of password
const lenPassword = (value: string) => value.length >= 6;

const Login = () => {
  const [login, setLogin] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const [show, setShow] = useState(false);

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    // reset: resetUsername,
  } = useInput(isNotEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    // reset: resetPassword,
  } = useInput(lenPassword);

  let formIsValid = false;

  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    //configuration
    const config = {
      method: "post",
      url: "https://auth-app--nodejs.herokuapp.com/login",
      data: {
        username,
        password,
      },
    };
    //make API call
    axios(config)
      .then((result) => {
        setLogin(true);

        //set the cookie
        cookies.set("TOKEN", result.data.token, {
          path: "/",
        });

        // redirect user to the auth page
        window.location.href = "/auth";
      })
      .catch((error) => {
        error = new Error("Unable to login");
        setFailedLogin(true);
        setShow(true);
      });

    // resetUsername();
    // resetPassword();
  };

  //set username class based on validity
  const usernameClasses = usernameHasError
    ? "form-control invalid"
    : "form-control";

  //set password class based on validity
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <section className="login">
      <h2 className="mb-4"> Sign in your account</h2>
      <Form onSubmit={handleFormSubmit}>
        {/* Username Field*/}
        <Form.Group className={usernameClasses} controlId="formBasicEmail">
          {/* <Form.Label>Username</Form.Label> */}
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            placeholder="Username"
          />
          {usernameHasError && <p className="error-text">Username.</p>}
        </Form.Group>

        {/* Password Field*/}
        <Form.Group className={passwordClasses} controlId="formBasicEmail">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            placeholder="Password"
          />
          {passwordHasError && (
            <p className="error-text">Password must be at least 6 characters</p>
          )}
        </Form.Group>
        {/* Submit Button */}
        <Button
          variant="primary"
          type="submit"
          onClick={handleFormSubmit}
          disabled={!formIsValid}
          className="mb-3"
        >
          Login
        </Button>

        {/* display staus message */}
        {/* {login && (
          <Toast
            onClose={() => setShowSucess(false)}
            show={show}
            delay={3000}
            autohide
            bg="success"
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto text-danger">Success</strong>
            </Toast.Header>
            <Toast.Body>Welcome</Toast.Body>
          </Toast>
        )} */}
        {failedLogin && (
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            bg="danger"
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto text-danger">
                Error: Login Failed
              </strong>
            </Toast.Header>
            <Toast.Body>
              Make sure you register before you login or cross-check your
              credetials
            </Toast.Body>
          </Toast>
        )}
      </Form>
    </section>
  );
};

export default Login;
