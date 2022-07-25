import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/PlaylistDetail.css";

import { Rings } from "react-loader-spinner";
import {
  fetchMusicInPlaylist,
  fetchPlaylistbyId,
  playlistSelector,
} from "../features/Playlist/PlaylistSlice";
import { updateNowPlayingState } from "../features/Music/NowPlayingSlice";
import PlaylistMusicCard from "../components/Playlist/PlaylistMusicCard";
import DeletePlaylistModal from "../components/Delete/DeletePlaylistModal";
import UpdatePlaylistModal from "../components/Playlist/UpdatePlaylistModal";

//playlist details screen that displays all the music in the playlist
const PlaylistDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { playlistId } = useParams();
  useEffect(() => {
    dispatch(
      fetchMusicInPlaylist({ token: localStorage.getItem("token"), playlistId })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchPlaylistbyId({ token: localStorage.getItem("token"), playlistId })
    );
  }, []);

  const { isFetching, isError, isSuccess, musics, name, description } =
    useSelector(playlistSelector);

  const handlePlayAll = () => {
    dispatch(updateNowPlayingState(musics));
  };

  return (
    <>
      <div className="main-container">
        <div className="detailed-playlist">
          {!isFetching ? (
            <>
              <div className="detail-playlist-overview">
                <div className="detail-playlist-image">
                  <img
                    className="playlist-grid-tl"
                    src={
                      musics[0]
                        ? `http://localhost:3000/${musics[0].coverArt.slice(6)}`
                        : `https://bootdey.com/img/Content/avatar/avatar7.png`
                    }
                    alt=""
                  />
                  <img
                    className="playlist-grid-tr"
                    src={
                      musics[1]
                        ? `http://localhost:3000/${musics[1].coverArt.slice(6)}`
                        : `https://bootdey.com/img/Content/avatar/avatar7.png`
                    }
                    alt=""
                  />
                  <img
                    className="playlist-grid-bl"
                    src={
                      musics[2]
                        ? `http://localhost:3000/${musics[2].coverArt.slice(6)}`
                        : `https://bootdey.com/img/Content/avatar/avatar7.png`
                    }
                    alt=""
                  />
                  <img
                    className="playlist-grid-br"
                    src={
                      musics[3]
                        ? `http://localhost:3000/${musics[3].coverArt.slice(6)}`
                        : `https://bootdey.com/img/Content/avatar/avatar7.png`
                    }
                    alt=""
                  />
                </div>
                <div className="detail-playlist-info">
                  <div className="detail-playlist-name">{name}</div>
                  <div className="detail-playlist-description">
                    {description}
                  </div>
                  <hr />
                  <div className="other-playlist-details">
                    <div className="detail-playlist-total mr-2">
                      {musics.length} Songs
                    </div>
                    <div className="detail-playlist-length">
                      Playtime - 32:40
                    </div>
                  </div>
                </div>
              </div>
              <div className="playlist-action-group mt-2">
                <button
                  type="button"
                  class="btn btn-gradient-hover btn-profile-play"
                  onClick={handlePlayAll}
                >
                  <span class="material-symbols-rounded mr-2">play_circle</span>
                  <span class="f-20">Play</span>
                </button>
                <div className="playlist-action-ud">
                  <UpdatePlaylistModal />
                  <div className="m-2"></div>
                  <DeletePlaylistModal name={name} playlistId={playlistId} />
                </div>
              </div>
            </>
          ) : (
            <Rings />
          )}
          <hr />
          <div className="playlist-music-container">
            {!isFetching ? (
              musics.map((music, index) => {
                return (
                  <PlaylistMusicCard
                    key={music._id}
                    playlistId={playlistId}
                    music={music}
                    item={index}
                    allMusics={musics}
                  />
                );
              })
            ) : (
              <Rings />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistDetailScreen;
