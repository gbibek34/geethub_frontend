import { configureStore } from "@reduxjs/toolkit";
import { musicsSlice } from "./features/Music/MusicsSlice";
import { playlistsSlice } from "./features/Playlist/PlaylistsSlice";
import { userSlice } from "./features/User/UserSlice";

export default configureStore({
  reducer: {
    musics: musicsSlice.reducer,
    user: userSlice.reducer,
    // playlist: playlistSlice.reducer,
    playlists: playlistsSlice.reducer,
  },
});
