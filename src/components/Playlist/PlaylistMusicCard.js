import React from "react";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateNowPlayingState,
  addToQueue,
  nowPlayingSelector,
  updateIndex,
} from "../../features/Music/NowPlayingSlice";
import { removeMusicFromPlaylist } from "../../features/Playlist/PlaylistSlice";
import ReportMusicModal from "../Report/ReportMusicModal";
import { Link } from "react-router-dom";
import { updateViewCount } from "../../helpers/UpdateViewCount";
const _ = require("lodash");

const PlaylistMusicCard = ({ playlistId, music, allMusics, item }) => {
  const dispatch = useDispatch();
  const date = new Date(music.uploadedOn).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const { musics } = useSelector(nowPlayingSelector);

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState(allMusics));
    dispatch(updateIndex(item));
    updateViewCount({
      token: localStorage.getItem("token"),
      musicId: music._id,
    });
  };

  const handleRemoveMusic = () => {
    dispatch(
      removeMusicFromPlaylist({
        playlistId: playlistId,
        musicId: music._id,
        token: localStorage.getItem("token"),
      })
    );
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
      console.log(localStorage.getItem("token"));
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
          <span
            data-toggle="tooltip"
            data-placement="top"
            title="Add to queue"
            class="material-symbols-outlined"
            onClick={handleAddToQueue}
          >
            queue_music
          </span>
          <span
            type="button"
            data-toggle="tooltip"
            data-placement="top"
            title="Remove Music"
            className="material-symbols-rounded songs_action_btn"
            onClick={handleRemoveMusic}
          >
            delete
          </span>
          <ReportMusicModal musicId={music._id} />
          <span class="material-symbols-outlined">favorite</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistMusicCard;
