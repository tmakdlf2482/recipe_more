import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImageUpload from './ImageUpload.jsx';

toastConfig (
  { theme: 'dark' }
)

function Upload() {
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [Image, setImage] = useState(''); // Image에는 파일 경로가 들어옴

  let navigate = useNavigate();
  let user = useSelector(state => state.user);

  useEffect(() => { // 로그인한 사용자만 게시글 등록 가능
    if ( !user.accessToken ) {
      toast('로그인한 사용자만 글을 작성할 수 있습니다. 😓');
      navigate('/login');
    }
  }, []);
  
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    if (Title === '' || Content === '') {
      return toast('모든 항목을 채워주세요! 😓');
    }

    let body = {
      title: Title,
      content: Content,
      image: Image,
      uid: user.uid, // firebase의 유저의 고유한 uid
    };

    axios.post('/api/post/submit', body)
    .then((response) => {
      if (response.data.success) {
        toast('글 작성이 완료되었습니다. 😊');
        navigate('/');
      }
      else {
        toast('글 작성에 실패하였습니다. 😓');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  return (
    <div className='container' style={{ marginTop: '2rem' }}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontWeight: 'bold' }}>제목</Form.Label>
          <Form.Control type='text' className='shadow-none' value={Title} onChange={(e) => {setTitle(e.target.value);}} />
        </Form.Group>
        
        <ImageUpload setImage={setImage} />

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: 'bold' }}>내용</Form.Label>
          <Form.Control as="textarea" rows={20} style={{ resize: 'none' }} className='shadow-none' value={Content} onChange={(e) => {setContent(e.target.value);}} />
        </Form.Group>
        <Button variant="dark" style={{ float: 'right' }} onClick={(e) => {onSubmit(e)}}>등록</Button>
      </Form>
    </div>
  );
}

export default Upload;