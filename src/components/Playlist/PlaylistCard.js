import React from "react";
import { Link } from "react-router-dom";
import musicCover from "../../images/musicCover.png";
import "../../styles/PlaylistCard.css";

export default function PlaylistCard({ playlist }) {
  return (
    <Link
      to={`/playlist/${playlist._id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="playlist-card">
        <div className="playlist-card-ls">
          <div className="playlist-image-container">
            <div>
              <img
                className="playlist-grid-tl"
                src={musicCover}
                alt=""
                srcset=""
              />
              <img
                className="playlist-grid-tr"
                src={musicCover}
                alt=""
                srcset=""
              />
              <img
                className="playlist-grid-bl"
                src={musicCover}
                alt=""
                srcset=""
              />
              <img
                className="playlist-grid-br"
                src={musicCover}
                alt=""
                srcset=""
              />
            </div>
            <span class="material-symbols-outlined play-playlist-btn">
              play_circle
            </span>
          </div>
          <div className="playlist-overview">
            <div className="playlist-name">{playlist.name}</div>
            <div className="playlist-description">{playlist.description}</div>
          </div>
        </div>
        <div className="playlist-playtime">37:00</div>

        <div className="playlist-total-songs">
          {playlist.playlistMusic.length}{" "}
          {playlist.playlistMusic.length > 1 ? "songs" : "song"}
        </div>
      </div>
    </Link>
  );
}
