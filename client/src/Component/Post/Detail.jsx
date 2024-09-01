import React from 'react';
import { useParams } from 'react-router-dom'; // useParams는 http://localhost:5173/post/1의 경우 1을 들고옴
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import axios from 'axios';

toastConfig (
  { theme: 'dark' }
)

function Detail(props) {
  let navigate = useNavigate();
  let params = useParams(); // params 출력 결과는 {postNum: '1'}

  // 현재 어떤 사용자가 접속했는지 추적
  // 만약 현재 접속한 사용자의 uid와 해당 글의 author에 저장된 uid가 같다면 수정, 삭제 기능이 가능
  const user = useSelector(state => state.user); 

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
  
  return (
    <div className='container'>
      <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div style={{ height: 'auto', background: '#ffffff', padding: '30px 20px', boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1)' }}>
          <h1 style={{ fontWeight: 'bold' }}>{props.PostInfo.title}</h1>
          <p style={{ color: 'darkgray' }}>{props.PostInfo.author.displayName}</p>
          {/* 사용자가 이미지를 업로드 할수도 있고 안할수도 있으니, 이미지가 있는지 체크 */}
          {
            props.PostInfo.image ?
            (<img src={props.PostInfo.image} alt="" style={{ width: '230px', height: '230px' }} />)
            :
            (null)
          }
          <p style={{ marginBottom: '0px' }}>{props.PostInfo.content}</p>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '20px 0'}}>
          {
            user.uid === props.PostInfo.author.uid && // firebase에 접속한 사용자 uid와 해당 글의 작성자 uid가 같다면 수정, 삭제 가능함
            <>
              <Link to={`/edit/${props.PostInfo.postNum}`}>
                <Button variant="primary" size="sm">수정</Button>
              </Link>
              <Button variant="danger" size="sm" style={{ marginLeft: '10px' }} onClick={() => {DeleteHandler()}}>삭제</Button>
            </>
          }                
        </div>
      </div>
    </div>
  );
}

export default Detail;