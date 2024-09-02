import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // useParams는 http://localhost:5173/post/1의 경우 1을 들고옴
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import Avatar from 'react-avatar';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko'; // 한국 지역으로 설정

toastConfig (
  { theme: 'dark' }
)

function Detail(props) {
  const [Show, setShow] = useState(false); // 글 요약 모달 창 state
  const [SummaryTxt, setSummaryTxt] = useState(''); // 요약된 글이 담길 곳

  let navigate = useNavigate();
  let params = useParams(); // params 출력 결과는 {postNum: '1'}

  // 현재 어떤 사용자가 접속했는지 추적
  // 만약 현재 접속한 사용자의 uid와 해당 글의 author에 저장된 uid가 같다면 수정, 삭제 기능이 가능
  const user = useSelector(state => state.user);

  const SetTime = (a, b) => { // a는 createdAt, b는 updatedAt
    if (a !== b) {
      return moment(b).format('YYYY.M.D. hh:mm') + '(수정됨)';
    }
    else {
      return moment(a).format('YYYY.M.D. hh:mm');
    }
  }

  const DeleteHandler = () => {
    // 정말 삭제하시겠습니까? 메시지 창
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      let body = {
        postNum: params.postNum,
      };
  
      axios.post('/api/post/delete', body)
      .then((response) => {
        if (response.data.success) {
          toast('게시글이 삭제되었습니다. 😊');
          navigate('/');
        }
      })
      .catch((err) => {
        toast('게시글이 삭제에 실패하였습니다. 😓');
      });
    }
  };

  const handleClose = () => setShow(false); // 모달 창 닫을 때
  const handleShow = () => setShow(true); // 모달 창 열때

  // 요약 API
  const SummaryHandle = () => {
    let body = {
      content: props.PostInfo.content,
    };

    axios.post('/api/post/summary', body)
    .then((response) => {
      // console.log(response.data.summary.summary);

      setSummaryTxt(response.data.summary.summary);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  // 클립보드에 저장
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast('클립보드에 저장되었습니다. 😊')
    }
    catch(e) {
      toast('클립보드 저장에 실패하였습니다. 😓')
    }
  };
  
  return (
    <div className='container'>
      <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div style={{ height: 'auto', background: '#ffffff', padding: '30px 20px', boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontWeight: 'bold' }}>{props.PostInfo.title}</h1>
          <p style={{ color: 'darkgray' }}>
            <Avatar size='40' round={true} src={props.PostInfo.author.photoURL} style={{ border: '1px solid #c6c6c6', marginRight: '10px' }} />
            {props.PostInfo.author.displayName}
            <p style={{ fontSize: '10px' }}>
              {SetTime(props.PostInfo.createdAt, props.PostInfo.updatedAt)}
            </p>
          </p>
          {/* 사용자가 이미지를 업로드 할수도 있고 안할수도 있으니, 이미지가 있는지 체크 */}
          {
            props.PostInfo.image ?
            (<img src={props.PostInfo.image} alt="" style={{ width: '230px', height: '230px' }} />)
            :
            (null)
          }
          <p style={{ marginBottom: '0px' }}>{props.PostInfo.content}</p>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '20px 0px'}}>
          {
            user.uid === props.PostInfo.author.uid ? // firebase에 접속한 사용자 uid와 해당 글의 작성자 uid가 같다면 수정, 삭제 가능함
            (<>
              <Button variant="success" size="sm" onClick={() => {handleShow(); SummaryHandle();}}>요약</Button>

              <Modal show={Show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>이 글 요약하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>{SummaryTxt}</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => {handleCopyClipBoard(SummaryTxt)}}>클립보드에 저장하기</Button>
                  <Button variant="secondary" onClick={handleClose}>닫기</Button>
                </Modal.Footer>
              </Modal>

              <Link to={`/edit/${props.PostInfo.postNum}`} style={{ marginLeft: '10px' }}>
                <Button variant="primary" size="sm">수정</Button>
              </Link>
              <Button variant="danger" size="sm" style={{ marginLeft: '10px' }} onClick={() => {DeleteHandler()}}>삭제</Button>
            </>)
            :
            (<>
              <Button variant="success" size="sm" onClick={() => {handleShow(); SummaryHandle();}}>요약</Button>

              <Modal show={Show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>이 글 요약하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>{SummaryTxt}</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={() => {handleCopyClipBoard(SummaryTxt)}}>클립보드에 저장하기</Button>
                  <Button variant="secondary" onClick={handleClose}>닫기</Button>
                </Modal.Footer>
              </Modal>
            </>)
          }
        </div>
      </div>
    </div>
  );
}

export default Detail;