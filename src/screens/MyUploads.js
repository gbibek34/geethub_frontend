import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadModal from './UploadModal';
import {
  clearState,
  fetchMyMusics,
  musicsSelector,
} from '../features/Music/MusicsSlice';
import { Rings } from 'react-loader-spinner';

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
    <div>
      <p>My Uploads</p>
      <UploadModal notifyParent={refresh} />
      {!isFetching ? musics.map((music) => <div>{music.name}</div>) : <Rings />}
    </div>
  );
};

export default MyUploads;
