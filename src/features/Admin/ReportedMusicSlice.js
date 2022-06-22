import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  pendingMusic: [],
  rejectedMusic: [],
  resolvedMusic: [],
  isSuccess: "",
  isError: "",
  errorMessage: "",
  isFetchingReport: "",
  isAdmin: "",
};


export const pendingReportedMusic = createAsyncThunk(
  "admin/reportedmusic/pending",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/musicreport/pending",
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

export const rejectedReportedMusic = createAsyncThunk(
  "admin/reportedmusic/rejected",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/musicreport/rejected",
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

export const resolvedReportedMusic = createAsyncThunk(
  "admin/reportedmusic/resolved",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/musicreport/resolved",
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

export const rejectReportedMusic = createAsyncThunk(
  "admin/reportedmusic/reject",
  async ({ token, reportid }, thunkAPI) => {
    try {
      console.log(token);
      const response = await axios.put(
        "http://localhost:3000/admin/musicreport/reject",
        { reportid: reportid },
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

export const resolveReportedMusic = createAsyncThunk(
  "/admin/reportedmusic/resolve",
  async ({ token, reportid }, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/admin/musicreport/resolve",
        { reportid: reportid },
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

export const reportedMusicSlice = createSlice({
  name: "reportedmusic",
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetchingReport = false;
      return state;
    },
    resetReportedMusic: () => initialStateValue,
  },
  extraReducers: {
    [pendingReportedMusic.pending]: (state) => {
      state.isFetchingReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [pendingReportedMusic.rejected]: (state) => {
      state.isFetchingReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch pending musics";
    },
    [pendingReportedMusic.fulfilled]: (state, { payload }) => {
      state.isFetchingReport = false;
      state.isSuccess = true;
      state.isError = false;
      state.pendingMusic = payload.data;
    },
    [rejectedReportedMusic.pending]: (state) => {
      state.isFetchingReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [rejectedReportedMusic.rejected]: (state) => {
      state.isFetchingReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch rejected musics";
    },
    [rejectedReportedMusic.fulfilled]: (state, { payload }) => {
      state.isFetchingReport = false;
      state.isSuccess = true;
      state.isError = false;
      state.rejectedMusic = payload.data;
    },
    [resolvedReportedMusic.pending]: (state) => {
      state.isFetchingReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [resolvedReportedMusic.rejected]: (state) => {
      state.isFetchingReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch resolved musics";
    },
    [resolvedReportedMusic.fulfilled]: (state, { payload }) => {
      state.isFetchingReport = false;
      state.isSuccess = true;
      state.isError = false;
      state.resolvedMusic = payload.data;
    },
    [rejectReportedMusic.pending]: (state) => {
      state.isFetchingReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [rejectReportedMusic.rejected]: (state) => {
      state.isFetchingReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch reject reported music";
    },
    [rejectReportedMusic.fulfilled]: (state, { payload }) => {
      state.isFetchingReport = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [resolveReportedMusic.pending]: (state) => {
      state.isFetchingReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [resolveReportedMusic.rejected]: (state) => {
      state.isFetchingReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch resolve reported music";
    },
    [resolveReportedMusic.fulfilled]: (state, { payload }) => {
      state.isFetchingReport = false;
      state.isSuccess = true;
      state.isError = false;
    },
  },
});

export const { clearState, resetReportedMusic } = reportedMusicSlice.actions;
export const reportedMusicSelector = (state) => state.reportedmusic;
