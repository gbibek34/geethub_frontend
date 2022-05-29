import React, { useState, useEffect } from "react";
import axios from "axios";
import AddToPlaylistModal from "./AddToPlaylistModal";


const AllMusicCard = ({ music }) => {
  const date = new Date(music.uploadedOn).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="indiv_playlist">
      <div className="playlist_details">
        <div className="image_container">
          <img
            src={
              music.coverArt
                ? `http://localhost:3000/${music.coverArt.slice(6)}`
                : ""
            }
            className="playlist_image"
          />
          <span className="material-symbols-rounded play_symbol">
            play_circle
          </span>
        </div>
        <div className="playlist_title">
          <div className="playlist_name">{music.name}</div>
          <div className="playlist_descr">Instrumental Pop</div>
        </div>
      </div>
      <div className="playlist_allstats">
        <div className="playlist_stat">5 likes</div>
        <AddToPlaylistModal musicId={music._id} />
        <span
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Edit"
          className="material-symbols-rounded songs_action_btn"
        >
          tune
        </span>
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
    
      {/* <div className="music-details">
        <div className="major-details">
          <AddToPlaylistModal musicId={music._id} />
          <div className="music-options">
            <div className="edit-music">
              <i className="fa-solid fa-sliders"></i>
            </div>
            <div className="delete-music">
              <i className="fa-solid fa-trash"></i>
            </div>
          </div>
        </div>
        <div className="other-details">
          <div className="last-updated">{date}</div>
          <div className="likes">
            <i className="fa-solid fa-heart"></i>&nbsp; 253
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AllMusicCard;