import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
const NavBar = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-9">
      <Navbar.Brand onClick={() => props.history.push("/")}>
        Bird Lives Matter
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => props.history.push("/")}>Home</Nav.Link>
          <Nav.Link onClick={() => props.history.push("/admin")}>
            Admin
          </Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Fight</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Flight</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Conserve</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Grow Some Trees
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
