import { Container, Col, Row } from "react-bootstrap";
import {Routes, Route, Navigate} from "react-router-dom"
import ProtectedRoutes from "./ProtectedRoutes";
import Account from './Account'
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = cookies.get("TOKEN");
    if (!token) {
      return <Navigate to="/" replace />;
    }
  
    return children;
  };
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/auth">Auth Component</a>
          </section>
        </Col>
      </Row>
      <Routes>
        <Route exact path="/" element={<Account/>} />
        <Route exact path="/free" element={<FreeComponent/>} />
        <Route path="/auth" element={
          <ProtectedRoute>
            <AuthComponent/>
          </ProtectedRoute>
          }/>
        {/* <ProtectedRoutes path="/auth" element={<AuthComponent/>} /> */}
      </Routes>
    </Container>
  );
}

export default App;
