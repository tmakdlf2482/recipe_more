// 네이버 클라우드에 파일 업로드
// 네이버 클라우드에 파일 업로드할때는 기존의 multer를 그대로 사용
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const config = require('../config/key.js');

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : config.access_key,
        secretAccessKey: config.secret_key,
    },
});

function setUpload(bucket) { // bucket : 저장시킬 파일 경로
  const upload = multer({
    storage: multerS3({
      s3: S3,
      bucket: bucket,
      acl: 'public-read-write', // multer를 통해 업로드되는 파일이나 이미지를 누가 접근할 수 있게 할 것인지 보안 규칙 설정 (누구나 읽고 쓰기 가능)
      key: function (req, file, cb) { // multer를 통해 업로드되는 모든 파일은 고유의 key 가 필요
        let extension = path.extname(file.originalname); // 주어진 파일의 확장자 명을 제거하고 이름만 온전히 남김
        cb(null, Date.now().toString() + extension); // 업로드시간+파일이름
      },
    }),
  }).single('file');

  return upload;
}

module.exports = setUpload;