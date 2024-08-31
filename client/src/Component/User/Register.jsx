import React, { useState } from 'react';
import firebase from '../../firebase.js';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBInput } from 'mdb-react-ui-kit';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

toastConfig (
  { theme: 'dark' }
)

function Register() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [PW, setPW] = useState('');
  const [PWConfirm, setPWConfirm] = useState('');
  const [Flag, setFlag] = useState(false); // 회원가입 시 시간지연 때문에 회원가입 버튼 여러번 누르는거 방지

  let navigate = useNavigate();

  const RegisterFunc = async (e) => {
    e.preventDefault();

    setFlag(true); // 회원가입 버튼이 disabled 되어 클릭이 안됨

    if ( !(Name && Email && PW && PWConfirm) ) {
      return toast('모든 값을 채워주세요. 😓');
    }
    if ( PW != PWConfirm ) {
      return toast('비밀번호가 일치하지 않습니다. 😓');
    }

    // firebase가 회원가입할때까지 잠시 대기 (async, await)
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, PW); // 이메일, 비밀번호로 회원가입

    await createdUser.user.updateProfile({
      displayName: Name, // 사용자 이름
    });

    // console.log(createdUser.user);
    // console.log(createdUser.user.multiFactor.user.displayName);
    // console.log(createdUser.user.multiFactor.user.email);
    // console.log(createdUser.user.multiFactor.user.uid);
    let body = { // displayName(사용자이름), email(이메일), uid(고유id)를 몽고db에 저장하기 위한 데이터들
      displayName: createdUser.user.multiFactor.user.displayName, // 사용자 이름
      email: createdUser.user.multiFactor.user.email, // 이메일
      uid: createdUser.user.multiFactor.user.uid, // 고유id
    };

    axios.post('/api/user/register', body)
    .then((response) => {
      setFlag(false);

      if (response.data.success) {
        // 회원가입 성공시
        navigate('/login');
      }
      else {
        // 회원가입 실패시
        return toast('회원가입이 실패하였습니다. 😓');
      }
    })
  };

  return (
    <div className='container'>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <form action="" method="post">
              <MDBInput wrapperClass='mb-4' label='이름' id='formControlLg' type='name' value={Name} size="md" className='shadow-none' onChange={(e) => setName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='이메일' id='formControlLg' type='email' value={Email} size="md" className='shadow-none' onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='비밀번호(*최소 6자리 입력)' minLength={6} id='formControlLg' type='password' value={PW} size="md" className='shadow-none' onChange={(e) => setPW(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='비밀번호 확인(*최소 6자리 입력)' minLength={6} id='formControlLg' type='password' value={PWConfirm} size="md" className='shadow-none' onChange={(e) => setPWConfirm(e.target.value)} />
              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='md' color='dark' noRipple='true' disabled={Flag} onClick={(e) => RegisterFunc(e)}>회원가입</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Register;