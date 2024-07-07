import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import journalReducer from './journalSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
