import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
  isFetching: false,
  isError: false,
  isSuccess: false,
  userVerificationRequest: [],
  errorMessage: '',
};

export const fetchUserVerificationRequest = createAsyncThunk(
  'admin/userVerificationRequest/get',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/admin/user/verification/requests',
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
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const acceptUserVerificationRequest = createAsyncThunk(
  'admin/userVerificationRequest/accept',
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/admin/user/verify/${id}`,
        {},
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
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const rejectUserVerificationRequest = createAsyncThunk(
  'admin/userVerificationRequest/reject',
  async ({ id, token }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/admin/user/reject/${id}`,
        {},
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
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const userVerificationSlice = createSlice({
  name: 'userVerificationRequest',
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    resetUserVerification: () => initialStateValue,
  },
  extraReducers: {
    [fetchUserVerificationRequest.pending]: (state, { payload }) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchUserVerificationRequest.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userVerificationRequest = payload.data;
    },
    [fetchUserVerificationRequest.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Something went wrong';
    },
    [acceptUserVerificationRequest.pending]: (state, { payload }) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [acceptUserVerificationRequest.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userVerificationRequest = state.userVerificationRequest.filter(
        (userVerificationRequest) =>
          userVerificationRequest._id !== payload.data._id
      );
    },
    [acceptUserVerificationRequest.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Something went wrong';
    },
    [rejectUserVerificationRequest.pending]: (state, { payload }) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [rejectUserVerificationRequest.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.userVerificationRequest = state.userVerificationRequest.filter(
        (userVerificationRequest) =>
          userVerificationRequest._id !== payload.data.userId
      );
    },
    [rejectUserVerificationRequest.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Something went wrong';
    },
  },
});

export const { clearState, resetUserVerification } =
  userVerificationSlice.actions;
export const userVerificationRequestSelector = (state) =>
  state.userVerificationRequest;
