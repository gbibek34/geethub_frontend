import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMemo } from 'react'

import { resetMusic } from "../features/Music/MusicSlice";
import { resetMusics } from "../features/Music/MusicsSlice";
import { resetNowPlaying } from "../features/Music/NowPlayingSlice";
import { resetPlaylist } from "../features/Playlist/PlaylistSlice";
import { resetPlaylists } from "../features/Playlist/PlaylistsSlice";
import { resetUser } from "../features/User/UserSlice";
import { resetUsers } from "../features/User/UsersSlice";
import { resetSearch } from "../features/Search/SearchSlice";
import { resetReportedMusic } from "../features/Admin/ReportedMusicSlice";
import { resetUserDetails } from "../features/Admin/AdminSlice";
import { resetReportedUser } from "../features/Admin/ReportedUserSlice";
import { resetUserVerification } from "../features/Admin/userVerificationSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const action = useMemo(() => ({
  
  logout(){
  localStorage.clear();

  dispatch(resetMusic());
  dispatch(resetMusics());
  dispatch(resetNowPlaying());
  dispatch(resetPlaylist());
  dispatch(resetPlaylists());
  dispatch(resetUser());
  dispatch(resetUsers());
  dispatch(resetSearch());
  dispatch(resetUserDetails());
  dispatch(resetReportedMusic());
  dispatch(resetReportedUser());
  dispatch(resetUserVerification());

  navigate("/login");
  window.location.reload();
  }
  }),[dispatch])
  return action
};

export default useLogout;
