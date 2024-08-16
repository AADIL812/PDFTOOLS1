import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Topbar = () => {
  return (
    <>
      <Navbar expand="lg" variant="dark" className="bg-dark">
        <Container>
          <Navbar.Brand href="#home">PDFTOOLS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#aboutus">About Us</Nav.Link>
              <Nav.Link href="#">Services</Nav.Link>
              <Nav.Link href="#">Credits</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Topbar;
