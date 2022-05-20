import { configureStore } from '@reduxjs/toolkit';
import { musicsSlice } from './features/Music/MusicsSlice';
import { userSlice } from './features/User/UserSlice';

export default configureStore({
  reducer: {
    musics: musicsSlice.reducer,
    user: userSlice.reducer,
  },
});
