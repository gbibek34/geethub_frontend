import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadModal from './UploadModal';
import '../styles/uploadsCSS.css';
import {
  clearState,
  fetchMyMusics,
  musicsSelector,
} from '../features/Music/MusicsSlice';
import { Rings } from 'react-loader-spinner';
import MusicCard from './MusicCard';
import AllMusicCard from './AllMusicCard';
import { updateNowPlayingState, addToQueue } from '../features/Music/NowPlayingSlice';

const AllMusics = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyMusics(localStorage.getItem('token')));
  }, []);

  const { isFetching, isError, isSuccess, musics } =
    useSelector(musicsSelector);

  const refresh = () => {
    if (isSuccess) {
      dispatch(fetchMyMusics(localStorage.getItem('token')));
    }
  };

  const handlePlayAll = () => {
    dispatch(updateNowPlayingState(musics));
  }

  return (
    <div className='main-container'>
      <div className='page-header'>All Musics</div>
      <div className='uploaded-music'>
        <div className='upload-header'>
          <div className='sub-header'>My Music</div>
          <span class="material-symbols-rounded songs_action_btn" onClick={handlePlayAll}>
            add
          </span>
          <UploadModal notifyParent={refresh} />
        </div>
        <div class='allmusic-container'>
          {!isFetching ? (
            musics.map((music) => {
              console.log(music);
              return <AllMusicCard music={music} key={music._id} />;
            })
          ) : (
            <Rings />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMusics;
