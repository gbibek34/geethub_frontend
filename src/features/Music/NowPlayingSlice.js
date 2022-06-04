import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialStateValue = {
  musics: [],
  playlistIndex: 0,
};

export const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState: initialStateValue,
  reducers: {
    updateNowPlayingState: (state, { payload }) => {
      state.musics = payload;
    },
    addToQueue: (state, { payload }) => {
      state.musics = [...state.musics, payload];
    },
    updateIndex: (state, { payload }) => {
      state.playlistIndex = payload;
    },
  },
});

export const { updateNowPlayingState } = nowPlayingSlice.actions;
export const nowPlayingSelector = (state) => state.nowPlaying;
export const { addToQueue } = nowPlayingSlice.actions;
export const { updateIndex } = nowPlayingSlice.actions;
