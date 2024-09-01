const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: String, // 댓글의 내용
  author: {
    // 만약 _id가 1인 유저가 들어오면, 그 유저의 userNum, displayName, email, uid가 들어옴
    type: mongoose.Schema.Types.ObjectId, // _id:ObjectId('1a2b3c4d5e')
    ref: 'User', // 어떤 모델의 ObjectId인지, 흡사 관계형 DB의 외래키 역할인거 같음
  },
  postId: { // 댓글이 어떤 게시글에 속해 있는지 알기 위함
    type: mongoose.Schema.Types.ObjectId, // _id:ObjectId('1a2b3c4d5e')
    // ref를 설정해 주지 않는 이유 : 단순히 어떤 post에 등록되어 있는지만 확인하기 위함, Comment에서 post정보를 가져올 필요가 없음
  },
}, { collection: 'comments' });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };