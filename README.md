# Recipe 더 주떼연~

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
11. React 중앙집중식 상태관리 라이브러리 Redux 설치 : `npm install redux` <br />

## 기능
1. 레시피 글 쓰기
2. 레시피 글 읽기
3. 레시피 글 수정
4. 레시피 글 삭제
5. 레시피 댓글 쓰기
6. 레시피 댓글 읽기
7. 레시피 댓글 수정
8. 레시피 댓글 삭제
9. 댓글 정렬
10. 프로필 사진 변경

## DB 모델
1. 레시피 글 모델[/Model/Post.js] : title(글 제목), content(글 내용), postNum(글 고유번호)
2. 레시피 글 각각에 부여될 번호 모델[/Model/Counter.js] : name(document를 추적하기 위함), postNum(각각의 글에 부여될 숫자)

## 외부 라이브러리
1. 네이버 클라우드 사진 업로드

## 프로젝트 하는데 큰 도움받은 공식 문서들
1. React Router : `https://reactrouter.com/en/main` <br />
2. express : `https://expressjs.com/` <br />
3. mongoose : `https://mongoosejs.com/` <br /> 
4. axios : `https://axios-http.com/kr/docs/intro` <br />
5. react bootstrap : `https://react-bootstrap.netlify.app/` <br />