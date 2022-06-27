import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import { deletePlaylist } from "../../features/Playlist/PlaylistSlice";

const DeletePlaylistModal = ({ name, playlistId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = () => {
    dispatch(
      deletePlaylist({ token: localStorage.getItem("token"), id: playlistId })
    );
    handleClose();
    navigate("/playlist");
  };

  return (
    <>
      <div
        type="button"
        className="blank_div"
        data-toggle="modal"
        data-target={`#deleteMusicModal-${playlistId}`}
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
        id={`deleteMusicModal-${playlistId}`}
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
              Are you sure you want to delete {name}?
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

export default DeletePlaylistModal;
