import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
  artists: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  artist: [],
  musics: [],
};

export const fetchArtistProfile = createAsyncThunk(
  'artist/profile',
  async ({ token, artistid }, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/artist/profile/' + artistid,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );

      let data = response.data;
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchArtistMusic = createAsyncThunk(
  'artist/musics',
  async ({ token, artistid }, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/artist/musics/' + artistid,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );

      let data = response.data;
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.artists = [];
      return state;
    },
    resetUsers: () => initialStateValue,
  },
  extraReducers: {
    [fetchArtistProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.artist = payload.data;
    },
    [fetchArtistProfile.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchArtistProfile.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Could not load artist music';
    },

    [fetchArtistMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.musics = payload.data;
    },
    [fetchArtistMusic.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchArtistMusic.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Could not load artist profile';
    },
  },
});

export const { clearState, resetUsers } = usersSlice.actions;
export const usersSelector = (state) => state.users;
