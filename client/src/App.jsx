import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice.js';
import firebase from './firebase.js';

import Heading from './Component/Heading.jsx';
import MainPage from './Component/MainPage.jsx';
import Upload from './Component/Post/Upload.jsx';
import PostArea from './Component/Post/PostArea.jsx';
import Edit from './Component/Post/Edit.jsx';

import Login from './Component/User/Login.jsx';
import Register from './Component/User/Register.jsx';
import MyPage from './Component/User/MyPage.jsx';

function App() {
  // const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => { // 로그인, 로그아웃 상태변화
      // console.log('userInfo : ', userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      }
      else {
        dispatch(clearUser()); // 그냥 정보가 없는 상태
      }
    });
  }, []);
  
  // useEffect(() => { // 로그아웃
  //   // firebase.auth().signOut();
  // }, []);

  // useEffect(() => {
  //   // console.log('user : ', user);
  // }, [user]);
  
  return (
    <BrowserRouter>
      <Heading />
      <Routes>
        <Route path='/' element={<MainPage />} />
        
        {/* Post, Comment */}
        <Route path='/upload' element={<Upload />} />
        <Route path='/post/:postNum' element={<PostArea />} />
        <Route path='/edit/:postNum' element={<Edit />} />
        
        {/* User */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;