import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialStateValue = {
  tips: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
};

const notify = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

const notifyError = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

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
        notifyError("Insufficent balance");
        return thunkAPI.rejectWithValue(data);
      }
      if (data.success === true) {
        notify(
          "Sucessfully transferred " + amount + " coins from your account."
        );
        return thunkAPI.fulfillWithValue(data);
      } else {
        notifyError("Something went wrong");
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      notifyError("Something went wrong");
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
