import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  tips: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
};

export const createTransaction = createAsyncThunk(
  "artist/tip",
  async ({ token, artistid, amount, remarks }, thunkAPI) => {
    try {
      const transactiondata = {
        artistid: artistid,
        amount: amount,
        remarks: remarks,
      };
      const response = await axios.post(
        "http://localhost:3000/artist/tip",
        transactiondata,
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

export const tipArtistSlice = createSlice({
  name: "tip",
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    resetTip: () => initialStateValue,
  },
  extraReducers: {
    [createTransaction.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [createTransaction.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [createTransaction.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not tip the artist";
    },
  },
});
