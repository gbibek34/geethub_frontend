import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  musics: [],
  _id: "",
  createdBy: "",
  name: "",
  description: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const fetchPlaylistbyId = createAsyncThunk(
  "playlist/details",
  async ({ token, playlistId }, thunkAPI) => {
    console.log("in here");
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/details/" + playlistId,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;
      console.log(data);
      console.log(data.success);
      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const fetchMusicInPlaylist = createAsyncThunk(
  "playlist/view",
  async ({ token, playlistId }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/musics/" + playlistId,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const playlistSlice = createSlice({
  name: "playlist",
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
    [fetchMusicInPlaylist.pending]: (state) => {
      console.log("in");
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMusicInPlaylist.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not load musics";
    },
    [fetchMusicInPlaylist.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.musics = payload.data;
    },
    [fetchPlaylistbyId.pending]: (state) => {
      console.log("in");
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchPlaylistbyId.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not load playlist details";
    },
    [fetchPlaylistbyId.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state._id = payload.data._id;
      state.createdBy = payload.data.createdBy;
      state.name = payload.data.name;
      state.description = payload.data.description;
    },
  },
});

export const { clearState } = playlistSlice.actions;
export const playlistSelector = (state) => state.playlist;
