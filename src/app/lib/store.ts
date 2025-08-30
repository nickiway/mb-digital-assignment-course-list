/** @format */

import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import videoReducer from './slices/videoSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
