/** @format */

import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { toast } from 'react-toastify';
import { setBoughtCourse } from '../../../lib/slices/courseSlice';

interface BuyButtonProps {
  id: string;
}
const BuyButton = ({ id }: BuyButtonProps) => {
  const dispatch = useAppDispatch();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const boughtCourses: string[] = useAppSelector((state) => state.course.boughtCourses);
  const isCourseBought = !boughtCourses.every((courseId) => courseId !== id);

  const imitatePayment = () =>
    new Promise<{ message: string }>((resolve, reject) => {
      const sleep = 1000;
      setTimeout(() => {
        const random = Math.random() * 100;
        if (random > 70) {
          reject(new Error('Payment failed'));
        } else {
          resolve({ message: 'Congratulations! Course successfully bought' });
        }
      }, sleep);
    });

  const onBuyClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setLoadingPayment(true);
    try {
      const result = await imitatePayment();
      dispatch(setBoughtCourse(id));
      toast.success(result.message);
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      console.error(msg);
      toast.error('Oops. Something went wrong');
    } finally {
      setLoadingPayment(false);
    }
  };

  return isCourseBought ? (
    <Typography className='bg-gray-300 p-2 text-center'>You already purchased this course</Typography>
  ) : (
    <Button fullWidth color='secondary' variant='contained' onClick={onBuyClick} loading={loadingPayment}>
      Purchase
    </Button>
  );
};

export default BuyButton;
