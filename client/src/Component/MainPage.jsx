import React, { useState, useEffect } from 'react';
import List from './Post/List';
import axios from 'axios';

function MainPage() {
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
    <div>
      <List PostList={PostList} />
    </div>
  );
}

export default MainPage;