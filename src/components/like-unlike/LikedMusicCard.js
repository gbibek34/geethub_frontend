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
    <div className="indiv_artist_card col-3" onClick={handleMusicClick}>
      <img
        className="artist_image"
        src={
          music.coverArt
            ? `http://localhost:3000/${music.coverArt.slice(6)}`
            : ""
        }
      />
      <div className="artist_name text-center">{music.name}</div>
    </div>
  );
};

export default LikedMusicCard;
