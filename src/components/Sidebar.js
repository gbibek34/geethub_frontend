import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import logo from '../images/Geethub-Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyProfile, userSelector } from '../features/User/UserSlice';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { profile_image, name } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    dispatch(fetchMyProfile(localStorage.getItem('token')));
  }, []);

  return (
    <div className='sidebar'>
      <div className='logo'>
        <NavLink to='/'>
          <img className='logo-image' src={logo} alt='' />
        </NavLink>

        <NavLink to='/' className='logo-name'>
          GEETHUB
        </NavLink>
      </div>
      <div className='sub-class'>
        <div className='class-header'>MENU</div>
        <NavLink
          to='/'
          className={(navData) =>
            navData.isActive ? 'option active-option' : 'option'
          }
        >
          <div className='option-icon'>
            <i className='fa-solid fa-house'></i>
          </div>
          <div className='option-text'>Home</div>
        </NavLink>
        <NavLink
          to='/playlist'
          className={(navData) =>
            navData.isActive ? 'option active-option' : 'option'
          }
        >
          <div className='option-icon'>
            <i className='fa-solid fa-compact-disc'></i>
          </div>
          <div className='option-text'>Playlist</div>
        </NavLink>
        <NavLink
          to='/followed'
          className={(navData) =>
            navData.isActive ? 'option active-option' : 'option'
          }
        >
          <div className='option-icon'>
            <i className='fa-solid fa-guitar'></i>
          </div>
          <div className='option-text'>Followed Artists</div>
        </NavLink>
        <NavLink
          to='/liked'
          className={(navData) =>
            navData.isActive ? 'option active-option' : 'option'
          }
        >
          <div className='option-icon'>
            <i className='fa-solid fa-heart'></i>
          </div>
          <div className='option-text'>Liked Songs</div>
        </NavLink>
      </div>
      <div className='sub-class'>
        <div className='class-header'>STUDIO</div>
        <NavLink
          to='/profile'
          className={(navData) =>
            navData.isActive ? 'option active-option' : 'option'
          }
        >
          <div className='option-icon'>
            <i className='fa-solid fa-microphone-lines'></i>
          </div>
          <div className='option-text'>Your Uploads</div>
        </NavLink>
        <NavLink
          to='/monetization'
          className={(navData) =>
            navData.isActive ? 'option active-option' : 'option'
          }
        >
          <div className='option-icon'>
            <i className='fa-solid fa-money-bill-transfer'></i>
          </div>
          <div className='option-text'>Monetization</div>
        </NavLink>
      </div>
      <div className='sub-class'>
        <div className='class-header'>ACCOUNT</div>
        <NavLink
          to='/settings'
          className={(navData) =>
            navData.isActive ? 'option active-option' : 'option'
          }
        >
          <div className='option-icon'>
            <i className='fa-solid fa-sliders'></i>
          </div>
          <div className='option-text'>Settings</div>
        </NavLink>
        <div className='option' onClick={handleLogout}>
          <div className='option-icon'>
            <i className='fa-solid fa-right-from-bracket'></i>
          </div>
          <div className='option-text'>Log Out</div>
        </div>
      </div>
      <div className='sidebar-user-overview'>
        <img
          className='sidebar-profile-picture'
          src={
            profile_image
              ? `http://localhost:3000/${profile_image.slice(6)}`
              : `https://bootdey.com/img/Content/avatar/avatar7.png`
          }
          alt=''
        />
        <div className='sidebar-profile-details'>
          <div className='sidebar-profile-name'>{name}</div>
          <div className='wallet-balance'>
            <i className='fa-solid fa-coins vcurrency'></i>
            &nbsp;&nbsp;20
          </div>
        </div>
        <div className='get-more-currency'>GET MORE</div>
      </div>
    </div>
  );
};

export default Sidebar;
