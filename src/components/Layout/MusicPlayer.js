import React, { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  nowPlayingSelector,
  resetNowPlaying,
  updateIndex,
} from "../../features/Music/NowPlayingSlice";
import {
  musicSelector,
  likeMusic,
  unlikeMusic,
} from "../../features/Music/MusicSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "../../styles/MusicPlayer.css";
import error from "../../images/error.png";
import axios from "axios";
import QueueMusic from "./QueueMusic";
import { userSelector } from "../../features/User/UserSlice";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { musics } = useSelector(nowPlayingSelector);
  var playlistIndex = useSelector(nowPlayingSelector).playlistIndex;
  const [artistName, setArtistName] = useState("");
  const [liked, setLiked] = useState(false);
  const [currentSong, setCurrentSong] = useState({});
  const { id } = useSelector(userSelector);
  // const [currentIndex, setCurrentIndex] = useState(playlistIndex);
  useEffect(() => {
    if (musics.length > 0) {
      setCurrentSong(musics[playlistIndex]);
      if (musics[playlistIndex].likes.indexOf(id) !== -1) {
        setLiked(true);
      }
      fetchArtistById();
    }
  }, [musics, playlistIndex]);

  const fetchArtistById = async () => {
    let response = await axios.get(
      "http://localhost:3000/user/" + musics[playlistIndex].uploadedBy,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.data.success === true) {
      setArtistName(response.data.data.name);
    }
  };

  var queue = useSelector((state) => state.nowPlaying.musics);

  const handleClearQueue = () => {
    dispatch(resetNowPlaying());
  };
  // queue = queue.slice(currentIndex + 1);

  const handleLike = () => {
    console.log(currentSong._id);
    setLiked(true);
    dispatch(
      likeMusic({
        token: localStorage.getItem("token"),
        id: currentSong._id,
      })
    );
  };

  const handleUnLike = () => {
    console.log(currentSong._id);
    setLiked(false);
    dispatch(
      unlikeMusic({
        token: localStorage.getItem("token"),
        id: currentSong._id,
      })
    );
  };

  return (
    <div className="m-2">
      <div className="cover_container">
        <div className="now_playing">NOW PLAYING</div>
        <div className="cover_div">
          <img
            className="cover_art"
            src={
              currentSong.coverArt
                ? `http://localhost:3000/${currentSong.coverArt.slice(6)}`
                : error
            }
            alt=""
          />
        </div>
        <div className="nowplaying_music_name">{currentSong.name}</div>
        <div className="nowplaying_artist_name">{artistName}</div>
      </div>
      <AudioPlayer
        src={
          currentSong.audio &&
          `http://localhost:3000/${currentSong.audio.slice(6)}`
        }
        autoPlay
        showSkipControls={true}
        customAdditionalControls={[
          <div
            style={{
              marginRight: "10px",
              marginLeft: "15px",
              paddingLeft: "10px",
            }}
          >
            {!liked ? (
              <FontAwesomeIcon
                icon={regular("heart")}
                className="rhap_heart"
                color="#FFE455"
                size="lg"
                onClick={handleLike}
              />
            ) : (
              <FontAwesomeIcon
                icon={solid("heart")}
                className="rhap_heart"
                color="#FFE455"
                size="lg"
                onClick={handleUnLike}
              />
            )}
          </div>,
        ]}
        defaultCurrentTime="Loading"
        defaultDuration="Loading"
        customVolumeControls={[
          <div style={{ marginLeft: "10px", marginRight: "10px" }}></div>,
          RHAP_UI.VOLUME,
        ]}
        onEnded={() =>
          playlistIndex + 1 < musics.length
            ? dispatch(updateIndex((playlistIndex += 1)))
            : null
        }
        onClickNext={() =>
          playlistIndex + 1 < musics.length
            ? dispatch(updateIndex((playlistIndex += 1)))
            : dispatch(updateIndex((playlistIndex = 0)))
        }
        onClickPrevious={() =>
          playlistIndex > 0
            ? dispatch(updateIndex((playlistIndex -= 1)))
            : dispatch(updateIndex((playlistIndex = 0)))
        }
        customIcons={{
          play: <FontAwesomeIcon icon={solid("circle-play")} color="white" />,
          pause: <FontAwesomeIcon icon={solid("circle-pause")} color="white" />,
          previous: (
            <FontAwesomeIcon
              icon={solid("backward-step")}
              color="white"
              size="xs"
            />
          ),
          next: (
            <FontAwesomeIcon
              icon={solid("forward-step")}
              color="white"
              size="xs"
            />
          ),
          volume: (
            <FontAwesomeIcon
              icon={solid("volume-high")}
              color="#FFE455"
              size="xs"
            />
          ),
          volumeMute: (
            <FontAwesomeIcon
              icon={solid("volume-xmark")}
              color="yellow"
              size="xs"
            />
          ),
        }}
      />
      <div className="queue-container">
        {queue.length > 0 ? (
          <div className="d-flex justify-content-between">
            <div className="queue-header">YOUR QUEUE</div>
            <div
              type="button"
              onClick={handleClearQueue}
              className="clear-queue-button"
            >
              CLEAR QUEUE
            </div>
          </div>
        ) : (
          <div className="queue-header">YOUR QUEUE</div>
        )}

        <div className="queue">
          {queue.length > 0 ? (
            queue.map((queue, index) => {
              return (
                <QueueMusic
                  queue={queue}
                  currentIndex={playlistIndex}
                  item={index}
                  key={index}
                />
              );
            })
          ) : (
            <h5>Queue is empty</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
