# Recipe 더 주세요!

## 개발환경
1. 프로젝트 환경설정(vite를 활용한 React 프로젝트) 설치 : `npm install vite@latest` <br />
2. 라우팅 규칙을 클라이언트에서 정의하기 위해 React Router 설치[클라이언트] : `npm i react-router-dom` <br />
3. express 서버 구축[서버] : `npm i -S express` <br />
4. 서버 폴더의 현재경로(__dirname)와 상대경로를 합쳐주는 라이브러리 설치[서버] : `npm i -S path` <br />
5. 서버 측의 코드 변화가 감지되면 자동으로 껏다 켜졌다 해주는 라이브러리 설치[서버] : `npm i -S nodemon` <br />
6. 몽고db를 효율적으로 관리할 수 있는 라이브러리 설치[서버] : `npm i -S mongoose` <br />
7. 외부 오픈 API 통신을 위한 라이브러리 axios 설치[클라이언트] : `npm i -S axios` <br />
8. 서로 다른 포트 해결(cors)[클라이언트] : `npm i -S http-proxy-middleware` <br />
9. css 프레임워크[클라이언트] : `npm i react-bootstrap bootstrap` <br />
10. React Toast Popup 모듈 설치[클라이언트] : `npm i react-simple-toasts` <br />
11. 이미지 업로드를 위한 라이브러리 설치[서버] : `npm i -S multer` <br />
12. 네이버 클라우드 오브젝트 스토리지에 이미지를 업로드하기 위한 라이브러리 설치[서버] : `npm i -S multer-s3` <br />
13. 네이버 클라우드 오브젝트 스토리지 라이브러리 설치[서버] : `npm i -S aws-sdk@2.348.0` <br />
14. 로그인, 회원가입 페이지 템플릿을 위한 프레임워크 설치[클라이언트] : `npm i mdb-react-ui-kit` <br />
15. firebase 설치[클라이언트] : `npm i firebase` <br />
16. React 중앙집중식 상태관리 라이브러리 Redux toolkit 설치[클라이언트] : `npm install @reduxjs/toolkit react-redux` <br />
17. 자동 이미지 슬라이더 라이브러리 설치[클라이언트] : `npm i react-auto-image-slider` <br />
18. 사용자 프로필 이미지 UI를 위한 라이브러리 설치[클라이언트] : `npm i -S react-avatar` <br />
19. 시간 정보를 나타내기 위한 라이브러리 설치[클라이언트] : `npm i -S moment` <br />

## 기능
1. 로그인
2. 로그아웃
3. 회원가입 (닉네임 중복검사)
4. 레시피 글 쓰기 (이미지 업로드 포함 - 일단 1장만 업로드되게 구현)
5. 레시피 글 읽기
6. 레시피 글 수정 (이미지 업로드 포함 - 일단 1장만 업로드되게 구현)
7. 레시피 글 삭제
8. 레시피 댓글 쓰기
9. 레시피 댓글 읽기
10. 레시피 댓글 수정
11. 레시피 댓글 삭제
12. 레시피 글 정렬
13. 레시피 글 검색 (제목, 내용)
14. 프로필 사진 변경
15. 레시피 글 요약

## DB 모델
1. 레시피 글 모델[/Model/Post.js] : title(글 제목), content(글 내용), postNum(글 고유번호), image(글의 이미지 경로), author(어떤 사용자가 글을 썻는지), commentNum(댓글 갯수)
2. 레시피 글 각각에 부여될 번호 모델[/Model/Counter.js] : name(document를 추적하기 위함), postNum(각각의 글에 부여될 숫자), userNum(각각의 사용자들에게 부여될 숫자)
3. 댓글 모델[/Model/Comment.js] : comment(댓글 내용), author(누가 댓글을 썻는지), postId(댓글이 어떤 게시글에 속해 있는지)
<참고> 외래키 관계 : (1)User.js의 _id가 기본키, Comment.js의 author가 외래키 // (2)Post.js의 _id가 기본키, Comment.js의 postId가 외래키
4. 사용자 모델[/Model/User.js] : userNum(사용자의 고유번호), displayName(사용자의 이름), email(사용자의 이메일), uid(사용자의 uid), photoURL(사용자의 프로필 이미지 URL)
<참고> 외래키 관계 : User.js의 _id가 기본키, Post.js의 author가 외래키

## 외부 API
1. 네이버 클라우드 Object Storage에 사진 업로드 (multer를 이용해 서버에 사진을 계속 저장해두면, 부담이 심해짐) -> Object Storage에 이미지를 업로드하고, Object Storage로부터 URL을 받아서 사용자에게 보여줌
2. 구글 Firebase Authentication (사용자가 아이디, 비밀번호를 입력할 때 비밀번호를 평문 그대로 몽고db에 저장시키면 안됨, 자동으로 암호화 해줌)
3. 네이버 클로바 요약 : 사용자들이 올린 레시피들을 요약해줌

## 프로젝트 하는데 큰 도움받은 공식 문서들
1. React Router : `https://reactrouter.com/en/main` <br />
2. express : `https://expressjs.com/` <br />
3. mongoose : `https://mongoosejs.com/` <br /> 
4. axios : `https://axios-http.com/kr/docs/intro` <br />
5. react bootstrap : `https://react-bootstrap.netlify.app/` <br />
6. multer : `https://github.com/expressjs/multer` <br />
7. multer-s3(for naver cloud) : `https://www.npmjs.com/package/multer-s3` <br />
8. naver cloud object storage : `https://guide.ncloud-docs.com/docs/storage-storage-8-4` <br />
9. login, register form template : `https://mdbootstrap.com/docs/react/extended/login-form/` <br />
10. firebase authentication : `https://firebase.google.com/docs/auth/web/start?hl=ko&_gl=1*rels6p*_up*MQ..*_ga*MTM4MDExMDE2LjE3MjUwOTkzMTg.*_ga_CW55HF8NVT*MTcyNTA5OTMxNy4xLjAuMTcyNTA5OTMxNy4wLjAuMA..` <br />
11. redux toolkit : `https://ko.redux.js.org/introduction/getting-started/` <br />
12. useOnClickOutside hook : `https://designcode.io/react-hooks-handbook-useonclickoutside-hook` <br />
13. react auto image slider : `https://github.com/carsonmj/react-auto-image-slider` <br />
14. momentjs : `https://momentjs.com/` <br />
15. naver clova summary : `https://api.ncloud-docs.com/docs/ai-naver-clovasummary-api` <br />
