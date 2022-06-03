import React, { useState, useEffect } from "react";
import PlaylistMusicCard from "../components/PlaylistMusicCard";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import { Rings } from "react-loader-spinner";
import "../styles/artistStyle.css";
import {
  fetchArtistMusic,
  clearState,
  usersSelector,
} from "../features/User/UsersSlice";
import MusicCard from "./MusicCard";
import AllMusicCard from "./AllMusicCard";

export default function ArtistMusic({ artistid }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchArtistMusic({ token: localStorage.getItem("token"), artistid })
    );
  }, []);
  const { isFetching, isError, isSuccess, musics } = useSelector(usersSelector);

  return (
    <div className="all_playlists mt-0">
      <div className="upload-header">
        <div className="sub-header">ALL</div>
        <button
          className="btn btn-link create_new_playlist"
          data-toggle="modal"
          data-target="#create_new_playlist_modal"
        >
          {musics.length} songs
        </button>
      </div>
      <div className="overflow-auto">
        {!isFetching ? (
          musics.map((music) => {
            return <AllMusicCard music={music} />;
          })
        ) : (
          <Rings />
        )}
      </div>
    </div>
  );
}
