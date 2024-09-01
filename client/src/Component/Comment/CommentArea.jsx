import React from 'react';
import CommentUpload from './CommentUpload';
import CommentList from './CommentList';
import { useSelector } from 'react-redux';

function CommentArea(props) {
  const user = useSelector(state => state.user);

  return (
    <div>
      {/* 사용자가 로그인하지 않았다면 댓글 등록 창 안보이게 하기 (댓글 리스트는 로그인 안해도 보임) */}
      {
        user.accessToken && <CommentUpload postId={props.postId} />
      }
      <CommentList postId={props.postId} />
    </div>
  );
}

export default CommentArea;