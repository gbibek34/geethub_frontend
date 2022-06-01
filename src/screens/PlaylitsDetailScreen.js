import React, { useState, useEffect } from "react";
import "./uploadsCSS.css";
import PlaylistMusicCard from "./PlaylistMusicCard";

import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import ProfileScreen from "./ProfileScreen";

import { Rings } from "react-loader-spinner";
import {
  fetchPlaylistbyId,
  fetchMusicInPlaylist,
  clearState,
  playlistSelector,
} from "../features/Playlist/PlaylistSlice";
import PlaylistModal from "./PlaylistModal";

const PlaylistDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { playlistId } = useParams();
  useEffect(() => {
    dispatch(
      fetchMusicInPlaylist({ token: localStorage.getItem("token"), playlistId })
    );
    // dispatch(
    //   fetchPlaylistbyId({ token: localStorage.getItem("token"), playlistId })
    // );
  }, []);

  const { isFetching, isError, isSuccess, musics } =
    useSelector(playlistSelector);

  const refresh = () => {
    if (isSuccess) {
      dispatch(fetchMusicInPlaylist(localStorage.getItem("token")));
    }
  };

  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="sidebar text-center">
          <h5>Geethub</h5>
          <button
            className="btn btn-outline-warning w-75"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="main-container">
          <div>
            <ProfileScreen />
          </div>
          {/* <div className='page-header'>My Uploads</div> */}
          <div className="uploaded-music">
            <div className="upload-header">
              <div className="sub-header">Music</div>
              <PlaylistModal notifyParent={refresh} />
            </div>

            <div className="all-music">
              {!isFetching ? (
                musics.map((music) => {
                  return <PlaylistMusicCard key={music._id} music={music} />;
                })
              ) : (
                <Rings />
              )}
            </div>
          </div>
        </div>
        <div className="music-status text-center">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailScreen;
