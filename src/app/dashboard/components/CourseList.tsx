/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';

import { Grid } from '@mui/material';
import type { CourseType } from '../../types/courses';
import CourseItem from './CourseItem';
import CourseDetailDialogProps from './CourseDetailDialogProps';

const CourseList = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get(`${API_URL}/courses`);
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Grid container gap={2}>
        {courses.map((course: CourseType) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </Grid>

      <CourseDetailDialogProps />
    </>
  );
};

export default CourseList;
