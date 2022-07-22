import { useEffect, useState } from "react";
import axios from "axios";

const Public = () => {
  const [message, setMessage] = useState(" ");

  useEffect(() => {
    //set configurations for the API call
    const configuration = {
      method: "get",
      url: "https://auth-app--nodejs.herokuapp.com/public",
    };

    //make the API call
    axios(configuration)
      .then((result) => {
        //assign the message in our result to the message initialized
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);
  return (
    <div>
      {/* displaying our message from our API call */}
      <h3 className="text-center text-danger">{message}</h3>
    </div>
  );
};

export default Public;
