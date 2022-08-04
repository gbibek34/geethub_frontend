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
    resetNowPlaying: () => initialStateValue,
  },
});

export const {
  updateNowPlayingState,
  addToQueue,
  updateIndex,
  resetNowPlaying,
} = nowPlayingSlice.actions;
export const nowPlayingSelector = (state) => state.nowPlaying;
