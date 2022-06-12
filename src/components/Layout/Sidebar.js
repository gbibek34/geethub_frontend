import React, { Fragment, useEffect } from "react";
import "../../styles/Sidebar.css";
import logo from "../../images/Geethub-Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile, userSelector } from "../../features/User/UserSlice";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { profile_image, name } = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem('token');
    localStorage.clear();
    navigate("/login");
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
            <NavLink
              to="/"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">home</span>
              </div>
              <div className="item-name">Home</div>
            </NavLink>
            <NavLink
              to="/search"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">search</span>
              </div>
              <div className="item-name">Search</div>
            </NavLink>
            <NavLink
              to="/playlist"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">album</span>
              </div>
              <div className="item-name">Playlist</div>
            </NavLink>
            <NavLink
              to="/followed"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">piano</span>
              </div>
              <div className="item-name">Followed Artists</div>
            </NavLink>
            <NavLink
              to="/liked"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">favorite</span>
              </div>
              <div className="item-name">Liked Songs</div>
            </NavLink>
          </div>
        </div>
        <div className="sub-class">
          <div className="header">Studio</div>
          <div className="sub-options">
            <NavLink
              to="/profile"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">
                  drive_folder_upload
                </span>
              </div>
              <div className="item-name">Your Uploads</div>
            </NavLink>
            <NavLink
              to="/monetization"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">payments</span>
              </div>
              <div className="item-name">Monetization</div>
            </NavLink>
          </div>
        </div>
        <div className="sub-class">
          <div className="header">Account</div>
          <div className="sub-options">
            <NavLink
              to="/settings"
              className={(navData) =>
                navData.isActive ? "option-item active-option" : "option-item"
              }
            >
              <div className="item-icon">
                <span className="material-symbols-rounded">tune</span>
              </div>
              <div className="item-name">Settings</div>
            </NavLink>
            <div className="option-item" onClick={handleLogout}>
              <div className="item-icon">
                <span className="material-symbols-rounded">logout</span>
              </div>
              <div className="item-name">Logout</div>
            </div>
          </div>
        </div>
        <div className="sidebar-user-overview">
          <Link to="/profile" className="sidebar-profile-picture">
            <img
              src={
                profile_image
                  ? `http://localhost:3000/${profile_image.slice(6)}`
                  : `https://bootdey.com/img/Content/avatar/avatar7.png`
              }
              alt=""
            />
          </Link>
          <div className="sidebar-user-details">
            <Link to="/profile" className="sidebar-profile-name">
              {name}
            </Link>
            <div className="user-coins">
              <span class="material-symbols-rounded">monetization_on</span>
              <div>20</div>
            </div>
          </div>
          <div className="get-more-coins">+ Get More</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
