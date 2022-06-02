import React, { useState, useEffect } from "react";
import "../styles/uploadsCSS.css";
import PlaylistMusicCard from "../components/PlaylistMusicCard";
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

  return (
    <div className="main-container">
        <div className="page-header">{name}</div>
          <div className="uploaded-music">
            <div className="upload-header">
              <div className="sub-header">Music</div>
            </div>
            <div className="allmusic-container">
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
  );
};

export default PlaylistDetailScreen;
