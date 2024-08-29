import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

toastConfig (
  { theme: 'dark' }
)

function Upload() {
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');

  let navigate = useNavigate();
  
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    if (Title === '' || Content === '') {
      return alert('모든 항목을 채워주세요!');
    }

    let body = {
      title: Title,
      content: Content,
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
          <Form.Control type='text' value={Title} onChange={(e) => {setTitle(e.target.value);}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: 'bold' }}>내용</Form.Label>
          <Form.Control as="textarea" rows={20} style={{ resize: 'none' }} value={Content} onChange={(e) => {setContent(e.target.value);}} />
        </Form.Group>
        <Button variant="dark" style={{ float: 'right' }} onClick={(e) => {onSubmit(e)}}>등록</Button>
      </Form>
    </div>
  );
}

export default Upload;