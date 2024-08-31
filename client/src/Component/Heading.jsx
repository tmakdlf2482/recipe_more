import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import firebase from '../firebase.js';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig (
  { theme: 'dark' }
)

function Heading() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    toast('로그아웃되었습니다. 😊');
    navigate('/');
  };

  return (
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">레시피 더줘!</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to='/upload' style={{ color: 'white', textDecoration: 'none' }}>업로드</Link>            
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          {
            user.accessToken ?
            (<Navbar.Text style={{ color: 'white', cursor: 'pointer' }} onClick={() => LogoutHandler()}>로그아웃</Navbar.Text>)
            :
            (<Link to='/login' style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>)
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;