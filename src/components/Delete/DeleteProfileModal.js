import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import { deletePlaylist } from "../../features/Playlist/PlaylistSlice";
import {
  deleteUser,
  deleteUserProfile,
  userSelector,
} from "../../features/User/UserSlice";
import { resetMusic } from "../../features/Music/MusicSlice";
import { resetMusics } from "../../features/Music/MusicsSlice";
import { resetNowPlaying } from "../../features/Music/NowPlayingSlice";
import { resetPlaylist } from "../../features/Playlist/PlaylistSlice";
import { resetPlaylists } from "../../features/Playlist/PlaylistsSlice";
import { resetUser } from "../../features/User/UserSlice";
import { resetUsers } from "../../features/User/UsersSlice";
import { resetSearch } from "../../features/Search/SearchSlice";

const DeleteProfileModal = ({ userid }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const { success } = useSelector(userSelector);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = () => {
    dispatch(deleteUserProfile({ token: localStorage.getItem("token") }));
    console.log(success);
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
  };

  return (
    <>
      <div
        type="button"
        className="blank_div"
        data-toggle="modal"
        data-target={`#deleteProfileModal-${userid}`}
      >
        <span
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Delete Playlist"
          className="material-symbols-outlined songs_action_btn"
        >
          delete
        </span>
      </div>

      <div
        className="modal fade"
        id={`deleteProfileModal-${userid}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete your profile?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmitHandler}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteProfileModal;
