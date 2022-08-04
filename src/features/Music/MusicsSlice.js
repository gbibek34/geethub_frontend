import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  musics: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  likedmusics: [],
  reportedmusic: [],
  popularmusic: [],
  latestmusic: [],
  followedmusic: [],
};

export const fetchMyMusics = createAsyncThunk(
  "music/my",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/music/my", {
        headers: { Authorization: "Bearer " + token },
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

export const fetchReportedMusic = createAsyncThunk(
  "music/reported/all",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/musicreport/musics",
        {
          headers: { Authorization: "Bearer " + token },
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

export const createNewMusic = createAsyncThunk(
  "music/create",
  async ({ token, name, description, genre, audio, coverArt }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("genre", genre);
      formData.append("audio", audio);
      formData.append("coverArt", coverArt);
      const response = await axios.post(
        "http://localhost:3000/music/new",
        formData,
        {
          headers: { Authorization: "Bearer " + token },
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

export const fetchLikedMusic = createAsyncThunk(
  "music/liked",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/music/liked/all",
        {
          headers: { Authorization: "Bearer " + token },
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

export const editMusicDetails = createAsyncThunk(
  "music/edit",
  async ({ token, id, name, description, genre, coverArt }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("genre", genre);
      formData.append("coverArt", coverArt);
      const response = await axios.put(
        `http://localhost:3000/music/edit/${id}`,
        formData,
        {
          headers: { Authorization: "Bearer " + token },
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

export const fetchPopularMusic = createAsyncThunk(
  "music/popular",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/music/discover/popular",
        {
          headers: { Authorization: "Bearer " + token },
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
      console.log(e);

      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const fetchLatestMusic = createAsyncThunk(
  "music/latest",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/music/discover/latest",
        {
          headers: { Authorization: "Bearer " + token },
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

export const fetchFollowedMusic = createAsyncThunk(
  "music/followed",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/music/discover/followed",
        {
          headers: { Authorization: "Bearer " + token },
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
  name: "musics",
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
      state.errorMessage = "Could not load musics";
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
      state.errorMessage = "Could not add music";
    },
    [createNewMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [editMusicDetails.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [editMusicDetails.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not edit music details";
    },
    [editMusicDetails.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      // var newMusic = state.musics.filter((musics) => musics._id === payload.data._id);
      // newMusic.name = payload.data.name;
      // newMusic.coverArt = payload.data.coverArt;
      // newMusic.description = payload.data.description;
      // newMusic.genre = payload.data.genre;
      // state.musics = state.musics.filter((musics) => musics._id !== payload.data._id);
      // state.musics = [...state.musics, newMusic];
    },
    [fetchLikedMusic.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchLikedMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not load musics";
    },
    [fetchLikedMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.likedmusics = payload.data;
    },
    [fetchReportedMusic.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchReportedMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not load musics";
    },
    [fetchReportedMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.reportedmusic = payload.data;
    },

    [fetchPopularMusic.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchPopularMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      console.log("failed");
      state.isSuccess = false;
      state.errorMessage = "Could not load musics";
    },
    [fetchPopularMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(payload.data);
      state.popularmusic = payload.data;
    },
    [fetchLatestMusic.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchLatestMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;

      state.errorMessage = "Could not load musics";
    },
    [fetchLatestMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.latestmusic = payload.data;
    },
    [fetchFollowedMusic.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchFollowedMusic.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;

      state.errorMessage = "Could not load musics";
    },
    [fetchFollowedMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.followedmusic = payload.data;
    },
  },
});

export const { clearState, resetMusics } = musicsSlice.actions;
export const musicsSelector = (state) => state.musics;
