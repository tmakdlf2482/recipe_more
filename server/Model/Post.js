const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String, // 글의 제목
  content: String, // 글의 내용
  postNum: Number, // 글의 고유번호
  image: String, // 글의 이미지 경로
  author: {
    // 만약 _id가 1인 유저가 들어오면, 그 유저의 userNum, displayName, email, uid가 들어옴
    type: mongoose.Schema.Types.ObjectId, // _id:ObjectId('1a2b3c4d5e')
    ref: 'User', // 어떤 모델의 ObjectId인지, 흡사 관계형 DB의 외래키 역할인거 같음
  },
}, { collection: 'posts' });

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };