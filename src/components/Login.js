import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Signup.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/ellipse23.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/profile");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  // const handleClick = () => {
  //   console.log('checking click');
  //   // take user to homePage
  // }

  const styles = {
    padding: {
      paddingTop: "12vh",
      paddingRight: "10vw",
      paddingLeft: "5vw",
    },
  };

  return (
    <>
      <Row>
        <div className="leftCol" lg={7} md={6} sm={12}>
          <Col className="logoCompName">
            <img className="w-75 p-3" id="logo" src={logo} alt="Logo" />
          </Col>
        </div>

        {/* <h4>Already have an account? Log In </h4>  */}
        <Col lg={5} md={6} sm={12} className="text-left mt-5 p-3">
          <Form className="login-form" id="login-form" onSubmit={handleSubmit}>
            <Container style={styles.padding}>
              <Form.Group>
                <Form.Label>
                  <h2 className="registerDir">Login to Account</h2>
                </Form.Label>
              </Form.Group>

              <Form.Label>Email Address *</Form.Label>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  className="text-left"
                  placeholder="Enter email address"
                  ref={emailRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Label>Password *</Form.Label>
              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  className="text-left"
                  placeholder="Password"
                  ref={passwordRef}
                  required
                ></Form.Control>
              </Form.Group>

              <Button variant="dark btn-block" disabled={loading} type="submit">
                {" "}
                Login
              </Button>
            </Container>
          </Form>
        </Col>
      </Row>
    </>
  );
}
