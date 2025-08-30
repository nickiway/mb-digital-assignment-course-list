/** @format */

import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { useEffect, useRef } from 'react';
import { resetVideo, setDuration, setStatus, setVideoTime } from '../../lib/slices/videoSlice';
import { removeSelectedCourse } from '../../lib/slices/courseSlice';

const CourseDetailDialog = () => {
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.course.selectedCourse);

  const open = Boolean(course);

  const onCloseVideo = () => {
    dispatch(removeSelectedCourse());
    dispatch(resetVideo());
  };

  if (course === null) return;

  const { description, price, title, videoURL } = course;
  return (
    <Dialog open={open} onClose={onCloseVideo}>
      <DialogTitle>
        <Typography>{title}</Typography>
      </DialogTitle>
      <DialogContent>
        <VideoPortal url={videoURL} />
        <InformationSection description={description} price={price} />
      </DialogContent>
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
    <Box>
      {url && (
        <video
          ref={ref}
          width={300}
          height={150}
          controls
          onPause={onPause}
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
}
const InformationSection = ({ description, price }: InformationSectionProps) => {
  return (
    <div>
      {description} {price}
    </div>
  );
};
