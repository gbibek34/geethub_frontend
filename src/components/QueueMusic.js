import "../styles/QueueMusic.css";
import React, { useRef, useEffect } from "react";

const QueueMusic = ({ queue, currentIndex, item }) => {
  console.log(currentIndex);
  const scroll = () => {
    const section = document.querySelector(".active-queue");
    if (!section) return;
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  scroll();

  return (
    <div className="queue-main">
      <div className={currentIndex === item ? "active-queue" : undefined}>
        <div className="queue-card">
          <div className="queue-img-container">
            <img
              src={
                queue.coverArt
                  ? `http://localhost:3000/${queue.coverArt.slice(6)}`
                  : ""
              }
              className="queue-image"
            />
          </div>
          <div className="queue-details">
            <div className="queue-title">{queue.name}</div>
            <div className="queue-artist">{queue.genre}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueMusic;
