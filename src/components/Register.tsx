import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import useInput from "../components/hooks/use-input";

//check if input field is empty
const isNotEmpty = (value: string) => value.trim() !== "";
//validate email
const isEmail = (value: string | string[]) => value.includes("@");
//check length of password
const lenPassword = (value: string) => value.length >= 6;

const Register = () => {
  const [register, setRegister] = useState(false);
  const [failedRegister, setFailedRegister] = useState(false);

  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    hasError: emailHasError,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: password,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(lenPassword);

  let formIsValid = false;

  if (usernameIsValid && passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    //configuration
    const config = {
      method: "post",
      url: "https://auth-app--nodejs.herokuapp.com/register",
      data: {
        username,
        email,
        password,
      },
    };

    //make API call
    axios(config)
      .then((result) => {
        setRegister(true);
        // make a popup alert showing the "submitted" text
        // alert("Registration Complete");
      })
      .catch((error) => {
        error = new Error("Unable to register user");
        setFailedRegister(true);
        // make a popup alert showing the "submitted" text
        // alert("Registration failed");
      });
    // console.log(username);
    // console.log(email);
    // console.log(password);
    // make a popup alert showing the "submitted" text
    // alert("Submited");
    resetUsername();
    resetPassword();
    resetEmail();
  };

  //set username class based on validity
  const usernameClasses = usernameHasError
    ? "form-control invalid"
    : "form-control";

  //set email class based on validity
  const emailClasses = emailHasError ? "form-control invalid" : "form-control ";

  //set password class based on validity
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <>
      <h2>Register</h2>
      {/* onSubmit enables form submission using the Enter key */}
      <Form onSubmit={handleFormSubmit}>
        {/* Username Field*/}
        <Form.Group className={usernameClasses} controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={usernameChangeHandler}
            onBlur={usernameBlurHandler}
            placeholder="Enter a username"
          />
          {usernameHasError && (
            <p className="error-text">Please enter a a username.</p>
          )}
        </Form.Group>

        {/* Email Field*/}
        <Form.Group className={emailClasses} controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            placeholder="Enter your email"
          />
          {emailHasError && (
            <p className="error-text">Please enter a valid email.</p>
          )}
        </Form.Group>

        {/* Password Field*/}
        <Form.Group className={passwordClasses} controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            placeholder="Enter a password"
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
          Register
        </Button>

        {/* display status message */}
        {register && (
          <Alert
            variant="success"
            onClose={() => setRegister(false)}
            dismissible
          >
            <Alert.Heading>You have been regsitered successfully</Alert.Heading>
            <p>Proceed to login</p>
          </Alert>
          // <p className="text-success">You have been regsitered successfully</p>
        )}
        {failedRegister && (
          <Alert
            variant="danger"
            onClose={() => setFailedRegister(false)}
            dismissible
          >
            <Alert.Heading>Unable to register user</Alert.Heading>
            <p>Cross-check your credentials</p>
          </Alert>
        )}
      </Form>
    </>
  );
};

export default Register;
