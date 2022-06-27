import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/artistStyle.css';

import { Rings } from 'react-loader-spinner';
import {
  fetchMusicInPlaylist,
  fetchPlaylistbyId,
  playlistSelector,
} from '../features/Playlist/PlaylistSlice';
import { updateNowPlayingState } from '../features/Music/NowPlayingSlice';
import PlaylistMusicCard from '../components/Playlist/PlaylistMusicCard';
import DeletePlaylistModal from '../components/Delete/DeletePlaylistModal';
import UpdatePlaylistModal from '../components/Playlist/UpdatePlaylistModal';

//playlist details screen that displays all the music in the playlist
const PlaylistDetailScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { playlistId } = useParams();
  useEffect(() => {
    dispatch(
      fetchMusicInPlaylist({ token: localStorage.getItem('token'), playlistId })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchPlaylistbyId({ token: localStorage.getItem('token'), playlistId })
    );
  }, []);

  const { isFetching, isError, isSuccess, musics, name, description } =
    useSelector(playlistSelector);

  const handlePlayAll = () => {
    dispatch(updateNowPlayingState(musics));
  };

  return (
    <div className='main-container'>
      {/* <button className='btn btn-link back_btn_container clr_primaryFG'>
        <span className='material-symbols-rounded back_icon  p-0'>
          arrow_back_ios
        </span>
        <span>GO BACK</span>
      </button> */}
      {!isFetching ? (
        <div className='artist_profile_container mt-0'>
          <img
            className='artist_profile_picture my-auto mr-3'
            src={
              musics[0]
                ? `http://localhost:3000/${musics[0].coverArt.slice(6)}`
                : `https://bootdey.com/img/Content/avatar/avatar7.png`
            }
            alt='playlist art'
          />

          <div className='artist_profile_details'>
            <div className='artist_profile_name mb-3'>{name}</div>
            <div className='artist_profile_desc mb-2'>{description}</div>
            <div className='artist_profile_all_stats mb-3'>
              <div className='artist_profile_stat mr-3'>
                {musics.length} songs
              </div>
              <div className='artist_profile_stat'>16:49</div>
              <UpdatePlaylistModal />
            </div>
            <div className='artist_profile_buttons'>
              <button
                type='button'
                className='btn btn-primary btn-main btn-play p-0'
                onClick={handlePlayAll}
              >
                <span className='material-symbols-rounded play_symbol'>
                  play_circle
                </span>
              </button>
              <DeletePlaylistModal name={name} playlistId={playlistId} />
            </div>
          </div>
        </div>
      ) : (
        <Rings />
      )}

      <div className='playlist-music'>
        <div className='upload-header'>
          <div className='sub-header'>Music</div>
        </div>
        <div className='playlist-music-container'>
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
  );
};

export default PlaylistDetailScreen;
