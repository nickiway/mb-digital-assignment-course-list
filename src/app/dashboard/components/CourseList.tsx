/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../../constants';

import { Box, CircularProgress, Grid } from '@mui/material';
import type { CourseType } from '../../../types/courses';
import CourseItem from './CourseItem';
import CourseDetailDialogProps from './CourseDetailDialogProps';

const CourseList = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URL}/courses`);
        setCourses(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isLoading) {
    return (
      <Box className='flex justify-center'>
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <>
      <Grid container gap={2} justifyContent={'center'}>
        {courses.map((course: CourseType) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </Grid>

      <CourseDetailDialogProps />
    </>
  );
};

export default CourseList;
