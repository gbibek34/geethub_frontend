import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewPlaylist } from "../../features/Playlist/PlaylistsSlice";

//playlist modal to create a new playlist
const PlaylistModal = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createNewPlaylist({
        token: localStorage.getItem("token"),
        name,
        description,
      })
    );
    props.notifyParent();
    handleClose();
  };

  return (
    <div>
      <div type="button" onClick={handleShow} className="create_new_playlist">
        + CREATE NEW PLAYLIST
      </div>
      <Modal
        className="modal fade"
        // id="create_new_playlist_modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="CreateNewPlaylistLabel"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title" id="CreateNewPlaylistLabel">
            Create new playlist
          </Modal.Title>
        </Modal.Header>
        <form action="post" onSubmit={onSubmitHandler}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="playlist_name" className="">
                Playlist Name
              </label>
              <input
                type="text"
                className="form-control"
                id="playlist_name"
                value={name}
                onChange={handleName}
                aria-describedby="playlistNameHelp"
                placeholder="Name of the playlist"
              />
            </div>
            <div className="form-group">
              <label htmlFor="playlist_desc" className="">
                Playlist Description
              </label>
              <input
                type="text"
                className="form-control"
                id="playlist_desc"
                aria-describedby="playlistDescHelp"
                value={description}
                onChange={handleDescription}
                placeholder="Short description of the playlist"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button type="submit" className="btn btn-secondary">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PlaylistModal;
