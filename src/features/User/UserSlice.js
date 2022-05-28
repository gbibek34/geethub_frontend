import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialStateValue = {
  id: "",
  name: "",
  email: "",
  is_authenticated: false,
  joined_date: "",
  is_verified: false,
  bio: "",
  profile_image: "",
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
  },
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};

export const signupUser = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    var passedData = data;
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        passedData
      );
      let data = response.data;
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

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );

      let data = response.data;
      if (data.success === true) {
        localStorage.setItem("token", data.token);
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchMyProfile = createAsyncThunk(
  "user/profile",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3000/user/profile", {
        headers: { Authorization: "Bearer " + token },
      });
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

export const updateUserProfile = createAsyncThunk(
  "user/profile/update",
  async (
    { token, name, bio, facebook, instagram, twitter, profile_image },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      formData.append("facebook", facebook);
      formData.append("instagram", instagram);
      formData.append("twitter", twitter);
      formData.append("profile_image", profile_image);
      const response = await axios.post(
        "http://localhost:3000/user/profile/update",
        formData,
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

export const userSlice = createSlice({
  name: "user",
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
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [signupUser.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "Registration failed";
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
    },
    [loginUser.pending]: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = true;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Login failed";
    },
    [fetchMyProfile.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [fetchMyProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.user = payload.data;
    },
    [fetchMyProfile.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not load profile";
    },
    [updateUserProfile.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [updateUserProfile.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not edit profile';
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
  },
});

export const { clearState } = userSlice.actions;
export const userSelector = (state) => state.user;
