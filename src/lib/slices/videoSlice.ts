/** @format */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  status: 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'error';
  duration: number;
  volume: number;
  muted: boolean;
  url: string | null;
  videoTime: number;
}

const initialState = {
  url: null,
  status: 'idle',
  duration: 0,
  volume: 1,
  muted: false,
  videoTime: 0,
} satisfies VideoState as VideoState;

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    resetVideo: () => initialState,

    setVideoUrl: (state) => {
      state.status = 'idle';
      state.videoTime = 0;
    },

    setStatus: (state, action: PayloadAction<VideoState['status']>) => {
      state.status = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.muted = action.payload;
    },

    setVideoTime: (state, action: PayloadAction<number>) => {
      state.videoTime = action.payload;
    },
  },
});

export const { setDuration, setMuted, setStatus, setVideoTime, setVideoUrl, setVolume, resetVideo } =
  videoSlice.actions;
export default videoSlice.reducer;
