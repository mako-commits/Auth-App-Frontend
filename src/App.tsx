import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Register />
        </Col>
        <Col xs={12} sm={12} md={6} lg={6}>
          <Login />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
