import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';

function Register() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [PW, setPW] = useState('');
  const [PWConfirm, setPWConfirm] = useState('');

  return (
    <div className='container'>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <form action="" method="post">
              <MDBInput wrapperClass='mb-4' label='이름' id='formControlLg' type='name' value={Name} size="md" className='shadow-none' onChange={(e) => setName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='이메일' id='formControlLg' type='email' value={Email} size="md" className='shadow-none' onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='비밀번호' id='formControlLg' type='password' value={PW} size="md" className='shadow-none' onChange={(e) => setPW(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='비밀번호 확인' id='formControlLg' type='password' value={PWConfirm} size="md" className='shadow-none' onChange={(e) => setPWConfirm(e.target.value)} />
              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='md' color="dark">회원가입</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Register;