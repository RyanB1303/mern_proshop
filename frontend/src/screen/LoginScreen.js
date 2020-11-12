import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  // redux 101 in my understanding
  const dispatch = useDispatch();
  // 1 . Dispatch
  const userLogin = useSelector((state) => state.userLogin);
  // 2. Selector => to select reducer from store
  const { loading, error, userInfo } = userLogin;
  // 3. the state from reducer
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const emailHandler = (e) => {
    return setEmail(e.target.value);
  };

  const passwordHandler = (p) => {
    return setPassword(p.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // 4. call Action using dispatch -> the login in here is actually Action from userAction method called 'login'
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader> </Loader>}
      <Form onSubmit={formSubmitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              emailHandler(e);
            }}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(p) => {
              passwordHandler(p);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        New Customer ? &nbsp;
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register
        </Link>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
