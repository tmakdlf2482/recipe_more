import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Login() {
  const [Email, setEmail] = useState('');
  const [PW, setPW] = useState('');

  return (
    <div className='container'>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <form action="" method="post">
              <MDBInput wrapperClass='mb-4' label='이메일' id='formControlLg' type='email' value={Email} size="md" className='shadow-none' onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='비밀번호' id='formControlLg' type='password' value={PW} size="md" className='shadow-none' onChange={(e) => setPW(e.target.value)} />
              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='md' color="dark">로그인</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">계정이 없으신가요? <a href="/register" className="link-danger" style={{ textDecorationLine: 'none' }}>회원가입</a></p>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Login;