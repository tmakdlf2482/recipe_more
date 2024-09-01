import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    displayName: '',
    uid: '',
    accessToken: '', // 사용자 로그인 여부 추적 (개인 인증 토큰)
  },
  reducers: {
    loginUser: (state, action) => { // 유저가 로그인 하였을 때 (initialState의 값들을 채워줌)
      state.displayName = action.payload.displayName;
      state.uid = action.payload.uid;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => { // 유저가 로그아웃 하였을 때 (initialState의 값들을 비워줌)
      state.displayName = '';
      state.uid = '';
      state.accessToken = '';
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;