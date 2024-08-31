import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import axios from 'axios';

function List() {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    axios.post('/api/post/list')
    .then((response) => {
      if (response.data.success) {
        setPostList([...response.data.postList]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div className='container'>
      <>{/* 이 부분 이미지 슬라이더 들어감 */}</>
      
      <>
        {
          // PostList에는 {_id: '', title: '', content: '', postNum: 1, __v: 0} 들어가 있음
          PostList.map((post, idx) => {
            return (
              <ListGroup style={{
                  width: '100%',
                  height: 'auto',
                  minHeight: '120px',
                  marginTop: '1vh',
                  marginBottom: '1vh',
                  padding: '20px',
                  boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1)',
                }} key={idx}>
                  <ListGroup.Item style={{ border: 'none', }}>
                    <Link to={`/post/${post.postNum}`} style={{color: 'black', textDecoration: 'none'}}>
                      <p style={{ fontWeight: 'bold' }}>{post.title}</p>
                      <p>{post.content}</p>
                    </Link>
                  </ListGroup.Item>
              </ListGroup>
            );
          })
        }
      </>
    </div>
  );
}

export default List;