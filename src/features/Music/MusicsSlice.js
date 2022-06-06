import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
  musics: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const fetchMyMusics = createAsyncThunk(
  'music/my',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/music/my', {
        headers: { Authorization: 'Bearer ' + token },
      });

      let data = response.data;
      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      }
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const createNewMusic = createAsyncThunk(
  'music/create',
  async ({ token, name, description, genre, audio, coverArt }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('genre', genre);
      formData.append('audio', audio);
      formData.append('coverArt', coverArt);
      const response = await axios.post(
        'http://localhost:3000/music/new',
        formData,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );

      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      }
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const musicsSlice = createSlice({
  name: 'musics',
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    resetMusics: () => initialStateValue,
  },
  extraReducers: {
    [fetchMyMusics.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMyMusics.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not load musics';
    },
    [fetchMyMusics.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.musics = payload.data;
    },
    [createNewMusic.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [createNewMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not add music';
    },
    [createNewMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
  },
});

export const { clearState, resetMusics } = musicsSlice.actions;
export const musicsSelector = (state) => state.musics;
