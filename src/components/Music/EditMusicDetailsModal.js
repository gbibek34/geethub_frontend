import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editMusicDetails } from "../../features/Music/MusicsSlice";
import "../../styles/UploadModal.css";
import ImageUploader from "../../helpers/ImageUploader";
import { fetchMyMusics } from "../../features/Music/MusicsSlice";

const EditMusicDetailsModal = ({ music }) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(music.name);
  const [description, setDescription] = useState(music.description);
  const [genre, setGenre] = useState(music.genre);
  const [coverArt, setCoverArt] = useState("");
  var [currentCoverArt, setCurrentCoverArt] = useState(music.coverArt);
  const dispatch = useDispatch();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleGenre = (e) => setGenre(e.target.value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editMusicDetails({
        token: localStorage.getItem("token"),
        id: music._id,
        name,
        description,
        genre,
        coverArt,
      })
    );
    dispatch(fetchMyMusics(localStorage.getItem("token")));
    handleClose();
  };

  return (
    <div>
      <span
        type="button"
        data-toggle="tooltip"
        data-placement="top"
        title="Edit Music"
        className="material-symbols-rounded songs_action_btn"
        onClick={handleShow}
      >
        tune
      </span>
      <Modal
        className="modal fade"
        id="MusicUploadModal"
        tabIndex="-1"
        aria-labelledby="MusicUploadModalLabel"
        aria-hidden="true"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="modal-header" closeButton>
          <Modal.Title className="modal-title" id="MusicUploadModalLabel">
            Edit Music
          </Modal.Title>
        </Modal.Header>
        <form action="post" onSubmit={onSubmitHandler}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="MusicName">Music Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Music Name"
                id="MusicName"
                value={name}
                onChange={handleName}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="MusicDescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="MusicDescription"
                placeholder="Enter Music Description"
                value={description}
                onChange={handleDescription}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="MusicGenre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="MusicGenre"
                placeholder="Enter Genre"
                value={genre}
                onChange={handleGenre}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="UploadCoverArt">Cover Art</label>
              <ImageUploader
                coverArt={coverArt}
                currentCoverArt={currentCoverArt}
                onFileSelectError={({ error }) => alert(error)}
                onFileSelectSuccess={(file) => setCoverArt(file)}
                onFileClear={() => setCoverArt("")}
                onCurrentCoverArtClear={() =>
                  (currentCoverArt = setCurrentCoverArt(""))
                }
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

export default EditMusicDetailsModal;
