import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import firebase from '../../firebase.js';
import { useNavigate } from 'react-router-dom';

toastConfig (
  { theme: 'dark' }
)

function Login() {
  const [Email, setEmail] = useState('');
  const [PW, setPW] = useState('');
  const [ErrorMsg, setErrorMsg] = useState('');

  let navigate = useNavigate();

  const signInFunc = async (e) => {
    e.preventDefault();

    if ( !(Email && PW) ) {
      return toast('아이디 또는 비밀번호를 입력해주세요. 😓');
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(Email, PW);
      // 로그인 성공 시
      navigate('/');
    }
    catch(error) {
      setErrorMsg('로그인에 실패하였습니다.');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMsg('');
    }, 5000);
  }, [ErrorMsg]);

  return (
    <div className='container'>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <form action="" method="post">
              <div className='form-group mb-4'>
                <label htmlFor='formControlEmail'>이메일</label>
                <MDBInput id='formControlEmail' type='email' value={Email} size='md' className='shadow-none' onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group mb-4'>
                <label htmlFor='formControlPW'>비밀번호</label>
                <MDBInput id='formControlPW' type='password' value={PW} size='md' className='shadow-none' onChange={(e) => setPW(e.target.value)} />
              </div>
              <div className='text-center text-md-start mt-4 pt-2'>
                {ErrorMsg != '' && <p>{ErrorMsg}</p>}
                <MDBBtn className="mb-0 px-5" size='md' color='dark' noRipple='true' onClick={(e) => signInFunc(e)}>로그인</MDBBtn>
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