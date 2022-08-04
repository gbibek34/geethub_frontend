import React from "react";
import { useDispatch } from "react-redux";
import {
  updateNowPlayingState,
  addToQueue,
} from "../../features/Music/NowPlayingSlice";
import { updateViewCount } from "../../helpers/UpdateViewCount";

const PopularMusicCard = ({ music }) => {
  const dispatch = useDispatch();
  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([music]));
    updateViewCount({
      token: localStorage.getItem("token"),
      musicId: music._id,
    });
  };

  const handleAddToQueue = () => {
    dispatch(addToQueue(music));
    updateViewCount({
      token: localStorage.getItem("token"),
      musicId: music._id,
    });
  };

  return (
    <div
      className="indiv_artist_card col-sm-4 col-md-3"
      onClick={handleMusicClick}
    >
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

export default PopularMusicCard;
