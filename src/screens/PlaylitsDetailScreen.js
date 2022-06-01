import React, { useState, useEffect } from "react";
import "./uploadsCSS.css";
import PlaylistMusicCard from "./PlaylistMusicCard";
import PlaylistModal from "./PlaylistModal";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProfileScreen from "./ProfileScreen";
import { Rings } from "react-loader-spinner";
import MusicPlayer from '../components/MusicPlayer';
import {
  fetchMusicInPlaylist,
  clearState,
  playlistSelector,
} from "../features/Playlist/PlaylistSlice";

const PlaylistDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { playlistId } = useParams();
  useEffect(() => {
    dispatch(
      fetchMusicInPlaylist({ token: localStorage.getItem("token"), playlistId })
    );
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

          <div className="uploaded-music">
            <div className="upload-header">
              <div className="sub-header">Music</div>
              <PlaylistModal notifyparent={refresh} />
            </div>

            <div className="all-music">
              {!isFetching ? (
                musics.map((music) => {
                  return <PlaylistMusicCard music={music} />;
                })
              ) : (
                <Rings />
              )}
            </div>
          </div>
        </div>
        <div className='music-status text-center'>
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetailScreen;
