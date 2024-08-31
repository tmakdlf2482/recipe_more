const express = require('express');
const router = express.Router();
const multer  = require('multer');

const { Post } = require('../Model/Post.js');
const { Counter } = require('../Model/Counter.js');

const setUpload = require('../Util/upload.js');

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
    image: req.body.image,
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

// 이미지 업로드 부분
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/') // 어떤 경로로 저장할지 지정 (image 폴더 안에 저장)
  },
  filename: function (req, file, cb) {
    // 어떤 이름으로 저장할지 지정
    cb(null, Date.now() + '-' + file.originalname) // Date.now()는 현재 시간을 ms초로 환산한 값
  },
});

const upload = multer({ storage: storage }).single('file'); // 파일을 1개만 저장

router.post('/image/upload', (req, res) => {
  // console.log(req.body, req.formData);
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    }
    else {
      // console.log(res.req.file);
      res.status(200).json({ success: true, filePath: res.req.file.path }); // 저장한 이미지의 경로를 다시 클라이언트에 전송
    }
  });
});
*/

// 이미지를 올리는 과정은 setUpload() 를 통해 진행됨, setUpload(여기에 네이버 클라우드 오브젝트 스토리지 버킷이름)
router.post('/image/upload', setUpload('react-recipe/post'), (req, res, next) => {
  // console.log(res.req);
  // console.log(res.req.file.location);
  res.status(200).json({ success: true, filePath: res.req.file.location }); // 저장한 이미지의 경로를 다시 클라이언트에 전송
});

module.exports = router;