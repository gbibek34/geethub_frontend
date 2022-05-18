import { configureStore } from '@reduxjs/toolkit';
import { musicsSlice } from './features/Music/MusicsSlice';

export default configureStore({
  reducer: {
    musics: musicsSlice.reducer,
  },
});
