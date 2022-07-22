import { Routes, Route } from "react-router-dom";
import Public from "./components/routes/Public";
import Auth from "./components/routes/Auth";
import Account from "./components/Account";
import { Col, Container, Row } from "react-bootstrap";
import ProtectedRoutes from "./components/routes/ProtectedRoute";

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/auth">Auth Component</a>
          </section>
        </Col>
      </Row>

      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/free" element={<Public />} />

        <Route
          path="/auth"
          element={
            <ProtectedRoutes>
              <Auth />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
