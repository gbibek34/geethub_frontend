import React, { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  nowPlayingSelector,
  resetNowPlaying,
  updateIndex,
} from "../../features/Music/NowPlayingSlice";
import { likeMusic, unlikeMusic } from "../../features/Music/MusicSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import "../../styles/MusicPlayer.css";
import empty from "../../images/music-empty.png";
import QueueMusic from "./QueueMusic";
import { userSelector } from "../../features/User/UserSlice";
import { Link } from "react-router-dom";

const MusicPlayer = () => {
  const dispatch = useDispatch();
  const { musics } = useSelector(nowPlayingSelector);
  var playlistIndex = useSelector(nowPlayingSelector).playlistIndex;
  const [artistName, setArtistName] = useState("");
  const [currentSong, setCurrentSong] = useState({});
  const [activeQueue, setActiveQueue] = useState(false);
  const [liked, setLiked] = useState(false);
  const { id } = useSelector(userSelector);
  // const [currentIndex, setCurrentIndex] = useState(playlistIndex);
  useEffect(() => {
    if (musics.length > 0) {
      setCurrentSong(musics[playlistIndex]);
      setLiked(false);
      if (musics[playlistIndex].likes.indexOf(id) !== -1) {
        setLiked(true);
      }
      // fetchArtistById();
    }
  }, [musics, playlistIndex]);

  // const fetchArtistById = async () => {
  //   let response = await axios.get(
  //     "http://localhost:3000/user/" + musics[playlistIndex].uploadedBy,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     }
  //   );
  //   if (response.data.success === true) {
  //     setArtistName(response.data.data.name);
  //   }
  // };

  const activeQueueHandler = () => {
    setActiveQueue(!activeQueue);
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
    <div className="player-container">
      <div className="music-player-container">
        <div className="cover-container">
          <div className="now-playing">NOW PLAYING</div>
          <div className="player-cover-art">
            <img
              className=""
              src={
                currentSong.coverArt
                  ? `http://localhost:3000/${currentSong.coverArt.slice(6)}`
                  : empty
              }
              alt=""
            />
          </div>
          <div className="player-music-details">
            {currentSong.audio ? (
              <>
                <div className="player-music-name">{currentSong.name}</div>
                <Link
                  to={`/artist/${currentSong.uploadedBy._id}`}
                  className="artist-card-name"
                >
                  <div className="player-artist-name">
                    {currentSong.uploadedBy.name}
                  </div>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <AudioPlayer
          src={
            currentSong.audio &&
            `http://localhost:3000/${currentSong.audio.slice(6)}`
          }
          autoPlay
          showSkipControls={true}
          customAdditionalControls={[
            <div>
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
          defaultCurrentTime="0:00"
          defaultDuration="0:00"
          customVolumeControls={[RHAP_UI.VOLUME]}
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
            pause: (
              <FontAwesomeIcon icon={solid("circle-pause")} color="white" />
            ),

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
      </div>
      <div className="queue-puller" onClick={activeQueueHandler}>
        <span className="material-symbols-rounded">
          keyboard_double_arrow_up
        </span>
        <span className="material-symbols-rounded">queue_music</span>
      </div>
      <div
        className={
          activeQueue
            ? "queue-container active-queue-container"
            : "queue-container"
        }
      >
        <div className="queue-header-container">
          {queue.length > 0 ? (
            <>
              <div className="queue-header">YOUR QUEUE</div>
              <div
                type="button"
                onClick={handleClearQueue}
                className="clear-queue-button"
              >
                CLEAR QUEUE
              </div>
            </>
          ) : (
            <div className="queue-header">YOUR QUEUE</div>
          )}
        </div>

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
            <h5>Queue is empty!</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
