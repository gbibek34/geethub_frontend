import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadModal from './UploadModal';
import './MyUploads.css';
import {
  clearState,
  fetchMyMusics,
  musicsSelector,
} from '../features/Music/MusicsSlice';
import { Rings } from 'react-loader-spinner';
import MusicCard from './MusicCard';

const MyUploads = () => {
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

  return (
    // <div>
    //   <p>My Uploads</p>
    //   <UploadModal notifyParent={refresh} />
    //   {!isFetching ? musics.map((music) => <div>{music.name}</div>) : <Rings />}
    // </div>
    <div>
      <div className='container-fluid'>
        <div className='sidebar text-center'>Geethub</div>
        <div className='main-container'>
          <div className='page-header'>My Uploads</div>
          <div className='uploaded-music'>
            <div className='upload-header'>
              <div className='sub-header'>My Music</div>
              <UploadModal notifyParent={refresh} />
            </div>

            <div className='all-music'>
              {!isFetching ? (
                musics.map((music) => {
                  console.log(music);
                  return <MusicCard music={music} key={music._id} />;
                })
              ) : (
                <Rings />
              )}
            </div>
          </div>
        </div>
        <div className='music-status text-center'>Now Playing - Your Mom</div>
      </div>
    </div>
  );
};

export default MyUploads;
