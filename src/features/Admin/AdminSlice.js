import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  users: [],
  isSuccess: "",
  isError: "",
  errorMessage: "",
  isFetching: "",
  isAdmin: "",
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
  },
});

export const { clearState, resetUserDetails } = adminSlice.actions;
export const adminSelector = (state) => state.admin;
