import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UploadModal from '../components/Profile/UploadModal';
import '../styles/uploadsCSS.css';
import { fetchMyMusics, musicsSelector } from '../features/Music/MusicsSlice';
import { Rings } from 'react-loader-spinner';
import AllMusicCard from '../components/Music/AllMusicCard';

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

  return (
    <div className='main-container'>
      <div className='page-header'>All Musics</div>
      <div className='uploaded-music'>
        <div className='upload-header'>
          <div className='sub-header'>My Music</div>

          <UploadModal notifyParent={refresh} />
        </div>
        <div className='allmusic-container'>
          {!isFetching ? (
            musics.map((music) => {
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
