import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
  id: '',
  name: '',
  email: '',
  is_authenticated: false,
  joined_date: '',
  is_verified: false,
  bio: '',
  profile_image: '',
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
  music_count: 0,
  followers: 0,
  coins: 0,
  isFollowed: '',
  is_discoverable: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  isFollowed: "",
  isAdmin: false,
  verification_request: false,
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

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        'http://localhost:3000/login',
        userData
      );

      let data = response.data;
      if (data.success === true) {
        localStorage.setItem('token', data.token);

        if (data.isAdmin == true) {
          localStorage.setItem('role', 'geethub-admin');
        } else {
          localStorage.setItem('role', 'geethub-user');
        }
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'user/id',
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/user/' + id, {
        headers: { Authorization: 'Bearer ' + token },
      });
      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return thunkAPI.fulfillWithValue(data.data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);
export const fetchMyProfile = createAsyncThunk(
  'user/profile',
  async (token, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3000/user/profile', {
        headers: { Authorization: 'Bearer ' + token },
      });
      let data = response.data;
      console.log(data);
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
  'user/profile/update',
  async (
    { token, name, bio, facebook, instagram, twitter, profile_image },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('facebook', facebook);
      formData.append('instagram', instagram);
      formData.append('twitter', twitter);
      formData.append('profile_image', profile_image);
      const response = await axios.put(
        'http://localhost:3000/user/profile/update',
        formData,
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
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const changeDiscoverable = createAsyncThunk(
  'user/profile/discoverable',
  async ({ token, is_discoverable }, thunkAPI) => {
    try {
      const response = await axios.put(
        'http://localhost:3000/user/profile/discoverable',
        { is_discoverable: is_discoverable },
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
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const verificationRequest = createAsyncThunk(
  'user/profile/verification',
  async ({ token }, thunkAPI) => {
    try {
      const response = await axios.put(
        'http://localhost:3000/user/profile/verification',
        {},
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      console.log(response);
      let data = response.data;
      if (data.success !== true) {
        return thunkAPI.rejectWithValue(response.msg);
      }
      if (data.success === true) {
        return thunkAPI.fulfillWithValue(data);
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const deleteUserProfile = createAsyncThunk(
  'user/delete',
  async ({ token }, thunkAPI) => {
    console.log(token);
    try {
      const response = await axios.post(
        'http://localhost:3000/user/delete/',
        {},
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );
      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return data;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const loadCoins = createAsyncThunk(
  'user/load',
  async ({ token, amount }, thunkAPI) => {
    try {
      const response = await axios.put(
        'http://localhost:3000/transaction/load',
        { amount },
        { headers: { Authorization: 'Bearer ' + token } }
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
    resetUser: () => initialStateValue,
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
      state.errorMessage = 'Registration failed';
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
      state.errorMessage = 'Login failed';
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
      state.id = payload.data._id;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.is_authenticated = payload.data.is_authenticated;
      state.is_verified = payload.data.is_verified;
      state.bio = payload.data.bio;
      state.music_count = payload.data.MusicCount;
      state.profile_image = payload.data.profile_image;
      state.social = payload.data.social;
      state.followers = payload.data.followers;
      state.is_discoverable = payload.data.is_discoverable;
      state.isAdmin = payload.data.isAdmin;
      state.verification_request = payload.data.verification_request;
      state.coins = payload.data.coins;
    },
    [fetchMyProfile.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not load profile';
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
      state.id = payload.data._id;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.is_authenticated = payload.data.is_authenticated;
      state.is_verified = payload.data.is_verified;
      state.bio = payload.data.bio;
      state.music_count = payload.data.MusicCount;
      state.profile_image = payload.data.profile_image;
      state.social = payload.data.social;
      state.followers = payload.data.followers;
      state.is_discoverable = payload.data.is_discoverable;
      state.verification_request = payload.data.verification_request;
      state.coins = payload.data.coins;
    },
    [fetchUserById.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.id = payload.data._id;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.is_authenticated = payload.data.is_authenticated;
      state.is_verified = payload.data.is_verified;
      state.bio = payload.data.bio;
      state.music_count = payload.data.MusicCount;
      state.profile_image = payload.data.profile_image;
      state.followers = payload.followers;
      state.social = payload.data.social;
      state.isAdmin = payload.data.isAdmin;
      state.verification_request = payload.data.verification_request;
      state.coins = payload.data.coins;
    },
    [fetchUserById.pending]: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = true;
    },
    [fetchUserById.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'User Retrieval failed';
    },
    [changeDiscoverable.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [changeDiscoverable.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not change discoverability';
    },
    [changeDiscoverable.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.id = payload.data._id;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.is_authenticated = payload.data.is_authenticated;
      state.is_verified = payload.data.is_verified;
      state.bio = payload.data.bio;
      state.music_count = payload.data.MusicCount;
      state.profile_image = payload.data.profile_image;
      state.social = payload.data.social;
      state.followers = payload.data.followers;
      state.is_discoverable = payload.data.is_discoverable;
      state.isAdmin = payload.data.isAdmin;
      state.verification_request = payload.data.verification_request;
      state.coins = payload.data.coins;
    },
    [verificationRequest.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [verificationRequest.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = true;
      console.log(payload);
      state.errorMessage = payload;
    },
    [verificationRequest.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.id = payload.data._id;
      state.name = payload.data.name;
      state.email = payload.data.email;
      state.is_authenticated = payload.data.is_authenticated;
      state.is_verified = payload.data.is_verified;
      state.bio = payload.data.bio;
      state.music_count = payload.data.MusicCount;
      state.profile_image = payload.data.profile_image;
      state.social = payload.data.social;
      state.followers = payload.data.followers;
      state.is_discoverable = payload.data.is_discoverable;
      state.verification_request = payload.data.verification_request;
      state.coins = state.payload.coins;
    },
    [deleteUserProfile.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [deleteUserProfile.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not delete user';
    },
    [deleteUserProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
    },
    [loadCoins.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [loadCoins.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = 'Could not load coins';
    },
    [loadCoins.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.coins += payload.data;
    },
  },
});

export const { clearState, resetUser } = userSlice.actions;
export const userSelector = (state) => state.user;
