import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { InputGroup, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import Avatar from 'react-avatar';

toastConfig (
  { theme: 'dark' }
)

function CommentContent(props) {
  const [ModalFlag, setModalFlag] = useState(false);
  const [EditFlag, setEditFlag] = useState(false); // 댓글 수정
  const [Comment, setComment] = useState(props.comment.comment);

  const ref = useRef(); // useRef() 는 리액트 컴포넌트에서 어떤 특정한 영억의 컴포넌트 혹은 태그를 선택할 때 사용
  useOnClickOutside(ref, () => setModalFlag(false));

  const user = useSelector(state => state.user);

  const SubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      uid: user.uid,
      comment: Comment,
      postId: props.comment.postId,
      commentId: props.comment._id,
    };

    axios.post('/api/comment/edit', body)
    .then((response) => {
      if (response.data.success) {
        toast('댓글 수정이 완료되었습니다. 😊');
        setTimeout(() => {
          window.location.reload(); // 새로고침
        }, 500);
      }
      else {
        toast('댓글 수정에 실패하였습니다. 😓');
      }
    })
  };

  const DeleteHandler = (e) => {
    e.preventDefault();

    // 정말 삭제하시겠습니까? 메시지 창
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      let body = {
        postId: props.comment.postId,
        commentId: props.comment._id,
      };
  
      axios.post('/api/comment/delete', body)
      .then((response) => {
        if (response.data.success) {
          toast('댓글이 삭제되었습니다. 😊');
          setTimeout(() => {
            window.location.reload(); // 새로고침
          }, 500);
        }
      })
      .catch((err) => {
        toast('댓글 삭제에 실패하였습니다. 😓');
      });
    }
  };

  return (
    <div>
      <div>
        <div style={{ height: 'auto', background: '#ffffff' }}>
          <div style={{ display: 'flex', marginBottom: '5px', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size='30' round={true} src={props.comment.author.photoURL} style={{ border: '1px solid #c6c6c6' }} />
              <p style={{ margin: 0, marginLeft: '10px', fontSize: '12px', fontWeight: 'bold', color: 'darkgray' }}>{props.comment.author.displayName}</p>
            </div>
            {/* 해당 댓글의 작성자만 수정, 삭제 가능하도록 */}
            {
              props.comment.author.uid === user.uid &&
              (
                <div style={{ cursor: 'pointer', 'position': 'relative' }}>
                  <span style={{ userSelect: 'none', fontSize: '1.5rem', lineHeight: '1rem' }} onClick={() => setModalFlag(true)}>···</span>
                  {
                    ModalFlag &&
                    (
                      <div style={{
                        position: 'absolute', top: '20px', right: '10px', width: '80px',
                        height: '60px', overflow: 'hidden', padding: '10px', cursor: 'auto',
                        display: 'flex', flexDirection: 'column', alignContent: 'center',
                        justifyContent: 'space-between', alignItems: 'center',
                        backgroundColor: 'whitesmoke',
                        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.03), 0px 7.5px 6px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px', zIndex: '1', }} ref={ref}>
                          <p style={{ color: 'black', marginBottom: '0px', cursor: 'pointer' }} onClick={() => {setEditFlag(true); setModalFlag(false);}}>수정</p>
                          <p style={{ color: 'red', marginBottom: '0px', cursor: 'pointer' }} onClick={(e) => DeleteHandler(e)}>삭제</p>
                      </div>
                    )
                  }
                </div>
              )
            }
          </div>
          {
            EditFlag ?
            (<>
              <form method="post">
                <InputGroup className="mb-3">
                  <Form.Control type='text' value={Comment} placeholder="댓글을 남겨보세요." style={{ border: '1px solid black' }} className='shadow-none' onChange={(e) => setComment(e.target.value)} />
                  <Button variant="outline-secondary" onClick={(e) => SubmitHandler(e)} >등록</Button>
                </InputGroup>
              </form>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="secondary" size="sm" onClick={(e) => {e.preventDefault(); setEditFlag(false);}}>수정 취소</Button>
              </div>
            </>)
            :
            (<p>{props.comment.comment}<hr /></p>)
          }
        </div>
      </div>
    </div>
  );
}

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if ( !ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default CommentContent;