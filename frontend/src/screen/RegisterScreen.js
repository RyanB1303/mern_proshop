import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";
  // redux 101 in my understanding
  const dispatch = useDispatch();
  // 1 . Dispatch
  const userRegister = useSelector((state) => state.userRegister);
  // 2. Selector => to select reducer from store
  const { loading, error, userInfo } = userRegister;
  // 3. the state from reducer
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const nameHandler = (e) => {
    return setName(e.target.value);
  };

  const emailHandler = (e) => {
    return setEmail(e.target.value);
  };

  const passwordHandler = (p) => {
    return setPassword(p.target.value);
  };

  const passwordConfirmHandler = (p) => {
    return setPasswordConfirm(p.target.value);
  };

  const messageHandler = (e) => {
    return setMessage(e);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    // check if password match in ternary if match -> dispatch register if not show setmessage to "Password not match"
    password === passwordConfirm
      ? dispatch(register(name, email, password))
      : messageHandler("Password not match");
    // dispatch(register(name, email, password));
    // 4. call Action using dispatch -> the login in here is actually Action from userAction method called 'login'
  };

  return (
    <FormContainer>
      <h1>Register New User</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader> </Loader>}
      <Form onSubmit={formSubmitHandler}>
        {/* User Name */}
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => {
              nameHandler(e);
            }}
          />
        </Form.Group>
        {/* Email Address */}
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
        {/* Password */}
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
        {message && <Message variant="danger">{message}</Message>}
        {/* Password Confirm */}
        <Form.Group controlId="formBasicPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={passwordConfirm}
            onChange={(p) => {
              passwordConfirmHandler(p);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        Have Account ? &nbsp;
        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
          Login
        </Link>
        {/* {redirect ? `/login?redirect=${redirect}` : "/login"} */}
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
