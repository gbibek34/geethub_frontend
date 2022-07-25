import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import { deleteMusic } from "../../features/Music/MusicSlice";
import { Modal } from "react-bootstrap";

const DeleteMusicModal = ({ music }) => {
  const musicId = music._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteHandler = () => {
    dispatch(
      deleteMusic({ token: localStorage.getItem("token"), id: musicId })
    );
    setShow(false);
  };

  return (
    <div>
      <span
        type="button"
        data-toggle="modal"
        data-placement="top"
        title="Delete Music"
        className="material-symbols-rounded songs_action_btn"
        onClick={handleShow}
        data-target={`#deleteMusicModal-${musicId}`}
      >
        delete
      </span>
      <Modal
        className="modal fade"
        id={`#deleteMusicModal-${musicId}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="MusicDeleteLabel"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title" id="MusicDeleteLabel">
            Delete {music.name}?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {music.name}?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={deleteHandler}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteMusicModal;
