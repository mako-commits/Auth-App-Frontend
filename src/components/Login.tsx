import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import useInput from "./hooks/use-input";

//check if input field is empty
const isNotEmpty = (value: string) => value.trim() !== "";

//check length of password
const lenPassword = (value: string) => value.length >= 6;
const Login = () => {
  const [login, setLogin] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const {
    value: username,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetUsername,
  } = useInput(isNotEmpty);

  const {
    value: password,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    hasError: passwordHasError,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
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
        // make a popup alert showing the "submitted" text
        // alert("Login Successful");
      })
      .catch((error) => {
        error = new Error("Unable to login");
        setFailedLogin(true);
        // alert("Login failed");
      });

    resetUsername();
    resetPassword();
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
    <>
      <h2>Login</h2>
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
          Login
        </Button>

        {/* display staus message */}
        {login && (
          <Alert variant="success" onClose={() => setLogin(false)} dismissible>
            <Alert.Heading>Login Successful</Alert.Heading>
            <p>Proceed to login</p>
          </Alert>
        )}
        {failedLogin && (
          <Alert
            variant="danger"
            onClose={() => setFailedLogin(false)}
            dismissible
          >
            <Alert.Heading>Login Failed</Alert.Heading>
            <p>
              Make sure you register before you login or cross-check your
              credetials
            </p>
          </Alert>
        )}
      </Form>
    </>
  );
};

export default Login;
