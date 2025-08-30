/** @format */

import { Button, Grid, Typography } from '@mui/material';
import type { CourseType } from '../../types/courses';
import '../../../index.css';

interface CourseItemProps {
  course: CourseType;
  onOpenVideo: (url: string) => void;
}

const CourseItem = ({ course, onOpenVideo }: CourseItemProps) => {
  const { description, price, title } = course;

  return (
    <Grid
      onClick={() => {
        onOpenVideo(course.videoURL);
      }}
      size={{
        xs: 12,
        md: 5,
      }}
      className='shadow-sm shadow-black p-5 rounded-xl cursor-pointer hover:shadow-xl hover:shadow-blue-300 transition-all ease-in-out'
    >
      <Typography variant='h5'>{title}</Typography>
      <Typography variant='body1'>{description}</Typography>
      <Typography>{price}</Typography>
      <Button>Buy</Button>
    </Grid>
  );
};

export default CourseItem;
