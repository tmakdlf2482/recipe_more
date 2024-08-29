const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// express에서 static으로 활용할 폴더 지정
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Post } = require('./Model/Post.js');

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

app.post('/api/post/submit', (req, res) => {
  let temp = req.body;

  const RecipePost = new Post(temp);
  
  RecipePost.save()
  .then(() => {
    res.status(200).json({success: true});
  })
  .catch((err) => {
    res.status(400).json({success: false});
  });
});

app.post('/api/post/list', (req, res) => {
  Post.find().exec()
  .then((doc) => {
    res.status(200).json({success: true, postList: doc});
  })
  .catch((err) => {
    res.status(400).json({success: false});
  });
});