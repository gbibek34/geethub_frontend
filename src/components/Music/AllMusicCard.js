import React from "react";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
import EditMusicDetailsModal from "../Music/EditMusicDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateNowPlayingState,
  addToQueue,
  nowPlayingSelector,
} from "../../features/Music/NowPlayingSlice";
import ReportMusicModal from "../Report/ReportMusicModal";
import DeleteMusicModal from "../Delete/DeleteMusicModal";
import { updateViewCount } from "../../helpers/UpdateViewCount";
import "../../styles/MusicCard.css";

const _ = require("lodash");

const AllMusicCard = ({ music }) => {
  const dispatch = useDispatch();
  const date = new Date(music.uploadedOn).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const { musics } = useSelector(nowPlayingSelector);

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([music]));
    updateViewCount({
      token: localStorage.getItem("token"),
      musicId: music._id,
    });
  };

  const handleAddToQueue = () => {
    let equal = false;
    for (let i = 0; i < musics.length; i++) {
      if (_.isEqual(musics[i], music)) {
        equal = true;
      }
    }
    if (equal === false) {
      dispatch(addToQueue(music));
      updateViewCount({
        token: localStorage.getItem("token"),
        musicId: music._id,
      });
    }
  };

  return (
    <div className="music-card mb-2">
      <div className="lside-music-card">
        <div className="music-cover-art" onClick={handleMusicClick}>
          <img
            src={
              music.coverArt
                ? `http://localhost:3000/${music.coverArt.slice(6)}`
                : ""
            }
            alt=""
          />
          <span class="material-symbols-outlined play-music-btn">
            play_circle
          </span>
        </div>
        <div className="music-information">
          <div className="music-name">{music.name}</div>
          <div className="music-genre-name">{music.genre}</div>
          <div className="music-total-likes">
            <span class="material-symbols-outlined">favorite</span>
            &nbsp; {music.likes.length}
          </div>
        </div>
      </div>
      <div className="mside-music-card">
        <div className="music-playtime">{(music.length/60).toFixed(2)}</div>
      </div>
      <div className="rside-music-card">
        <div className="music-action-buttons">
          <AddToPlaylistModal musicId={music._id} />
          <span
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Add to Queue"
            className="material-symbols-rounded songs_action_btn"
            onClick={handleAddToQueue}
          >
            queue_music
          </span>
          <EditMusicDetailsModal music={music} />
          <DeleteMusicModal music={music} />
        </div>
      </div>
    </div>
  );
};

export default AllMusicCard;
