import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Rings } from 'react-loader-spinner';
import PlaylistCard from '../components/Playlist/PlaylistCard';
import PlaylistModal from '../components/Playlist/PlaylistModal';

import { useNavigate } from 'react-router-dom';
import {
  getUserplaylist,
  playlistsSelector,
} from '../features/Playlist/PlaylistsSlice';

const MyPlaylists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage, playlists } =
    useSelector(playlistsSelector);

  useEffect(() => {
    dispatch(getUserplaylist(localStorage.getItem('token')));
  }, []);

  const refresh = () => {
    if (isSuccess) {
      dispatch(getUserplaylist(localStorage.getItem('token')));
    }
  };

  // useEffect(() => {
  //   dispatch();
  //   return () => {
  //     dispatch(clearState());
  //   };
  // }, []);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(errorMessage);
  //     dispatch(clearState());
  //   }
  //   if (isSuccess) {
  //     dispatch(clearState());
  //     // navigate("/");
  //   }
  // }, [isError, isSuccess]);
  return (
    <div className='main-container'>
      <div className='page-header'>Playlists</div>
      <div className='all_playlists'>
        <div className='upload-header'>
          <div className='sub-header'>ALL</div>
          <PlaylistModal notifyparent={refresh} />
        </div>
        <div className='overflow-auto'>
          {!isFetching ? (
            playlists.map((playlist) => (
              <PlaylistCard playlist={playlist} key={playlist._id} />
            ))
          ) : (
            <Rings />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPlaylists;
