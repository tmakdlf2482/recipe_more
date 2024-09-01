import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentContent from './CommentContent';

function CommentList(props) {
  const [CommentList, setCommentList] = useState([]);

  let body = {
    postId: props.postId,
  };

  useEffect(() => {
    // console.log(props.postId);

    axios.post('/api/comment/getComment', body)
      .then((response) => {
        if (response.data.success) {
          setCommentList([...response.data.commentList]);
        }
      });
  }, []);

  return (
    <div className='container' style={{ marginTop: '1rem' }}>
      {
        CommentList.map((comment, idx) => {
          return (
            <CommentContent comment={comment} key={idx} PostInfo={props.PostInfo} />
          )
        })
      }
    </div>
  );
}

export default CommentList;