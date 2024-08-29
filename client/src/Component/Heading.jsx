import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, } from 'react-bootstrap';

function Heading() {
  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">레시피 더줘!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to='/upload' style={{ color: 'white', textDecoration: 'none' }}>업로드</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;