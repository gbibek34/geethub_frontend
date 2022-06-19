import { configureStore } from "@reduxjs/toolkit";
import { musicSlice } from "./features/Music/MusicSlice";
import { musicsSlice } from "./features/Music/MusicsSlice";
import { nowPlayingSlice } from "./features/Music/NowPlayingSlice";
import { playlistsSlice } from "./features/Playlist/PlaylistsSlice";
import { userSlice } from "./features/User/UserSlice";
import { playlistSlice } from "./features/Playlist/PlaylistSlice";
import { usersSlice } from "./features/User/UsersSlice";
import { searchSlice } from "./features/Search/SearchSlice";
import { adminSlice } from "./features/Admin/AdminSlice";
import { reportedMusicSlice } from "./features/Admin/ReportedMusicSlice";
import { reportedUserSlice } from "./features/Admin/ReportedUserSlice";

export default configureStore({
  reducer: {
    musics: musicsSlice.reducer,
    user: userSlice.reducer,
    users: usersSlice.reducer,
    music: musicSlice.reducer,
    nowPlaying: nowPlayingSlice.reducer,
    playlists: playlistsSlice.reducer,
    playlist: playlistSlice.reducer,
    search: searchSlice.reducer,
    admin: adminSlice.reducer,
    reportedmusic: reportedMusicSlice.reducer,
    reporteduser: reportedUserSlice.reducer,
  },
});
