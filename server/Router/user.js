const express = require('express');
const router = express.Router();

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

module.exports = router;