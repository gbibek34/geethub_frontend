import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearState,
  fetchMyProfile,
  userSelector,
} from '../features/User/UserSlice';
import './ProfileScreen.css';
import { Rings } from 'react-loader-spinner';
import UpdateProfileModal from '../components/UpdateProfileModal';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyProfile(localStorage.getItem('token')));
  }, []);

  const {
    isFetching,
    isError,
    isSuccess,
    id,
    name,
    email,
    is_authenticated,
    joined_date,
    is_verified,
    bio,
    profile_image,
    music_count,
    followers,
    social,
  } = useSelector(userSelector);

  const refresh = () => {
    if (isSuccess) {
      dispatch(fetchMyProfile(localStorage.getItem('token')));
    }
  };

  return (
    <div className='profile'>
      {isSuccess ? (
        (console.log(''),
        (
          <div className='profile-container'>
            <div className='profile-image'>
              <img
                src={
                  profile_image
                    ? `http://localhost:3000/${profile_image.slice(6)}`
                    : `https://bootdey.com/img/Content/avatar/avatar7.png`
                }
                alt='profile'
              />
            </div>
            <div className='profile-details'>
              <div className='profile-head'>
                <div className='profile-name'>{name}</div>
                <div className='profile-action'>
                  <UpdateProfileModal notifyParent={refresh} />
                </div>
              </div>

              <div className='profile-bio'>{bio}</div>
              <div className='profile-stats'>
                <div className='mr-4'>{music_count} UPLOADS</div>
                <div>{followers} FOLLOWERS</div>
              </div>
              <div className='profile-social'>
                <a
                  href={`http://facebook.com/${social.facebook}`}
                  target='_blank'
                >
                  <i className='fa-brands fa-facebook-square'></i>
                </a>
                <a
                  href={`http://instagram.com/${social.instagram}`}
                  target='_blank'
                >
                  <i className='fa-brands fa-instagram-square'></i>
                </a>
                <a
                  href={`http://twitter.com/${social.twitter}`}
                  target='_blank'
                >
                  <i className='fa-brands fa-twitter-square'></i>
                </a>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Rings />
      )}
    </div>
  );
};

export default ProfileScreen;
