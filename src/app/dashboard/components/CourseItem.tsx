/** @format */

import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import type { CourseType } from '../../../types/courses';
import { useAppDispatch } from '../../../lib/hooks';
import { selectCourse } from '../../../lib/slices/courseSlice';
import { truncate } from 'lodash';
import BuyButton from './BuyButton';

interface CourseItemProps {
  course: CourseType;
}

const CourseItem = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const { id, description, price, title, imageURL } = course;

  useEffect(() => {
    if (!imageURL) return;
    const img = new Image();
    img.src = imageURL;

    img.onload = () => {
      setLoaded(true);
      setError(false);
    };

    img.onerror = () => {
      setError(true);
      setLoaded(false);
    };
  }, [imageURL]);

  const onDetailsOpen = () => {
    dispatch(selectCourse(course));
  };

  return (
    <Grid
      onClick={onDetailsOpen}
      size={{
        xs: 12,
        md: 5,
      }}
      className='shadow-sm shadow-gray-400-300 cursor-pointer rounded-lg bg-amber-50'
    >
      <Box className='h-[300px] relative'>
        {!error ? (
          <img
            src={imageURL}
            alt='Course image'
            className={`rounded-t-lg absolute inset-0 w-full h-full object-cover ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <Box className='rounded-t-lg w-full h-full flex items-center justify-center bg-gray-200 '>
            Couldn't load image
          </Box>
        )}
        {!loaded && !error && (
          <Box className='rounded-t-lg absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500'>
            Loading...
          </Box>
        )}
      </Box>

      <Box className='p-5 '>
        <Box className='flex justify-between items-center'>
          <Typography variant='h6'>{title}</Typography>
          <Box>{price} $</Box>
        </Box>
        <Typography variant='caption' className='text-green-500'>
          Get {Math.floor(price * 5)} coins on purchase
        </Typography>
        <Typography variant='body2'>{truncate(description, { length: 100 })}</Typography>

        <Box className='mt-5'>
          <BuyButton id={id} />
        </Box>
      </Box>
    </Grid>
  );
};

export default CourseItem;
