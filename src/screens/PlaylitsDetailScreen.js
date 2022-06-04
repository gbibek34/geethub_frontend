import React, { useState, useEffect } from 'react';
import PlaylistMusicCard from '../components/PlaylistMusicCard';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MusicPlayer from '../components/MusicPlayer';
import '../styles/artistStyle.css';

import { Rings } from 'react-loader-spinner';
import {
  fetchMusicInPlaylist,
  fetchPlaylistbyId,
  clearState,
  playlistSelector,
} from '../features/Playlist/PlaylistSlice';
import { updateNowPlayingState } from '../features/Music/NowPlayingSlice';

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
              <div className='artist_profile_actions'>
                <button type='button' className='btn btn-main-outline mr-2'>
                  <span className='material-symbols-rounded mr-1'>
                    person_add
                  </span>
                  <span>Follow</span>
                </button>
                <button type='button' className='btn btn-primary btn-main'>
                  <span className='material-symbols-rounded'>redeem</span>
                  <span>Tip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Rings />
      )}

      <div className='uploaded-music'>
        <div className='upload-header'>
          <div className='sub-header'>Music</div>
        </div>
        <div className='allmusic-container'>
          {!isFetching ? (
            musics.map((music) => {
              return <PlaylistMusicCard key={music._id} music={music} />;
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
