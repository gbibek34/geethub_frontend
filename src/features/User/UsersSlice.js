import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialStateValue = {
  artists: [],
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  artist: [],
  musics: [],
  followers:0,
  isFollowed: false,
};

export const fetchArtistProfile = createAsyncThunk(
  'artist/profile',
  async ({ token, artistid, userId }, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/artist/profile/' + artistid,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
      );

      let data = response.data;
      if (data.success === true) {
        return thunkAPI.fulfillWithValue({data, userId});
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const fetchArtistMusic = createAsyncThunk(
  'artist/musics',
  async ({ token, artistid }, thunkAPI) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/artist/musics/' + artistid,
        {
          headers: { Authorization: 'Bearer ' + token },
        }
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
export const followArtist = createAsyncThunk(
  "artist/follow",
  async ({ token, id }, thunkAPI) => {
    console.log(token);
    try {
      const response = await axios.put(
        "http://localhost:3000/artist/follow/",
        {
          artistid: id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;
      console.log(response.data);
      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        console.log("fulfilled");
        return thunkAPI.fulfillWithValue({data, id});
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const unfollowArtist = createAsyncThunk(
  "artist/unfollow",
  async ({ token, id }, thunkAPI) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/artist/unfollow/",

        {
          artistid: id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let data = response.data;

      if (data.success !== true) {
        return thunkAPI.rejectWithValue(data);
      } else {
        return thunkAPI.fulfillWithValue({data, id});
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.data);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialStateValue,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.artists = [];
      return state;
    },
    resetUsers: () => initialStateValue,
  },
  extraReducers: {
    [fetchArtistProfile.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.artist = payload.data.data;
      state.followers = payload.data.data.followed_by.length;
      state.isFollowed = payload.data.data.followed_by.indexOf(payload.userId)!==-1;
      console.log(state.artist);
    },
    [fetchArtistProfile.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchArtistProfile.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Could not load artist music';
    },

    [fetchArtistMusic.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.musics = payload.data;
    },
    [fetchArtistMusic.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [fetchArtistMusic.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = 'Could not load artist profile';
    },
    [followArtist.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [followArtist.rejected]: (state) => {
      console.log("rejected");
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not like music";
    },
    [followArtist.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.artist.followed_by = [...state.artist.followed_by, payload.id];
      state.followers = state.followers +1;
      state.isFetching = false;
      state.isSuccess = true;
      state.isFollowed = true;
    },
    [unfollowArtist.pending]: (state) => {
      state.isFetching = true;
      state.isSuccess = false;
      state.isError = false;
    },
    [unfollowArtist.rejected]: (state) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = "Could not like music";
    },
    [unfollowArtist.fulfilled]: (state, { payload }) => {
      console.log("this",state.artist.followed_by.filter((id)=>id!==payload.id));
      state.artist.followed_by = state.artist.followed_by.filter((id)=>id!==payload.id);
      state.followers = state.followers -1;
      state.isFetching = false;
      state.isSuccess = true;
      state.isFetching = false;
      state.isFollowed = false;
    },
  },
});

export const { clearState, resetUsers } = usersSlice.actions;
export const usersSelector = (state) => state.users;
