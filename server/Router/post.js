const express = require('express');
const router = express.Router();

const { Post } = require('../Model/Post.js');
const { Counter } = require('../Model/Counter.js');

router.post('/submit', (req, res) => {
  let temp = req.body; // 글의 제목, 내용이 넘어옴

  Counter.findOne({ name: 'counter' }).exec()
  .then((counter) => {
    temp.postNum = counter.postNum; // temp.postNum은 mongodb의 postNum
    
    const RecipePost = new Post(temp); // temp는 { title: '', content: '', postNum: 1 } 이런식으로 저장됨
    RecipePost.save()
    .then(() => {
      Counter.updateOne({ name: 'counter' }, { $inc: { postNum: 1 } })
      .then(() => {
        res.status(200).json({ success: true });
      });
    });
  })
  .catch(() => {
    res.status(400).json({ success: false });
  });
});

router.post('/list', (req, res) => {
  Post.find().exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

router.post('/detail', (req, res) => {
  Post.findOne({ postNum: Number(req.body.postNum) }).exec() // Number()는 parseInt와 동일, String을 Number로 바꿔줌
    .then((doc) => {
      // console.log(doc);
      res.status(200).json({ success: true, post: doc });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

router.post('/edit', (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
  };

  // $set: { plot: `A harvest of random numbers, such as: ${Math.random()}` }, 공식 문서 예시, temp가 어차피 object 타입이니까
  Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp }).exec() // Number()는 parseInt와 동일, String을 Number로 바꿔줌
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

router.post('/delete', (req, res) => {
  Post.deleteOne({ postNum: Number(req.body.postNum) }).exec() // Number()는 parseInt와 동일, String을 Number로 바꿔줌
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;