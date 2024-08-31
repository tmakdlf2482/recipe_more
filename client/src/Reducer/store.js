import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export default configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => // redux-toolkit은 비직렬화 데이터 보내는것을 싫어함 (무시하려고 만든 코드)
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});