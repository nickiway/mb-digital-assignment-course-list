/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CourseType } from '../../types/courses';

interface CoursesState {
  boughtCourses: CourseType[];
}

const initialState = {
  boughtCourses: [],
} satisfies CoursesState as CoursesState;

export const coursesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<CourseType>) => {},
  },
});

export const { addCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
