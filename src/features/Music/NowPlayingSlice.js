import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const initialStateValue = {
  musics: [],
};

export const nowPlayingSlice = createSlice({
  name: 'nowPlaying',
  initialState: initialStateValue,
  reducers: {
    updateNowPlayingState: (state, { payload }) => {
      state.musics = payload;
    },
  },
});

export const { updateNowPlayingState } = nowPlayingSlice.actions;
export const nowPlayingSelector = (state) => state.nowPlaying;
