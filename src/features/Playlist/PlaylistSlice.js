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
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/details/" + playlistId,
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

export const deletePlaylist = createAsyncThunk(
  "playlist/delete",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/playlist/delete/",
        {
          playlistid: id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return data;
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
    resetPlaylist: () => initialStateValue,
  },
  extraReducers: {
    [fetchMusicInPlaylist.pending]: (state) => {
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
    [deletePlaylist.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [deletePlaylist.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not delete user";
    },
    [deletePlaylist.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
  },
});

export const { clearState, resetPlaylist } = playlistSlice.actions;
export const playlistSelector = (state) => state.playlist;
