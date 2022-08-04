import React, { useEffect, Fragment } from "react";
import "../../styles/Sidebar.css";
import logo from "../../images/logo-pride.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyProfile, userSelector } from "../../features/User/UserSlice";
import { Link, NavLink } from "react-router-dom";
import useLogout from "../../helpers/Logout";

const Sidebar = () => {
  const { profile_image, name, coins } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
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
        {localStorage.getItem("role") === "geethub-admin" ? (
          <>
            <div className="sub-class">
              <div className="header">Admin</div>
              <div className="sub-options">
                <NavLink
                  to="/"
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
                  }
                >
                  <div className="item-icon">
                    <span className="material-symbols-rounded">group</span>
                  </div>
                  <div className="item-name">Users</div>
                </NavLink>
                <NavLink
                  to='/admin/music'
                  className={(navData) =>
                    navData.isActive
                      ? 'option-item active-option'
                      : 'option-item'
                  }
                >
                  <div className='item-icon'>
                    <span className='material-symbols-rounded'>audio_file</span>
                  </div>
                  <div className='item-name'>Musics</div>
                </NavLink>
                <NavLink
                  to='/admin/userverification'
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
                  }
                >
                  <div className="item-icon">
                    <span className="material-symbols-rounded">how_to_reg</span>
                  </div>
                  <div className="item-name">User Verification</div>
                </NavLink>
                <NavLink
                  to="/admin/reportedmusic"
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
                  }
                >
                  <div className="item-icon">
                    <span className="material-symbols-rounded">music_off</span>
                  </div>
                  <div className="item-name">Reported Musics</div>
                </NavLink>
                <NavLink
                  to="/admin/reporteduser"
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
                  }
                >
                  <div className="item-icon">
                    <span className="material-symbols-rounded">
                      manage_accounts
                    </span>
                  </div>
                  <div className="item-name">Reported User</div>
                </NavLink>
                <NavLink
                  to="/admin/monetization"
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
                  }
                >
                  <div className="item-icon">
                    <span className="material-symbols-rounded">payments</span>
                  </div>
                  <div className="item-name">Monetization</div>
                </NavLink>
                <div className="option-item" onClick={handleLogout}>
                  <div className="item-icon">
                    <span className="material-symbols-rounded">logout</span>
                  </div>
                  <div className="item-name">Logout</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="sub-class">
              <div className="header">Menu</div>
              <div className="sub-options">
                <NavLink
                  to="/"
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
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
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
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
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
                  }
                >
                  <div className="item-icon">
                    <span className="material-symbols-rounded">album</span>
                  </div>
                  <div className="item-name">Playlist</div>
                </NavLink>
                <NavLink
                  to="/login"
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
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
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
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
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
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
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
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
                  to="/change-password"
                  className={(navData) =>
                    navData.isActive
                      ? "option-item active-option"
                      : "option-item"
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
                  <span className="material-symbols-rounded">
                    monetization_on
                  </span>
                  <div>{coins}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Sidebar;
