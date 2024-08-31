const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config/key.js');

const app = express();
const port = 3000;

// express에서 static으로 활용할 폴더 지정
app.use(express.static(path.join(__dirname, '../client/dist')));
// express에서 image폴더에 있는 image파일을 사용하기 위한 설정
app.use('/image', express.static('./image'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우팅한 파일 사용하기
app.use('/api/post', require('./Router/post.js')); // '/api/post' : post.js에서 공통적으로 적용되는 라우팅 규칙을 빼줌

// 서버 연결
app.listen(port, () => {
  // mongoose에 mongodb atlas의 나의 몽고db와 연결
  mongoose.connect(config.mongoURI)
    .then(() => {
      console.log(`Server running ... >>> http://localhost:${port}`);
      console.log('Connecting MongoDB...');
    })
    .catch((err) => {
      console.log(`${err}`)
    });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});