import React from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function ImageUpload(props) {
  /*
  1. 사용자가 이미지를 업로드
  2. 업로드 한 이미지를 받아서 서버에 저장
  3. 저장한 이미지의 경로를 다시 클라이언트에 전송
  4. 경로를 받아서 post model에 저장
  */

  const FileUpload = (e) => {
    // console.log(e.target.files);
    const formData = new FormData();
    formData.append('file', (e.target.files[0])); // file이라는 이름으로, e.target.files[0]는 e.target.files의 첫번째 원소(여기에 이미지에 대한 정보가 들어있음)
    // for (const keyValue of formData) console.log(keyValue); // formData에 0: 'file' 1: File { name: "ScreenShot2024_0421_172802267.jpg", size: 377622, type: "image/jpeg" } 이런식으로 저장됨

    axios.post('/api/post/image/upload', formData)
    .then((response) => {
      // console.log(response.data);
      props.setImage(response.data.filePath); // 경로를 받아서 post model에 저장하기 위해 Upload 컴포넌트에 filePath를 props로 넘김
    });
  };

  return (
    <div>
      <Form.Control type='file' className='shadow-none' accept='image/*' onChange={(e) => FileUpload(e)} />
    </div>
  );
}

export default ImageUpload;