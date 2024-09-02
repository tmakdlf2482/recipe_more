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
  // const [Flag, setFlag] = useState(false); // 회원가입 시 시간지연 때문에 회원가입 버튼 여러번 누르는거 방지
  const [NameCheck, setNameCheck] = useState(false);
  const [NameInfo, setNameInfo] = useState('');

  let navigate = useNavigate();

  const RegisterFunc = async (e) => {
    e.preventDefault();

    // setFlag(true); // 회원가입 버튼이 disabled 되어 클릭이 안됨

    if ( !(Name && Email && PW && PWConfirm) ) {
      return toast('모든 값을 채워주세요. 😓');
    }
    if ( PW != PWConfirm ) {
      return toast('비밀번호가 일치하지 않습니다. 😓');
    }

    if ( !NameCheck ) {
      return toast('닉네임 중복검사를 진행해주세요. 😓');
    }

    if (PW.length <= 6 && PWConfirm.length <= 6) {
      return toast('비밀번호는 6자리 이상이여야 합니다. 😓');
    }

    // firebase가 회원가입할때까지 잠시 대기 (async, await)
    let createdUser = await firebase.auth().createUserWithEmailAndPassword(Email, PW); // 이메일, 비밀번호로 회원가입

    await createdUser.user.updateProfile({
      displayName: Name, // 사용자 이름
      photoURL: 'https://kr.object.ncloudstorage.com/react-recipe/user/user.png', // 사용자 프로필 이미지
    });

    // console.log(createdUser.user);
    // console.log(createdUser.user.multiFactor.user.displayName);
    // console.log(createdUser.user.multiFactor.user.email);
    // console.log(createdUser.user.multiFactor.user.uid);
    let body = { // displayName(사용자이름), email(이메일), uid(고유id)를 몽고db에 저장하기 위한 데이터들
      displayName: createdUser.user.multiFactor.user.displayName, // 사용자 이름
      email: createdUser.user.multiFactor.user.email, // 이메일
      uid: createdUser.user.multiFactor.user.uid, // 고유id
      photoURL: 'https://kr.object.ncloudstorage.com/react-recipe/user/user.png', // 프로필 이미지
    };

    axios.post('/api/user/register', body)
    .then((response) => {
      // setFlag(false);

      if (response.data.success) {
        // 회원가입 성공시
        toast('회원가입에 성공하였습니다. 😊');
        navigate('/login');
      }
      else {
        // 회원가입 실패시
        return toast('회원가입이 실패하였습니다. 😓');
      }
    })
  };

  const NameCheckFunc = (e) => {
    e.preventDefault();

    if ( !Name ) {
      return toast('닉네임을 입력해주세요. 😓');
    }

    let body = {
      displayName: Name,
    };

    axios.post('/api/user/nameCheck', body)
    .then((response) => {
      if (response.data.success) {
        if (response.data.check) {
          setNameCheck(true);
          setNameInfo('사용가능한 닉네임입니다. ');
        }
        else {
          setNameInfo('사용불가능한 닉네임입니다. ');
        }
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
              <div className='form-group mb-4'>
                <label htmlFor='formControlName'>닉네임</label>
                <MDBInput id='formControlName' type='name' value={Name} size="md" className='shadow-none' disabled={NameCheck} onChange={(e) => setName(e.target.value)} />
                {NameInfo && <div className="form-text">{NameInfo}</div>}
                {
                  !NameCheck && (<MDBBtn className="mb-1 px-2" size='sm' color='dark' noRipple='true' onClick={(e) => NameCheckFunc(e)} style={{ marginTop: '10px' }}>닉네임 중복검사</MDBBtn>)
                }
              </div>
              <div className='form-group mb-4'>
                <label htmlFor='formControlEmail'>이메일</label>
                <MDBInput id='formControlEmail' type='email' value={Email} size="md" className='shadow-none' onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='form-group mb-4'>
                <label htmlFor='formControlPW'>비밀번호(*최소 6자리 입력)</label>
                <MDBInput minLength={6} id='formControlPW' type='password' value={PW} size="md" className='shadow-none' onChange={(e) => setPW(e.target.value)} />
              </div>
              <div className='form-group mb-4'>
                <label htmlFor='formControlPWConfirm'>비밀번호 확인(*최소 6자리 입력)</label>
                <MDBInput minLength={6} id='formControlPWConfirm' type='password' value={PWConfirm} size="md" className='shadow-none' onChange={(e) => setPWConfirm(e.target.value)} />
              </div> 
              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='md' color='dark' noRipple='true' onClick={(e) => RegisterFunc(e)}>회원가입</MDBBtn> {/* 원래 disabled={Flag} 해줬으나 예상치못한 버그로 빼줌 */}
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Register;