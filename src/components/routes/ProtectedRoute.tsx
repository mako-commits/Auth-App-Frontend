import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface Props {
  children?: any;
}
const ProtectedRoute = ({ children }: Props) => {
  const token = cookies.get("TOKEN");
  // returns the user to the landing page if there is no valid token
  return token ? children : <Navigate to="/" />;
};
export default ProtectedRoute;
