import React from "react";
import AddToPlaylistModal from "../Playlist/AddToPlaylistModal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateNowPlayingState,
  addToQueue,
  nowPlayingSelector,
  updateIndex,
} from "../../features/Music/NowPlayingSlice";
import { updateViewCount } from "../../helpers/UpdateViewCount";
import { Link } from "react-router-dom";
import ReportMusicModal from "../Report/ReportMusicModal";
const _ = require("lodash");

const ArtistMusicCard = ({ music, artistMusics, item }) => {
  const dispatch = useDispatch();
  const date = new Date(music.uploadedOn).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const { musics } = useSelector(nowPlayingSelector);

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState(artistMusics));
    dispatch(updateIndex(item));
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
          <Link
            to={`/artist/${music.uploadedBy._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="music-artist-name">{music.uploadedBy.name}</div>
          </Link>
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
            data-toggle="tooltip"
            data-placement="top"
            title="Add to queue"
            class="material-symbols-outlined"
            onClick={handleAddToQueue}
          >
            queue_music
          </span>
          <ReportMusicModal musicId={music._id} />
          <span class="material-symbols-outlined">favorite</span>
        </div>
      </div>
    </div>
  );
};

export default ArtistMusicCard;
