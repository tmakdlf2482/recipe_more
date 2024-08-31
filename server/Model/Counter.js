const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: String, // document를 추적하기 위함
  postNum: Number, // 각각의 글에 부여될 숫자
  userNum: Number, // 각각의 사용자들에게 부여될 숫자
}, { collection: 'counter' });

const Counter = mongoose.model('Counter', counterSchema);

module.exports = { Counter };