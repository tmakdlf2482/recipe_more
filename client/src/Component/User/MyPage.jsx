import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import firebase from '../../firebase.js';
import Avatar from 'react-avatar';
import axios from 'axios';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig (
  { theme: 'dark' }
)

function MyPage() {
  const [CurrentImage, setCurrentImage] = useState('');
  const user = useSelector(state => state.user);
  let navigate = useNavigate();

  useEffect(() => {
    // console.log(user);
    if (user.isLoading && !user.accessToken) {
      navigate('/login');
    }
    else {
      setCurrentImage(user.photoURL);
    }
  }, [user]);

  const ImageUpload = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    axios.post('/api/user/profile/img', formData)
    .then((response) => {
      setCurrentImage(response.data.filePath);
    });
  };
  
  const SaveProfile = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().currentUser.updateProfile({
        photoURL: CurrentImage, // 사용자 프로필 이미지
      });
    }
    catch(error) {
      toast('프로필 저장에 실패하였습니다. 😓');
    }

    let body = {
      photoURL: CurrentImage,
      uid: user.uid,
    };

    axios.post('/api/user/profile/update', body)
    .then((response) => {
      if (response.data.success) {
        toast('프로필 저장에 성공하였습니다. 😊');
        setTimeout(() => {
          window.location.reload(); // 새로고침
        }, 500);
      }
      else {
        toast('프로필 저장에 실패하였습니다. 😓');
      }
    });
  };
  
  return (
    // 1. 사용자가 현재 어떤 이미지를 사용하고 있는지 보여주기
    // 2. 이미지를 바꿀 수 있게 하기
    <div style={{ width: '100vw', height: '100vh' }}>
      <form style={{ width: '50%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2rem' }} onChange={(e) => ImageUpload(e)}>
        <label>
          <input type="file" accept='image/*' style={{ display: 'none' }} />
          <Avatar size='100' round={true} src={CurrentImage} style={{ border: '1px solid #c6c6c6', cursor: 'pointer' }} />
        </label>
        <Button variant="secondary" size="sm" onClick={(e) => SaveProfile(e)}>저장</Button>
      </form>
    </div>
  );
}

export default MyPage;