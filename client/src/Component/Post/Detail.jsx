import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams는 http://localhost:5173/post/1의 경우 1을 들고옴
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

function Detail() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

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

  useEffect(() => {
    console.log(PostInfo);
  }, [PostInfo]);
  
  return (
    <div className='container'>
      <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            {
              Flag ?
              (
                <>
                  <div style={{ height: 'auto', background: '#ffffff', padding: '30px 20px', boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1)' }}>
                    <h1 style={{ fontWeight: 'bold' }}>{PostInfo.title}</h1>
                    <p style={{ marginBottom: '0px' }}>{PostInfo.content}</p>
                  </div>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '20px 0'}}>
                    <Button variant="primary" size="sm">수정</Button>
                    <Button variant="danger" size="sm" style={{ marginLeft: '10px' }}>삭제</Button>
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