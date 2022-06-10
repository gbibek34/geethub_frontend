import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialStateValue = {
  _id: '',
  name: '',
  description: '',
  genre: '',
  audio: '',
  uploadedById: '',
  uploadedByName: '',
  uploadedOn: '',
  views: 0,
  isPublished: false,
  coverArt: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isLiked: "",
  total_likes: 0,
};

export const fetchMusicById = createAsyncThunk(
  "music/get",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/music/get/" + id,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return data.data;
      }
    } catch (e) {}
  }
);

export const likeMusic = createAsyncThunk(
  "music/like",
  async ({ token, id }, thunkAPI) => {
    console.log(token);
    try {
      const response = await axios.put(
        "http://localhost:3000/music/like/",
        {
          musicid: id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;
      console.log(response.data);
      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        console.log("fulfilled");
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const unlikeMusic = createAsyncThunk(
  "music/unlike",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/music/unlike/",

        {
          musicid: id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return data.data;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const musicSlice = createSlice({
  name: "music",
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    resetMusic: () => initialStateValue,
  },
  extraReducers: {
    [fetchMusicById.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMusicById.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.isError = "Could not load music";
    },
    [fetchMusicById.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = true;
      state._id = payload._id;
      state.name = payload.name;
      state.description = payload.description;
      state.genre = payload.genre;
      state.audio = payload.audio;
      state.uploadedById = payload.uploadedBy.id;
      state.uploadedByName = payload.uploadedBy.name;
      state.uploadedOn = payload.uploadedOn;
      state.views = payload.views;
      state.isPublished = payload.isPublished;
      state.coverArt = payload.coverArt;
    },
    [likeMusic.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [likeMusic.rejected]: (state) => {
      console.log("rejected");
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not like music";
    },
    [likeMusic.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isLiked = true;
    },
    [unlikeMusic.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [unlikeMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not like music";
    },
    [unlikeMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.isLiked = false;
    },
  },
});

export const { clearState, resetMusic } = musicSlice.actions;
export const musicSelector = (state) => state.music;
