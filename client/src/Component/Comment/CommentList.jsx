import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      {
        CommentList.map((comment, idx) => {
          return <div key={idx}>{comment.comment}</div>
        })
      }
    </div>
  );
}

export default CommentList;