import { configureStore } from '@reduxjs/toolkit';
import targetReducer from '../redux/slice';

export const store = configureStore({
  reducer: {
    target: targetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
