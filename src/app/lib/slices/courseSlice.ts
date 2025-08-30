/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CourseType } from '../../types/courses';

interface CoursesState {
  selectedCourse: CourseType | null;
  boughtCourses: CourseType[];
}

const initialState = {
  selectedCourse: null,
  boughtCourses: [],
} satisfies CoursesState as CoursesState;

export const coursesSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    removeSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
    selectCourse: (state, action: PayloadAction<CourseType>) => {
      state.selectedCourse = action.payload;
    },
    setBoughtCourse: (state, action: PayloadAction<CourseType>) => {
      state.boughtCourses.push(action.payload);
    },
  },
});

export const { removeSelectedCourse, selectCourse, setBoughtCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
