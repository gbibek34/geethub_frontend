import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  artists: [],
  total_results: 0,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const searchForArtists = createAsyncThunk(
  "artist/search",
  async ({ token, searchkey }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/artist/search/" + searchkey.toLowerCase(),
        {
          headers: { Authorization: "Bearer " + token },
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
      console.log(payload);
      state.artists = payload.data;
      state.total_results = payload.data.length;
    },
    [searchForArtists.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [searchForArtists.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "Can not search for artist";
    },
  },
});

export const { clearState } = usersSlice.actions;
export const usersSelector = (state) => state.users;