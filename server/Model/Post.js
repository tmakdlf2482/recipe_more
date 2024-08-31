const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String, // 글의 제목
  content: String, // 글의 내용
  postNum: Number, // 글의 고유번호
  image: String, // 글의 이미지 경로
}, { collection: 'posts' });

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };