import { configureStore } from "@reduxjs/toolkit";
import { musicSlice } from "./features/Music/MusicSlice";
import { musicsSlice } from "./features/Music/MusicsSlice";
import { nowPlayingSlice } from "./features/Music/NowPlayingSlice";
import { playlistsSlice } from "./features/Playlist/PlaylistsSlice";
import { userSlice } from "./features/User/UserSlice";
import { playlistSlice } from "./features/Playlist/PlaylistSlice";
import { usersSlice } from "./features/User/UsersSlice";

export default configureStore({
  reducer: {
    musics: musicsSlice.reducer,
    user: userSlice.reducer,
    music: musicSlice.reducer,
    nowPlaying: nowPlayingSlice.reducer,
    playlists: playlistsSlice.reducer,
    playlist: playlistSlice.reducer,
    users: usersSlice.reducer,
  },
});
