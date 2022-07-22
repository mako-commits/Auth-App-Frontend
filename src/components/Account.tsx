import { Container, Col } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Account = () => {
  return (
    <Container>
      <Col xs={12} sm={12} md={6} lg={6} className="mx-auto">
        <Tabs
          defaultActiveKey="register"
          transition={false}
          id="fill-tab-example"
          className="mb-3 justify-content-center"
        >
          <Tab eventKey="register" title="Register">
            <Register />
          </Tab>
          <Tab eventKey="login" title="Login">
            <Login />
          </Tab>
        </Tabs>
      </Col>
    </Container>
  );
};

export default Account;
