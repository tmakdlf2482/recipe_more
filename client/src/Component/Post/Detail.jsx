import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams는 http://localhost:5173/post/1의 경우 1을 들고옴
import { Link, useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'react-bootstrap';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';
import axios from 'axios';

toastConfig (
  { theme: 'dark' }
)

function Detail() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  let navigate = useNavigate();
  let params = useParams(); // params 출력 결과는 {postNum: '1'}

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };

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

  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo]);

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
        {
          Flag ?
          (
            <>
              <div style={{ height: 'auto', background: '#ffffff', padding: '30px 20px', boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ fontWeight: 'bold' }}>{PostInfo.title}</h1>
                {/* 사용자가 이미지를 업로드 할수도 있고 안할수도 있으니, 이미지가 있는지 체크 */}
                {
                  PostInfo.image ?
                  (<img src={`http://localhost:3000/${PostInfo.image}`} alt="" style={{ width: '100%', height: 'auto' }} />)
                  :
                  (null)
                }
                <p style={{ marginBottom: '0px' }}>{PostInfo.content}</p>
              </div>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '20px 0'}}>
                <Link to={`/edit/${PostInfo.postNum}`}>
                  <Button variant="primary" size="sm">수정</Button>
                </Link>
                <Button variant="danger" size="sm" style={{ marginLeft: '10px' }} onClick={() => {DeleteHandler()}}>삭제</Button>
              </div>
            </>
          )
          :
          (<Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>)
        }
      </div>
    </div>
  );
}

export default Detail;