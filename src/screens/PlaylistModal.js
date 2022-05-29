import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createNewPlaylist } from "../features/Playlist/PlaylistsSlice";

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
    console.log("in");
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
      <button
        onClick={handleShow}
        className="btn btn-link create_new_playlist"
        data-toggle="modal"
        data-target="#create_new_playlist_modal"
      >
        + CREATE NEW PLAYLIST
      </button>
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
          <Modal.Title className="modal-title" id="CreateNewPlaylistLabel" >
            Create new playlist
          </Modal.Title>
          
        </Modal.Header>
        <form action="post" onSubmit={onSubmitHandler}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="playlist_name" className="">
                Playlist name
              </label>
              <input
                type="text"
                className="form-control"
                id="playlist_name"
                value={name}
                onChange={handleName}
                aria-describedby="playlistNameHelp"
                placeholder="name for the playlist"
              />
            </div>
            <div className="form-group">
              <label htmlFor="playlist_desc" className="">
                Playlist description
              </label>
              <input
                type="text"
                className="form-control"
                id="playlist_desc"
                aria-describedby="playlistDescHelp"
                value={description}
                onChange={handleDescription}
                placeholder="short description for the playlist"
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
            <button type="submit" className="btn btn-main">
              Create
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PlaylistModal;
