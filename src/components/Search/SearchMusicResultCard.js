import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToQueue,
  nowPlayingSelector,
  updateNowPlayingState,
} from "../../features/Music/NowPlayingSlice";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
import ReportMusicModal from "../Report/ReportMusicModal";
const _ = require("lodash");

export default function SearchMusicResultCard({ result }) {
  const dispatch = useDispatch();
  const { musics } = useSelector(nowPlayingSelector);

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([result]));
  };

  const handleAddToQueue = () => {
    let equal = false;
    for (let i = 0; i < musics.length; i++) {
      if (_.isEqual(musics[i], result)) {
        equal = true;
      }
    }
    if (equal === false) {
      dispatch(addToQueue(result));
    }
  };
  return (
    <div className="music-card mb-2">
      <div className="lside-music-card">
        <div className="music-cover-art" onClick={handleMusicClick}>
          <img
            src={
              result.coverArt
                ? `http://localhost:3000/${result.coverArt.slice(6)}`
                : ""
            }
            alt=""
          />
          <span class="material-symbols-outlined play-music-btn">
            play_circle
          </span>
        </div>
        <div className="music-information">
          <div className="music-name">{result.name}</div>
          <div className="music-genre-name">{result.genre}</div>
          <div className="music-total-likes">
            <span class="material-symbols-outlined">favorite</span>
            &nbsp; {result.likes.length}
          </div>
        </div>
      </div>
      <div className="mside-music-card">
        <div className="music-playtime">{result.length}</div>
      </div>
      <div className="rside-music-card">
        <div className="music-action-buttons">
          <AddToPlaylistModal musicId={result._id} />
          <span
            data-toggle="tooltip"
            data-placement="top"
            title="Add to queue"
            class="material-symbols-outlined"
            onClick={handleAddToQueue}
          >
            queue_music
          </span>
          <ReportMusicModal musicId={result._id} />
          <span class="material-symbols-outlined">favorite</span>
        </div>
      </div>
    </div>
  );
}
