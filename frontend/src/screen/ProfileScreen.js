import React, { useState, useEffect } from "react";
import { Row, Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetail, updateUserProfile } from "../actions/userActions";

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, user } = userDetail;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetail("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password !== confirPassword) {
      setMessage("Password not match");
    } else {
      // BUG and Not Implemented :
      // 1. updateUserProfile not calling state at all
      // 2. when updating nothing will change until we logout, because theres no animation and state change
      // 3. the function is usable ,but the experience is shit
      // 4. in short , we can update the profile, but the update will 'shown' after we logout to refresh the state
      dispatch(updateUserProfile(name, email, password));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h3>{user.name} Profiles</h3>
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
                setName(e.target.value);
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
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
          {/* Password */}
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(p) => {
                setPassword(p.target.value);
              }}
            />
          </Form.Group>
          {message && <Message variant="danger">{message}</Message>}
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={confirPassword}
              onChange={(p) => {
                setConfirmPassword(p.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product}>{item.name}</li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
