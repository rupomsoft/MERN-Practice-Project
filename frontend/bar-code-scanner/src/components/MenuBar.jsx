import React from "react";
import { Container, Navbar } from "react-bootstrap";
import navLogo from "../assets/images/logo.svg";

const MenuBar = () => {
  return (
    <Navbar className="sticky-top nav" bg="light">
      <Container>
        <Navbar.Brand>
          <img className="nav-logo" src={navLogo} alt="" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MenuBar;
