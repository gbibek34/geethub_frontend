import "../../styles/QueueMusic.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIndex } from "../../features/Music/NowPlayingSlice";

const QueueMusic = ({ queue, currentIndex, item }) => {
  const scroll = () => {
    const section = document.querySelector(".active-queue");
    if (!section) return;
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  scroll();

  const dispatch = useDispatch();

  const ChangeNowPlaying = () => {
    dispatch(updateIndex(item));
  };

  return (
    <div className="queue-main" onClick={ChangeNowPlaying}>
      <div className={currentIndex === item ? "active-queue" : undefined}>
        <div className="queue-card">
          <img
            src={
              queue.coverArt
                ? `http://localhost:3000/${queue.coverArt.slice(6)}`
                : ""
            }
            className="queue-image"
          />
          <div className="queue-details">
            <div className="queue-title">{queue.name}</div>
            <div className="queue-artist">{queue.uploadedBy.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueMusic;
