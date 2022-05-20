import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';

const initialStateValue = {
  id:"",
  name:"",
  email:"",
  is_authenticated: false,
  joined_date:"",
  is_verified:false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const signupUser = createAsyncThunk(
  'user/register',
  async (data, thunkAPI) => {
    var passedData = data;
    try {
      const response = await axios.post(
        'http://localhost:3000/signup',
        passedData
      );
      let data = response.data;
      console.log(data);
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
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
    [signupUser.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isSuccess = true;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage="Registration failed";
    },
  },
});

export const {clearState} = userSlice.actions;
export const userSelector = (state)=> state.user;