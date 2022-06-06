import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
  playlists: [],
  _id: '',
  createdBy: '',
  name: '',
  description: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const createNewPlaylist = createAsyncThunk(
  'playlist/create',
  async ({ token, name, description }, thunkAPI) => {
    try {
      const playlistData = {
        name: name,
        description: description,
      };
      const response = await axios.post(
        'http://localhost:3000/playlist/create',
        playlistData,
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

export const getUserplaylist = createAsyncThunk(
  'playlist/get',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/playlist/getuserplaylist',
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

export const addMusicToPlaylist = createAsyncThunk(
  'playlist/addmusic',
  async ({ token, playlistId, musicId }, thunkAPI) => {
    try {
      const musicData = {
        playlistId,
        musicId,
      };
      const response = await axios.post(
        'http://localhost:3000/playlist/addmusic',
        musicData,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      let data = response.data;
      console.log(data);
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

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    resetPlaylists: () => initialStateValue,
  },
  extraReducers: {
    [createNewPlaylist.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [createNewPlaylist.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [createNewPlaylist.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not create playlist';
    },
    [getUserplaylist.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [getUserplaylist.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not load playlists';
    },
    [getUserplaylist.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.playlists = payload.data;
    },
    [addMusicToPlaylist.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [addMusicToPlaylist.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [addMusicToPlaylist.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not add music to the playlist';
    },
  },
});

export const { clearState, resetPlaylists } = playlistsSlice.actions;
export const playlistsSelector = (state) => state.playlists;
