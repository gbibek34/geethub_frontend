import React, { useEffect, useState, Fragment } from "react";
import "../../styles/Sidebar.css";
import logo from "../../images/logo-pride.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile, userSelector } from "../../features/User/UserSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { resetMusic } from "../../features/Music/MusicSlice";
import { resetMusics } from "../../features/Music/MusicsSlice";
import { resetNowPlaying } from "../../features/Music/NowPlayingSlice";
import { resetPlaylist } from "../../features/Playlist/PlaylistSlice";
import { resetPlaylists } from "../../features/Playlist/PlaylistsSlice";
import { resetUser } from "../../features/User/UserSlice";
import { resetUsers } from "../../features/User/UsersSlice";
import { resetSearch } from "../../features/Search/SearchSlice";

const AdminSidebar = () => {
  const { profile_image, name } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.clear();
    dispatch(resetMusic());
    dispatch(resetMusics());
    dispatch(resetNowPlaying());
    dispatch(resetPlaylist());
    dispatch(resetPlaylists());
    dispatch(resetUser());
    dispatch(resetUsers());
    dispatch(resetSearch());
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchMyProfile(localStorage.getItem("token")));
  }, []);

  return (
    <Fragment>
      <div className="sidebar">
        <div className="logo">
          <NavLink to="/">
            <img src={logo} alt="" />
          </NavLink>

          <NavLink className="brand-name" to="/">
            GEETHUB
          </NavLink>
        </div>
        <div className="sub-class">
          <div className="header">Menu</div>
          <div className="sub-options">
            <div className="item-icon">
              <span className="material-symbols-rounded">home</span>
            </div>
            <div className="item-name">Home</div>

            <div className="item-icon">
              <span className="material-symbols-rounded">search</span>
            </div>
            <div className="item-name">Search</div>

            <div className="item-icon">
              <span className="material-symbols-rounded">album</span>
            </div>
            <div className="item-name">Playlist</div>

            <div className="item-icon">
              <span className="material-symbols-rounded">piano</span>
            </div>
            <div className="item-name">Followed Artists</div>

            <div className="item-icon">
              <span className="material-symbols-rounded">favorite</span>
            </div>
            <div className="item-name">Liked Songs</div>
          </div>
        </div>
        <div className="sub-class">
          <div className="header">Studio</div>
          <div className="sub-options">
            <div className="item-icon">
              <span className="material-symbols-rounded">
                drive_folder_upload
              </span>
            </div>
            <div className="item-name">Your Uploads</div>

            <div className="item-icon">
              <span className="material-symbols-rounded">payments</span>
            </div>
            <div className="item-name">Monetization</div>
          </div>
        </div>
        <div className="sub-class">
          <div className="header">Account</div>
          <div className="sub-options">
            <div className="item-icon">
              <span className="material-symbols-rounded">tune</span>
            </div>
            <div className="item-name">Settings</div>

            <div className="option-item" onClick={handleLogout}>
              <div className="item-icon">
                <span className="material-symbols-rounded">logout</span>
              </div>
              <div className="item-name">Logout</div>
            </div>
          </div>
        </div>
        <div className="sidebar-user-overview">
          {/* <img
            src={
              profile_image
                ? `http://localhost:3000/${profile_image.slice(6)}`
                : `https://bootdey.com/img/Content/avatar/avatar7.png`
            }
            alt=""
          /> */}

          <div className="sidebar-user-details">
            {name}
            {/* <Link to="/profile" className="sidebar-profile-name">
          
            </Link> */}
            <div className="user-coins">
              <span className="material-symbols-rounded">monetization_on</span>
              <div>20</div>
            </div>
          </div>
          <div className="get-more-coins">+ Get More</div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminSidebar;
