import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateNowPlayingState } from '../features/Music/NowPlayingSlice';

const MusicCard = ({ music }) => {
  const date = new Date(music.uploadedOn).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const dispatch = useDispatch();

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([music]));
  };

  return (
    <div className='music-card'>
      <div className='cover-art' onClick={handleMusicClick}>
        <img
          src={
            music.coverArt
              ? `http://localhost:3000/${music.coverArt.slice(6)}`
              : ''
          }
          alt=''
        />
        <i className='play-button fa-solid fa-circle-play'></i>
      </div>
      <div className='music-details'>
        <div className='major-details'>
          <div className='music-name'>{music.name}</div>
          <div className='music-options'>
            <div className='edit-music'>
              <i className='fa-solid fa-sliders'></i>
            </div>
            <div className='delete-music'>
              <i className='fa-solid fa-trash'></i>
            </div>
          </div>
        </div>
        <div className='other-details'>
          <div className='last-updated'>{date}</div>
          <div className='likes'>
            <i className='fa-solid fa-heart'></i>&nbsp; 253
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
