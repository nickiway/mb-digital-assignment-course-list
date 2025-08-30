/** @format */

import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/courseSlice';
import videoReducer from './slices/videoSlice';

export const store = configureStore({
  reducer: {
    course: coursesReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
