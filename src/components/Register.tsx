import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

type Props = {};
const Register: React.FC<Props> = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    alert("Submited");

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
      })
      .catch((error) => {
        error = new Error("Unable to register user");
      });
  };

  return (
    <>
      <h2>Register</h2>
      {/* onSubmit enables form submission using the Enter key */}
      <Form onSubmit={handleFormSubmit}>
        {/* Username Field*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter a username"
          />
        </Form.Group>

        {/* Email Field*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </Form.Group>

        {/* Password Field*/}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter a password"
          />
        </Form.Group>
        {/* Submit Button */}
        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
          Register
        </Button>

        {/* display staus message */}
        {register ? (
          <p className="text-success">You have been regsitered successfully</p>
        ) : (
          <p className="text-danger">
            Something went wrong with your registration
          </p>
        )}
      </Form>
    </>
  );
};

export default Register;
