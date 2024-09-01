import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams는 http://localhost:5173/post/1의 경우 1을 들고옴
import { Spinner } from 'react-bootstrap';
import Detail from './Detail';
import axios from 'axios';
import CommentArea from '../Comment/CommentArea';

function PostArea() {
  const [PostInfo, setPostInfo] = useState({});
  const [Flag, setFlag] = useState(false);

  let params = useParams();

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

  return (
    <div>
      {
        Flag ?
        (<>
            <Detail PostInfo={PostInfo} />
            <CommentArea postId={PostInfo._id} PostInfo={PostInfo} />
          </>)
        :
        (<Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>)
      }
    </div>
  );
}

export default PostArea;