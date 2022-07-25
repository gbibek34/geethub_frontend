import React from "react";
import { useDispatch } from "react-redux";
import {
  updateNowPlayingState,
  addToQueue,
} from "../../features/Music/NowPlayingSlice";

const LikedMusicCard = ({ music }) => {
  const dispatch = useDispatch();
  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([music]));
  };

  const handleAddToQueue = () => {
    dispatch(addToQueue(music));
  };

  return (
    <div className="liked-music-card">
      <img
        className="liked-music-image"
        src={
          music.coverArt
            ? `http://localhost:3000/${music.coverArt.slice(6)}`
            : ""
        }
        alt=""
      />
      <div className="liked-music-details">
        <div className="liked-music-name">{music.name}</div>
        <div className="liked-music-genre">{music.genre}</div>
        <div className="liked-music-likes music-total-likes">
          <span class="material-symbols-outlined">favorite</span>
          &nbsp; {music.likes.length}
        </div>
      </div>
    </div>
  );
};

export default LikedMusicCard;
