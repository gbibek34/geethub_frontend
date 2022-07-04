import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  totalErrorMessage: "",
  dataErrorMessage: "",
  transactionErrorMessage: "",
  monetizationTransaction: [],
  loadData: [],
  withdrawData: [],
  tipData: [],
  amount: 0,
  load_count: 0,
  withdraw_count: 0,
  tip_count: 0,
};

export const fetchMonetizationTotal = createAsyncThunk(
  "monetization/total",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/monetization/total",
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
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchMonetizationData = createAsyncThunk(
  "monetization/data",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/monetization/transaction-data",
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
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchMonetizationTransaction = createAsyncThunk(
  "monetization/all",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/monetization/transaction-details",
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
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const monetizationSlice = createSlice({
  name: "monetization",
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    resetMonetization: () => initialStateValue,
  },
  extraReducers: {
    [fetchMonetizationTotal.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMonetizationTotal.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.totalErrorMessage = "Could not load data";
    },
    [fetchMonetizationTotal.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(payload);
      state.amount = payload.amount;
      state.load_count = payload.load_count;
      state.withdraw_count = payload.withdraw_count;
      state.tip_count = payload.tip_count;
    },
    [fetchMonetizationData.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMonetizationData.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.dataErrorMessage = "Could not load data";
    },
    [fetchMonetizationData.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(payload);
      state.loadData = payload.load_data;
      state.withdrawData = payload.withdraw_data;
      state.tipData = payload.tip_data;
    },
    [fetchMonetizationTransaction.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMonetizationTransaction.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.transactionErrorMessage = "Could not load data";
    },
    [fetchMonetizationTransaction.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      console.log(payload.data);
      state.monetizationTransaction = payload.data;
    },
  },
});

export const { clearState, resetMonetization } = monetizationSlice.actions;
export const monetizationSelector = (state) => state.monetization;
