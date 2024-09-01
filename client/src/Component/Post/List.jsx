import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../Style/ListCSS.css';
import ImageSlider, { Slide } from 'react-auto-image-slider';
import Avatar from 'react-avatar';

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
      {/* 이 부분 이미지 슬라이더 들어감 */}
      <div className='slider-container'>
        <ImageSlider effectDelay={500} autoPlayDelay={2000}>
          <Slide>
            <img src="/food.jpg" alt="food_1" />
          </Slide>
          <Slide>
            <img src="/food_2.png" alt="food_2" />
          </Slide>
          <Slide>
            <img src="/food_3.jpg" alt="food_3" />
          </Slide>
        </ImageSlider>
      </div>
      <>
        {
          // PostList에는 {_id: '', title: '', content: '', postNum: 1, __v: 0} 들어가 있음
          PostList.map((post, idx) => {
            // console.log(post);
            return (
              <div key={idx}>
                <Link to={`/post/${post.postNum}`} style={{color: 'black', textDecoration: 'none'}}>
                  <ListGroup style={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '120px',
                    marginTop: '1vh',
                    marginBottom: '1vh',
                    padding: '20px',
                    boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'}} className='list-group'>
                    <ListGroup.Item style={{ border: 'none', }}>
                      <p style={{ fontWeight: 'bold' }}>{post.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar size='40' round={true} src={post.author.photoURL} style={{ border: '1px solid #c6c6c6', marginRight: '10px' }} />
                        <p style={{ color: 'darkgray', margin: '0px' }}>{post.author.displayName}</p>
                      </div>
                      <p style={{ margin: '10px 0px' }}>{post.content}</p>
                    </ListGroup.Item>
                  </ListGroup>
                </Link>
              </div>
            );
          })
        }
      </>
    </div>
  );
}

export default List;