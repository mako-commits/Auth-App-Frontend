import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
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
      })
      .catch((error) => {
        error = new Error("Unable to login");
      });
  };
  return (
    <>
      <h2>Login</h2>
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
          Login
        </Button>

        {/* display staus message */}
        {login ? (
          <p className="text-success">Login was successful</p>
        ) : (
          <p className="text-danger">
            Something went wrong with while logining
          </p>
        )}
      </Form>
    </>
  );
};

export default Login;
