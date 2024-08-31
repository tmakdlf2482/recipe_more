const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// express에서 static으로 활용할 폴더 지정
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우팅한 파일 사용하기
app.use('/api/post', require('./Router/post.js')); // post.js에서 공통적으로 적용되는 라우팅 규칙을 빼줌

// 서버 연결
app.listen(port, () => {
  // mongoose에 mongodb atlas의 나의 몽고db와 연결
  mongoose.connect('mongodb+srv://admin:ekfdls1!8@reactcommunity.02w4ilq.mongodb.net/Recipe?retryWrites=true&w=majority&appName=reactcommunity')
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