import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    displayName: '',
    uid: '',
    accessToken: '', // 사용자 로그인 여부 추적 (개인 인증 토큰)
    photoURL: '',
    isLoading: false, // reducer에서 데이터를 가져오는데 걸리는 시간 체크용 (데이터를 가져오는데 약간의 시간 지연 발생)
  },
  reducers: {
    loginUser: (state, action) => { // 유저가 로그인 하였을 때 (initialState의 값들을 채워줌)
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
      state.photoURL = action.payload.photoURL;
      state.isLoading = true; // reducer에서 데이터를 가져오는데 걸리는 시간 체크용 (데이터를 가져오는데 약간의 시간 지연 발생)
    },
    clearUser: (state) => { // 유저가 로그아웃 하였을 때 (initialState의 값들을 비워줌)
      state.displayName = '';
      state.uid = '';
      state.accessToken = '';
      state.isLoading = true; // reducer에서 데이터를 가져오는데 걸리는 시간 체크용 (데이터를 가져오는데 약간의 시간 지연 발생)
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;