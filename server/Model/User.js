const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userNum: Number, // 사용자의 고유번호
  displayName: String, // 사용자의 이름
  email: String, // 사용자의 이메일
  uid: String, // 사용자의 uid
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = { User };