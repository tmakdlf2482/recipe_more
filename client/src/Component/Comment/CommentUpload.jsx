import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig (
  { theme: 'dark' }
)

function CommentUpload(props) {
  const [Comment, setComment] = useState('');
  const user = useSelector(state => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();

    if ( !Comment ) {
      return toast('댓글을 입력해주세요. 😓');
    }

    // console.log(props.postId);

    let body = {
      comment: Comment,
      uid: user.uid,
      postId: props.postId,
    };

    axios.post('/api/comment/submit', body)
    .then((response) => {
      // setComment(''); // 댓글 초기화

      if (response.data.success) {
        toast('댓글이 작성되었습니다. 😊');
        window.location.reload(); // 새로고침
      }
      else {
        toast('댓글이 작성되지 않았습니다. 😓');
      }
    });
  };

  return (
    <div className='container'>
      <form method="post">
        <InputGroup className="mb-3">
          <Form.Control type='text' value={Comment} placeholder="댓글을 남겨보세요." style={{ border: '1px solid black' }} className='shadow-none' onChange={(e) => setComment(e.target.value)} />
          <Button variant="outline-secondary" onClick={(e) => SubmitHandler(e)} >등록</Button>
        </InputGroup>
      </form>
    </div>
  );
}

export default CommentUpload;