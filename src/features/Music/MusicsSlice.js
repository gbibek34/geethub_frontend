import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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
        return data;
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
  async (
    {
      token,
      name,
      description,
      genre,
      audio,
      uploadedBy, //temporary field
      coverArt,
    },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('genre', genre);
      formData.append('audio', audio);
      formData.append('uploadedBy', uploadedBy); // temporary field
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
  name: 'music',
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [fetchMyMusics.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchMyMusics.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Could not load musics';
    },
    [fetchMyMusics.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.musics = payload.data;
    },
    [createNewMusic.pending]: (state) => {
      state.isFetching = true;
    },
    [createNewMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Could not add music';
    },
    [createNewMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
  },
});

export const { clearState } = musicsSlice.actions;
export const musicsSelector = (state) => state.musics;
