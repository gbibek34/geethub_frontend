import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  playlistSelector,
  editPlaylist,
} from "../../features/Playlist/PlaylistSlice";
import "../../styles/UploadModal.css";

const UpdatePlaylistModal = (props) => {
  const playlist = useSelector(playlistSelector);

  const [show, setShow] = useState(false);
  const [name, setName] = useState(playlist.name);
  const [description, setDescription] = useState(playlist.description);
  const dispatch = useDispatch();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editPlaylist({
        token: localStorage.getItem("token"),
        playlistId: playlist._id,
        name,
        description,
      })
    );
    handleClose();
  };

  return (
    <div>
      <button type="button" onClick={handleShow} class="btn btn-edit">
        <span class="material-symbols-rounded mr-2">tune</span>
        <span class="f-14">Edit</span>
      </button>

      <Modal
        className="modal fade"
        id="ProfileModal"
        tabIndex="-1"
        aria-labelledby="ProfileUpdateModalLabel"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title" id="ProfileUpdateModalLabel">
            EDIT PLAYLIST
          </Modal.Title>
        </Modal.Header>
        <form action="post" onSubmit={onSubmitHandler}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="Name">Playlist Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Playlist Name"
                id="Name"
                value={name}
                onChange={handleName}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Description">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="Description"
                placeholder="Enter Playlist Description"
                value={description}
                onChange={handleDescription}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdatePlaylistModal;
