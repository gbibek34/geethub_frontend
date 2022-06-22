import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
  musics: [],
  artists: [],
  filters: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  total_artists_results: 0,
  total_musics_results: 0,
  errorMessage: '',
};

export const searchForArtists = createAsyncThunk(
  'artist/search',
  async ({ token, searchkey }, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/artist/search/' + searchkey,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      if (searchkey) {
        let data = response.data;
        if (data.success === true) {
          return thunkAPI.fulfillWithValue(data);
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } else {
        return;
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const searchForMusics = createAsyncThunk(
  'music/search',
  async ({ token, searchkey, filters }, thunkAPI) => {
    try {
      const stringData = filters.map((value) => `${value}`).join(',');
      const response = await axios.get(
        'http://localhost:3000/music/search/' + searchkey + '/' + stringData,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      if (searchkey) {
        let data = response.data;
        if (data.success === true) {
          return thunkAPI.fulfillWithValue({ data: data, filters: filters });
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } else {
        return;
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    resetSearch: () => initialStateValue,
    setFilters: (state, { payload }) => {
      state.filters = payload;
    },
  },
  extraReducers: {
    [searchForArtists.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.artists = payload.data;
      state.total_artists_results = payload.data.length;
    },
    [searchForArtists.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [searchForArtists.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Can not search for artist';
    },
    [searchForMusics.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.musics = payload.data.data;
      state.filters = payload.filters;
      state.total_musics_results = payload.data.data.length;
    },
    [searchForMusics.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [searchForMusics.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Can not search for musics';
    },
  },
});

export const { clearState, resetSearch, setFilters } = searchSlice.actions;
export const searchSelector = (state) => state.search;
