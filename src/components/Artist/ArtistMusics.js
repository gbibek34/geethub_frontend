import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import '../../styles/mainCSS.css';
import '../../styles/artistStyle.css';
import {
  fetchArtistMusic,
  usersSelector,
} from '../../features/User/UsersSlice';
import ArtistMusicCard from './ArtistMusicCard';

export default function ArtistMusic({ artistid }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchArtistMusic({ token: localStorage.getItem('token'), artistid })
    );
  }, []);
  const { isFetching, isError, isSuccess, musics } = useSelector(usersSelector);

  return (
    <div className='all_playlists mt-0'>
      <div className='upload-header'>
        <div className='sub-header'>ALL</div>
        <button
          className='btn btn-link create_new_playlist'
          data-toggle='modal'
          data-target='#create_new_playlist_modal'
        >
          {musics.length} songs
        </button>
      </div>
      <div className='artist-music-container'>
        {!isFetching ? (
          musics.map((music, index) => {
            return (
              <ArtistMusicCard
                music={music}
                artistMusics={musics}
                item={index}
              />
            );
          })
        ) : (
          <Rings />
        )}
      </div>
    </div>
  );
}
