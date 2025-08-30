/** @format */

import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import type { CourseType } from '../../types/courses';
import '../../../index.css';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectCourse, setBoughtCourse } from '../../lib/slices/courseSlice';
import { toast } from 'react-toastify';

interface CourseItemProps {
  course: CourseType;
}

const CourseItem = ({ course }: CourseItemProps) => {
  const dispatch = useAppDispatch();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const boughtCourses: string[] = useAppSelector((state) => state.course.boughtCourses);

  const { id, description, price, title, imageURL } = course;
  const isCourseBought = !boughtCourses.every((courseId) => courseId !== id);

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

  const imitatePayment = new Promise<{ message: string }>((resolve, reject) => {
    const sleep = 3000;
    setTimeout(() => {
      const random = Math.random() * 100;
      if (random > 50) {
        reject(new Error('Payment failed'));
      } else {
        resolve({ message: 'Congratulations! Course successfully bought' });
      }
    }, sleep);
  });

  const onDetailsOpen = () => {
    dispatch(selectCourse(course));
  };

  const onBuyClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setLoadingPayment(true);
    try {
      const result = await imitatePayment;
      dispatch(setBoughtCourse(id));
      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error('Oops. Something went wrong');
    } finally {
      setLoadingPayment(false);
    }
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
            alt=''
            className={`rounded-t-lg absolute inset-0 w-full h-full object-cover ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <Box className='rounded-t-lg w-full h-full flex items-center justify-center bg-gray-200 text-red-500'>
            Oops! Something went wrong.
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
        <Typography variant='body2'>{description}</Typography>

        <Box className='mt-5'>
          {isCourseBought ? (
            <Typography className='bg-gray-300 p-2 text-center'>You already purchased this course</Typography>
          ) : (
            <Button fullWidth color='secondary' variant='contained' onClick={onBuyClick} loading={loadingPayment}>
              Purchase
            </Button>
          )}
        </Box>
      </Box>
    </Grid>
  );
};

export default CourseItem;
