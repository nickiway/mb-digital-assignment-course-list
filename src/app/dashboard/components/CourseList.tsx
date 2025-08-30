/** @format */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';

import { Grid } from '@mui/material';
import type { CourseType } from '../../types/courses';
import CourseItem from './CourseItem';
import VideoDialog from './VideoDialog';
import { useAppDispatch } from '../../lib/hooks';
import { resetVideo, setVideoUrl } from '../../lib/slices/videoSlice';

const CourseList = () => {
  const dispatch = useAppDispatch();
  const [courses, setCourses] = useState<CourseType[]>([]);

  const onOpenVideo = (url: string) => {
    dispatch(setVideoUrl(url));
  };

  const onCloseVideo = () => {
    dispatch(resetVideo());
  };

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
          <CourseItem key={course.id} course={course} onOpenVideo={onOpenVideo} />
        ))}
      </Grid>

      <VideoDialog onCloseVideo={onCloseVideo} />
    </>
  );
};

export default CourseList;
