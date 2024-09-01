import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import '../../Style/List.css';
import Avatar from 'react-avatar';
import moment from 'moment';
import 'moment/locale/ko'; // 한국 지역으로 설정

function List(props) {
  const SetTime = (a, b) => { // a는 createdAt, b는 updatedAt
    if (a !== b) {
      return moment(b).format('YYYY.M.D. hh:mm') + '(수정됨)';
    }
    else {
      return moment(a).format('YYYY.M.D. hh:mm');
    }
  }

  return (
    <div className='container' style={{ padding: '0' }}>
      {
        // PostList에는 {_id: '', title: '', content: '', postNum: 1, __v: 0} 들어가 있음
        props.PostList.map((post, idx) => {
          // console.log(post);
          return (
            <div key={idx}>
              <ListGroup style={{
                width: '100%',
                height: 'auto',
                minHeight: '120px',
                marginTop: '1vh',
                marginBottom: '1vh',
                padding: '20px',
                boxShadow: '0px 19px 38px rgba(0, 0, 0, 0.03), 0px 15px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'}} className='list-group'>
                <Link to={`/post/${post.postNum}`} style={{color: 'black', textDecoration: 'none'}}>
                  <ListGroup.Item style={{ border: 'none', }}>
                    <p style={{ fontWeight: 'bold' }}>{post.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar size='40' round={true} src={post.author.photoURL} style={{ border: '1px solid #c6c6c6', marginRight: '10px' }} />
                      <p style={{ color: 'darkgray', margin: '0px' }}>{post.author.displayName}</p>
                    </div>
                    <div style={{ color: 'darkgray', marginBottom: '0px', fontSize: '10px' }}>
                      <p>{SetTime(post.createdAt, post.updatedAt)}</p>
                    </div>
                    <p style={{ margin: '10px 0px' }}>{post.content}</p>
                  </ListGroup.Item>
                </Link>
              </ListGroup>
            </div>
          );
        })
      }
    </div>
  );
}

export default List;