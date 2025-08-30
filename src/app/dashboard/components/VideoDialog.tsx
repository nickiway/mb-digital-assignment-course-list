/** @format */

import { Dialog, DialogContent } from '@mui/material';
import { useAppSelector } from '../../lib/hooks';

interface VideoDialogProps {
  onCloseVideo: () => void;
}
const VideoDialog = ({ onCloseVideo }: VideoDialogProps) => {
  const url = useAppSelector((state) => state.video.url);

  const open = Boolean(url);

  return (
    <Dialog open={open} onClose={onCloseVideo}>
      <DialogContent>
        {url && (
          <video width={300} height={150} controls>
            <source src={url} type='video/mp4' />
          </video>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
