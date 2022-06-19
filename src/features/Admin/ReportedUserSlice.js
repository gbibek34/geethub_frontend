import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialStateValue = {
  pendingUsers: [],
  rejectedUsers: [],
  resolvedUsers: [],
  isSuccess: "",
  isError: "",
  errorMessage: "",
  isFetchingUserReport: "",
  isAdmin: "",
};

export const pendingReportedUser = createAsyncThunk(
  "admin/reporteduser/pending",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/userreport/pending",
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

export const rejectedReportedUser = createAsyncThunk(
  "admin/reporteduser/rejected",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/userreport/rejected",
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

export const resolvedReportedUser = createAsyncThunk(
  "admin/reporteduser/resolved",
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/admin/userreport/resolved",
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

export const rejectReportedUser = createAsyncThunk(
  "admin/reporteduser/reject",
  async ({ token, reportid }, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/admin/userreport/reject",
        {
          reportid: reportid,
        },
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

export const resolveReportedUser = createAsyncThunk(
  "/admin/reporteduser/resolve",
  async ({ token, reportid }, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/admin/userreport/resolve",
        {
          reportid: reportid,
        },
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

export const reportedUserSlice = createSlice({
  name: "reporteduser",
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetchingUserReport = false;
      return state;
    },
    resetReportedUser: () => initialStateValue,
  },
  extraReducers: {
    [pendingReportedUser.pending]: (state) => {
      state.isFetchingUserReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [pendingReportedUser.rejected]: (state) => {
      state.isFetchingUserReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch pending users";
    },
    [pendingReportedUser.fulfilled]: (state, { payload }) => {
      state.isFetchingUserReport = false;
      state.isSuccess = true;
      state.isError = false;
      state.pendingUsers = payload.data;
    },
    [rejectedReportedUser.pending]: (state) => {
      state.isFetchingUserReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [rejectedReportedUser.rejected]: (state) => {
      state.isFetchingUserReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch rejected users";
    },
    [rejectedReportedUser.fulfilled]: (state, { payload }) => {
      state.isFetchingUserReport = false;
      state.isSuccess = true;
      state.isError = false;
      state.rejectedUsers = payload.data;
    },
    [resolvedReportedUser.pending]: (state) => {
      state.isFetchingUserReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [resolvedReportedUser.rejected]: (state) => {
      state.isFetchingUserReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch resolved users";
    },
    [resolvedReportedUser.fulfilled]: (state, { payload }) => {
      state.isFetchingUserReport = false;
      state.isSuccess = true;
      state.isError = false;
      state.resolvedUsers = payload.data;
    },
    [rejectReportedUser.pending]: (state) => {
      state.isFetchingUserReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [rejectReportedUser.rejected]: (state) => {
      state.isFetchingUserReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch reject reported user";
    },
    [rejectReportedUser.fulfilled]: (state, { payload }) => {
      state.isFetchingUserReport = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [resolveReportedUser.pending]: (state) => {
      state.isFetchingUserReport = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [resolveReportedUser.rejected]: (state) => {
      state.isFetchingUserReport = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not fetch resolve reported user";
    },
    [resolveReportedUser.fulfilled]: (state, { payload }) => {
      state.isFetchingUserReport = false;
      state.isSuccess = true;
      state.isError = false;
    },
  },
});

export const { clearState, resetReportedUser } = reportedUserSlice.actions;
export const reportedUserSelector = (state) => state.reporteduser;
