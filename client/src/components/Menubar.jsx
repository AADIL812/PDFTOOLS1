import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Menubar = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            PDFTOOLS
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Wordtopdf">
              Word to PDF
            </Nav.Link>
            <Nav.Link as={Link} to="/Pdftoword">
              PDF to Word
            </Nav.Link>
            <Nav.Link as={Link} to="/Mergepdf">
              Merge PDF
            </Nav.Link>
            <Nav.Link as={Link} to="/Texttotable">
              Text to Table
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Menubar;
