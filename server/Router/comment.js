const express = require('express');
const router = express.Router();

const { Post } = require('../Model/Post.js');
const { User } = require('../Model/User.js');
const { Comment } = require('../Model/Comment.js');

router.post('/submit', (req, res) => {
  let temp = {
    comment: req.body.comment,
    postId: req.body.postId,
  };

  User.findOne({ uid: req.body.uid }).exec()
  .then((userInfo) => {
    temp.author = userInfo._id; // temp에는 _id: ObjectId('1a2b3c4d5e'), comment: '댓글내용', author: ObjectId('댓글을 쓴 유저의_id값'), postId: ObjectId('댓글을 쓴 게시글의_id값') 이런식으로 저장됨

    const NewComment = new Comment(temp);
    NewComment.save()
    .then(() => {
      Post.findOneAndUpdate({ _id: req.body.postId }, { $inc: { commentNum: 1 } })
      .then(() => {
        return res.status(200).json({success: true});
      });
    });
  })
  .catch(() => {
    res.status(400).json({ success: false });
  });
});

module.exports = router;