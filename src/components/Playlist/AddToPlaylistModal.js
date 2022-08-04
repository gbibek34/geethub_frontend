import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";

import {
  getUserplaylist,
  playlistsSelector,
  addMusicToPlaylist,
} from "../../features/Playlist/PlaylistsSlice";
import { Modal } from "react-bootstrap";
const AddToPlaylistModal = ({ musicId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, errorMessage, playlists } =
    useSelector(playlistsSelector);

  useEffect(() => {
    dispatch(getUserplaylist(localStorage.getItem("token")));
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickHandler = (playlistId) => {
    dispatch(
      addMusicToPlaylist({
        token: localStorage.getItem("token"),
        musicId: musicId,
        playlistId: playlistId,
      })
    );
  };

  return (
    <div>
      <span
        type="button"
        data-toggle="tooltip"
        data-placement="top"
        title="Add to Playlist"
        className="material-symbols-rounded songs_action_btn"
        onClick={handleShow}
        data-target={`#addToPlaylistModal${musicId}`}
      >
        playlist_add
      </span>
      <Modal
        className="modal fade"
        id={`#addToPlaylistModal${musicId}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="MusicUploadModalLabel"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title" id="MusicUploadModalLabel">
            Add to Playlist
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body overflow-auto">
            {!isFetching ? (
              playlists.map((playlist) => (
                <button
                  type="button"
                  onClick={() => onClickHandler(playlist._id)}
                  className="btn btn-outline-secondary w-100 text-left mb-2"
                  key={playlist._id}
                >
                  {playlist.name}
                </button>
              ))
            ) : (
              <Rings />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddToPlaylistModal;
