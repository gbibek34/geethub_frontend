import React, { useState, useEffect } from "react";
import "../components/uploadsCSS.css";
import PlaylistMusicCard from "./PlaylistMusicCard";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";

import { Rings } from "react-loader-spinner";
import {
  fetchMusicInPlaylist,
  fetchPlaylistbyId,
  clearState,
  playlistSelector,
} from "../features/Playlist/PlaylistSlice";
import PlaylistModal from "../components/PlaylistModal";


//playlist details screen that displays all the music in the playlist

const PlaylistDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { playlistId } = useParams();
  useEffect(() => {
    dispatch(
      fetchMusicInPlaylist({ token: localStorage.getItem("token"), playlistId })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchPlaylistbyId({ token: localStorage.getItem("token"), playlistId })
    );
  }, []);

  const { isFetching, isError, isSuccess, musics, name, description } =
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
        <div className="page-header">{name}</div>

          <div className="uploaded-music">
            <div className="upload-header">
              <div className="sub-header">Music</div>
              <PlaylistModal notifyparent={refresh} />
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
