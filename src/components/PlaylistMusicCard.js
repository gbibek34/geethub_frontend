import React, { useState, useEffect } from "react";
import axios from "axios";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { updateNowPlayingState } from "../features/Music/NowPlayingSlice";
import { useDispatch } from "react-redux";

//playlist music card to be displayed on playlist description screen

const PlaylistMusicCard = ({ music }) => {
  const date = new Date(music.uploadedOn).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const dispatch = useDispatch();
  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([music]));
  };

  return (
    <div className="indiv_playlist">
      <div className="playlist_details">
        <div className="image_container" onClick={handleMusicClick}>
          <img
            src={
              music.coverArt
                ? `http://localhost:3000/${music.coverArt.slice(6)}`
                : ""
            }
            className="playlist_image"
          />
        </div>
        <div className="playlist_title">
          <div className="playlist_name">{music.name}</div>
          <div className="playlist_descr">{music.genre}</div>
        </div>
      </div>
      <div className="playlist_allstats">
        <div className="playlist_stat">5 likes</div>
        <div className="playlist_stat">16:47</div>

        <span
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete"
          className="material-symbols-rounded songs_action_btn"
        >
          delete_forever
        </span>
      </div>
    </div>
  );
};

export default PlaylistMusicCard;
