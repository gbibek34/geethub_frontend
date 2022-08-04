import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  users: [],
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isFetching: false,
  isAdmin: "",
  userInsight: [],
  musicInsight: [],
  total_user: 0,
  total_artist: 0,
  verified_artist: 0,
  unaunticated_user: 0,
  total_music: 0,
  verified_artist_music: 0,
  views_count: 0,
  music_length: 0,
  isUserInsightSuccess: false,
  isMusicInsightSuccess: false,
};

export const checkUserRole = createAsyncThunk(
  "admin/check",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/admin/check/", {
        headers: { Authorization: "Bearer " + token },
      });
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

export const fetchUserNumbers = createAsyncThunk(
  "admin/user/numbers",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/user/numbers",
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

export const fetchUserInsight = createAsyncThunk(
  "admin/user/insight",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/user/insight",
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

export const fetchUsersDetails = createAsyncThunk(
  "admin/users",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/allusers/",
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

export const fetchMusicNumbers = createAsyncThunk(
  "admin/music/numbers",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/music/numbers",
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

export const fetchMusicInsight = createAsyncThunk(
  "admin/music/insight",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/music/insight",
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

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    resetUserDetails: () => initialStateValue,
  },
  extraReducers: {
    [fetchUsersDetails.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchUsersDetails.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch user details";
    },
    [fetchUsersDetails.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.users = payload.data;
    },
    [checkUserRole.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [checkUserRole.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not check user";
    },
    [checkUserRole.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isAdmin = payload.data.isAdmin;
    },
    [fetchUserNumbers.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchUserNumbers.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch user numbers";
    },
    [fetchUserNumbers.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.total_user = payload.total_user;
      state.total_artist = payload.total_artist;
      state.verified_artist = payload.verified_artist;
      state.unaunticated_user = payload.unaunticated_user;
    },
    [fetchUserInsight.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchUserInsight.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch user insight";
    },
    [fetchUserInsight.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = false;
      state.userInsight = payload.user_data;
      state.isUserInsightSuccess= true;

    },
    [fetchMusicNumbers.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMusicNumbers.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch music numbers";
    },
    [fetchMusicNumbers.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.total_music = payload.total_music;
      state.verified_artist_music = payload.verified_artist_music;
      state.views_count = payload.views_count;
      state.music_length = payload.music_length;
    },
    [fetchMusicInsight.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMusicInsight.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch music insight";
    },
    [fetchMusicInsight.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isMusicInsightSuccess= true;
      state.isError = false;
      state.musicInsight = payload.music_data;
    },
  },
});

export const { clearState, resetUserDetails } = adminSlice.actions;
export const adminSelector = (state) => state.admin;
