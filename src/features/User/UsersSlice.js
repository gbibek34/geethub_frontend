import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  artists: [],
  total_results: 0,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  artist: [],
  musics: [],
};

export const searchForArtists = createAsyncThunk(
  "artist/search",
  async ({ token, searchkey }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/artist/search/" + searchkey,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      if (searchkey) {
        let data = response.data;
        if (data.success === true) {
          console.log(data);
          console.log(thunkAPI.fulfillWithValue(data));
          return thunkAPI.fulfillWithValue(data);
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      } else {
        return;
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchArtistProfile = createAsyncThunk(
  "artist/profile",
  async ({ token, artistid }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/artist/profile/" + artistid,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      let data = response.data;
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchArtistMusic = createAsyncThunk(
  "artist/musics",
  async ({ token, artistid }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/artist/musics/" + artistid,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      let data = response.data;
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.artists = [];
      return state;
    },
  },
  extraReducers: {
    [searchForArtists.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      console.log("in here");
      state.artists = payload.data;
      state.total_results = payload.data.length;
    },
    [searchForArtists.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [searchForArtists.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "Can not search for artist";
    },
    [fetchArtistProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(payload);
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
      state.errorMessage = "Could not load artist music";
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
      state.errorMessage = "Could not load artist profile";
    },
  },
});

export const { clearState } = usersSlice.actions;
export const usersSelector = (state) => state.users;
