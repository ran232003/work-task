import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import "./global.css";
import profilePic from "./profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/userSlice";
import { apiCall } from "../apiCall";
import { SIGN_OUT } from "../URLS";
import { loadingAction } from "../store/loadingData";
import { taskModalAction } from "../store/TaskModalSlice";
const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user.user;
  });
  const handleSignOut = async () => {};
  const handleTask = () => {
    // console.log("before");
    dispatch(taskModalAction.setTaskModal(true));
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary my-nav">
      <Container fluid>
        <Navbar.Brand as={Link} to={"/"}>
          Task Master
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="my-nav-link" as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link className="my-nav-link" as={Link} to={"/about"}>
              About
            </Nav.Link>
            <Nav.Link className="my-nav-link" as={Link} to={"/tasks/allTasks"}>
              All Tasks
            </Nav.Link>
            {user ? (
              <Nav.Link className="my-nav-link" as={Link} to={"/tasks/myTasks"}>
                My Tasks
              </Nav.Link>
            ) : null}
          </Nav>
          {user ? (
            <NavDropdown
              className="nav-profile d-flex"
              title={
                <img
                  src={profilePic}
                  alt="Profile"
                  style={{ width: "40px", borderRadius: "50%" }}
                />
              } // Render profile picture as the titl
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={handleTask}>
                Create Task
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignOut}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav className="" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link
                className="my-nav-link"
                as={Link}
                to={"/auth/signin"}
                variant="outline-success nav-profile"
              >
                {" "}
                Sign In
              </Nav.Link>
            </Nav>
          )}

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
