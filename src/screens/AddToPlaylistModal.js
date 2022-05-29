import React, { useState, useEffect } from "react";
import { Modal, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";

import {
  getUserplaylist,
  playlistsSelector,
  clearState,
  addMusicToPlaylist,
} from "../features/Playlist/PlaylistsSlice";
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
    <>
      <div
        type="button"
        className="blank_div"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        <span
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title="Add to playlist"
          className="material-symbols-rounded songs_action_btn"
        >
          playlist_add
        </span>
      </div>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Add to playlist
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
            <div className="modal-body overflow-auto maxH_200">
              {!isFetching ? (
                playlists.map((playlist) => (
                  <button
                    type="button"
                    onClick={() => onClickHandler(playlist._id)}
                    className="btn btn-outline-secondary w-100 text-left"
                  >
                    {playlist.name}
                  </button>
                ))
              ) : (
                <Rings />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{musicId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            {!isFetching ? (
              playlists.map((playlist) => (
                <Dropdown.Item
                  eventKey={playlist.id}
                  onClick={() => onClickHandler(playlist._id)}
                >
                  {playlist.name}
                  {playlist._id}
                </Dropdown.Item>
              ))
            ) : (
              <Rings />
            )}
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    </>
  );
};

export default AddToPlaylistModal;
