import React, { useState, useEffect } from 'react';
import axios from 'axios';

function List(props) {
  const [Text, setText] = useState('');

  useEffect(() => {
    let body = {
      text: 'Hello',
    };

    axios.post('/api/test', body)
      .then((response) => {
        console.log(response);
        setText(response.data.text);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>List!</h3>
      <h3>{Text}</h3>
      {
        props.ContentList.map((content, idx) => {
          return (
            <div key={idx} style={{ width: '100%', marginLeft: '1rem' }}>
              내용 : {content}
              <hr />
            </div>
          );
        })
      }
    </div>
  );
}

export default List;