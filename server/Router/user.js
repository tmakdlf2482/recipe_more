const express = require('express');
const router = express.Router();

const setUpload = require('../Util/upload.js');
const { User } = require('../Model/User.js');
const { Counter } = require('../Model/Counter.js');

router.post('/register', (req, res) => {
  // console.log(req.body);
  let temp = req.body;

  Counter.findOne({ name: 'counter' }).exec()
  .then((doc) => {
    temp.userNum = doc.userNum;

    const UserData = new User(req.body);
    UserData.save()
    .then(() => {
      Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1} })
      .then(() => {
        res.status(200).json({ success: true });
      });
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({ success: false });
  });
});

router.post('/nameCheck', (req, res) => {
  User.findOne({ displayName: req.body.displayName }).exec()
  .then((doc) => {
    let check = true;
    
    if (doc) {
      check = false; // 닉네임이 중복되면 false
    }

    // console.log(check);

    res.status(200).json({ success: true , check });
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json({ success: false });
  });
});

router.post('/profile/img', setUpload('react-recipe/user'), (req, res, next) => {
  // console.log(res.req);
  // console.log(res.req.file.location);
  res.status(200).json({ success: true, filePath: res.req.file.location }); // 저장한 이미지의 경로를 다시 클라이언트에 전송
});

router.post('/profile/update', (req, res) => {
  let temp = {
    photoURL: req.body.photoURL,
  };

  User.updateOne({ uid: req.body.uid }, { $set: temp }).exec() // Number()는 parseInt와 동일, String을 Number로 바꿔줌
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(() => {
      res.status(400).json({ success: false });
    });
});

module.exports = router;