import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

const Auth = () => {
  const [message, setMessage] = useState("");

  // useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    const configuration = {
      method: "get",
      url: "https://auth-app--nodejs.herokuapp.com/auth",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    //make the API call
    axios(configuration)
      .then((result) => {
        //assign the message in our result to the message we initialized
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  //logout functionality
  const logout = () => {
    //destroy the cookie
    cookies.remove("TOKEN", { path: "/  " });
    // redirect user to the landing page
    window.location.href = "/";
  };
  return (
    <div className="text-center mb-5">
      <h3 className="text-center text-danger">{message}</h3>
      <Button type="submit" variant="danger" onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Auth;
