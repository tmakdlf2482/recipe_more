import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams는 http://localhost:5173/post/1의 경우 1을 들고옴
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import axios from 'axios';

function Edit() {
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  let navigate = useNavigate();
  let params = useParams(); // params 출력 결과는 {postNum: '1'}

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    }

    axios.post('/api/post/detail', body)
    .then((response) => {
      if (response.data.success) {
        setPostInfo(response.data.post); // PostInfo에 {_id: '', title: '', content: '', postNum: 1, __v: 0}이 담김
        setFlag(true); // 서버와 데이터 통신이 끝났다는 신호
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  useEffect(() => { // 기존에 있던 제목, 내용 불러오는 부분
    setTitle(PostInfo.title);
    setContent(PostInfo.content);
  }, [PostInfo]);
  
  const onSubmit = (e) => {
    e.preventDefault(); // 새로고침 방지

    if (Title === '' || Content === '') {
      return alert('모든 항목을 채워주세요!');
    }

    let body = {
      title: Title,
      content: Content,
      postNum: params.postNum, // 서버 측에서도 어떤 글을 수정할지 알아야 하기 때문에 필요
    };

    axios.post('/api/post/edit', body)
    .then((response) => {
      if (response.data.success) {
        toast('글 수정이 완료되었습니다. 😊');
        navigate(`/post/${params.postNum}`);
      }
      else {
        toast('글 수정에 실패하였습니다. 😓');
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
          <Form.Control type='text' defaultValue={PostInfo.title} onChange={(e) => {setTitle(e.target.value);}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label style={{ fontWeight: 'bold' }}>내용</Form.Label>
          <Form.Control as="textarea" rows={20} style={{ resize: 'none' }} value={Content} onChange={(e) => {setContent(e.target.value);}} />
        </Form.Group>
        <Button variant="dark" style={{ float: 'right' }} onClick={(e) => {onSubmit(e)}}>등록</Button>
        <Button variant="danger" style={{ float: 'right', marginRight: '10px' }} onClick={(e) => {e.preventDefault(); navigate(-1);}}>취소</Button>
      </Form>
    </div>
  );
}

export default Edit;