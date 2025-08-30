/** @format */

import { Box, Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useCallback, useEffect, useRef } from 'react';
import { resetVideo, setDuration, setMuted, setStatus, setVideoTime, setVolume } from '../../../lib/slices/videoSlice';
import { removeSelectedCourse } from '../../../lib/slices/courseSlice';
import { throttle } from 'lodash';
import BuyButton from './BuyButton';

const CourseDetailDialog = () => {
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.course.selectedCourse);

  const open = Boolean(course);

  const onCloseVideo = () => {
    dispatch(removeSelectedCourse());
    dispatch(resetVideo());
  };

  if (course === null) return;
  const { id, description, price, title, videoURL } = course;

  return (
    <Dialog maxWidth='sm' open={open} onClose={onCloseVideo}>
      <DialogContent>
        <VideoPortal url={videoURL} />
        <InformationSection description={description} price={price} title={title} />
      </DialogContent>

      <DialogActions>
        <Box className='w-1/2'>
          <BuyButton id={id} />
        </Box>

        <Box className='w-1/2'>
          <Button fullWidth variant='contained' onClick={onCloseVideo}>
            Close
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CourseDetailDialog;

interface VideoPortalInterface {
  url: string;
}

const VideoPortal = ({ url }: VideoPortalInterface) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLVideoElement>(null);

  const onLoadedMetadata = () => {
    if (ref.current) {
      dispatch(setDuration(ref.current.duration));
    }
  };

  const onPlay = () => {
    dispatch(setStatus('playing'));
  };

  const onPause = () => {
    dispatch(setStatus('paused'));
  };

  const onEnded = () => {
    dispatch(setStatus('ended'));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleVolumeChange = useCallback(
    throttle((volume: number, muted: boolean) => {
      dispatch(setVolume(volume));
      dispatch(setMuted(muted));
    }, 200),
    [dispatch]
  );

  const onVolumeChange = () => {
    if (!ref.current) return;
    handleVolumeChange(ref.current.volume, ref.current.muted);
  };

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const intervalOfThrottling = 10;

    const handleTimeUpdate = () => {
      const currentTime = element.currentTime;

      if (Math.floor(currentTime) % intervalOfThrottling === 0) {
        dispatch(setVideoTime(Math.floor(currentTime)));
      }
    };

    element.addEventListener('timeupdate', handleTimeUpdate);
    return () => element.removeEventListener('timeupdate', handleTimeUpdate);
  }, [dispatch, ref]);

  return (
    <Box className='bg-red-50'>
      {url && (
        <video
          className='w-full h-full object-fill'
          ref={ref}
          controls
          onPause={onPause}
          onVolumeChange={onVolumeChange}
          onEnded={onEnded}
          onPlay={onPlay}
          onLoadedMetadata={onLoadedMetadata}
        >
          <source src={url} type='video/mp4' />
        </video>
      )}
    </Box>
  );
};

interface InformationSectionProps {
  description: string;
  price: number;
  title: string;
}
const InformationSection = ({ description, price, title }: InformationSectionProps) => {
  return (
    <Box className='mt-4 p-4 bg-white rounded-lg flex flex-col gap-4'>
      <Box className='flex justify-between items-center'>
        <Typography variant='h5' className='font-bold text-gray-800'>
          {title}
        </Typography>

        <Typography variant='h6' className=' font-semibold'>
          {price} $
        </Typography>
      </Box>
      <Typography variant='body1' className='text-gray-600'>
        {description}
      </Typography>
    </Box>
  );
};
