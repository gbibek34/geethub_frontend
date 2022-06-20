import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/artistStyle.css';

import {
  fetchArtistMusic,
  fetchArtistProfile,
  usersSelector,
  followArtist,
  unfollowArtist,
} from '../features/User/UsersSlice';
import ArtistMusic from '../components/Artist/ArtistMusics';
import { updateNowPlayingState } from '../features/Music/NowPlayingSlice';
import { userSelector } from '../features/User/UserSlice';
import ReportUserModal from '../components/Report/ReportUserModal';

//artist profile screen that displays artist details and music uploads
const ArtistProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { artistid } = useParams();
  const { id } = useSelector(userSelector);
  const [followed, setFollowed] = useState(false);
  const {
    isFetching,
    isError,
    isSuccess,
    artist,
    musics,
    followers,
    isFollowed,
  } = useSelector(usersSelector);
  useEffect(() => {
    dispatch(
      fetchArtistMusic({ token: localStorage.getItem('token'), artistid })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchArtistProfile({
        token: localStorage.getItem('token'),
        artistid,
        userId: id,
      })
    );
  }, []);

  useEffect(() => {
    console.log(artist._id !== undefined);
    if (artist._id !== undefined) {
      // console.log(artist.followed_by);
      // console.log(id);
      console.log('1 if condition OUT', followed);
      setFollowed(false);
      if (artist.followed_by.indexOf(id) !== -1) {
        console.log('2 if condition', followed);
        setFollowed(true);
      }
      // if (isFollowed) {
      //   console.log("ee")
      //   setFollowed(true);
      // }
      // else {
      //   setFollowed(false);
      // }
    }
  });

  const handlePlayAll = () => {
    dispatch(updateNowPlayingState(musics));
  };
  const onFollow = () => {
    console.log('3 onFollow', followed);
    setFollowed(true);
    dispatch(
      followArtist({
        token: localStorage.getItem('token'),
        id: artist._id,
      })
    );
  };
  // hello
  const onUnFollow = () => {
    console.log('4 onUnFollow', followed);
    setFollowed(false);
    dispatch(
      unfollowArtist({
        token: localStorage.getItem('token'),
        id: artist._id,
      })
    );
  };

  return (
    <div className='main-container'>
      <div className='artist-header-subcontainer'>
        <div className='artist-header-top'>
          <img
            className='header-image'
            src={
              artist.profile_image
                ? `http://localhost:3000/${artist.profile_image.slice(6)}`
                : `https://bootdey.com/img/Content/avatar/avatar7.png`
            }
            alt='profile'
          />
          <div className='header-right'>
            <div className='header-details'>
              <h1 className='semibold f-inter'>{artist.name} {artist.is_verified? <span className="material-symbols-rounded">
                  verified
                </span>: ""}</h1>
              <p className='sub-heading'>{artist.bio}</p>
              <hr />
              <div className='header-all-stats'>
                <label className='sub-heading'>{musics.length} uploads</label>
                <label className='sub-heading'>{followers} followers</label>
              </div>
            </div>
          </div>
        </div>
        <div className='header-action-bar'>
          <button
            type='button'
            className='btn btn-gradient-hover btn-profile-play'
            onClick={handlePlayAll}
          >
            <span className='material-symbols-rounded symbol-play mr-2'>
              play_circle
            </span>
            <span className='f-20'>Play</span>
          </button>
          <div className='p-0 m-0'>
            {!followed ? (
              <button
                type='button'
                className='btn btn-follow mr-4'
                onClick={onFollow}
              >
                <span className='material-symbols-rounded symbol-follow-inactive mr-2'>
                  person_add
                </span>
                <span className='f-14'>Follow</span>
              </button>
            ) : (
              <button
                type='button'
                className='btn btn-follow mr-4'
                onClick={onUnFollow}
              >
                <span className='material-symbols-rounded symbol-follow-active mr-2'>
                  person_add
                </span>
                <span className='f-14'>Following</span>
              </button>
            )}

            <button
              type='button'
              className='btn btn-gradient-hover btn-alt-tip '
            >
              <span className='material-symbols-rounded symbol-tip mr-2'>
                redeem
              </span>
              <span className='f-14'>Tip</span>
            </button>
            <ReportUserModal userId={artist._id} />
          </div>
        </div>
      </div>
      <ArtistMusic artistid={artistid} />
    </div>
  );
};

export default ArtistProfileScreen;
