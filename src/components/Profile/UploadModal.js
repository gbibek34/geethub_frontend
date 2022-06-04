import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createNewMusic } from '../../features/Music/MusicsSlice';
import '../../styles/UploadModal.css';
import MusicUploader from '../../helpers/MusicUploader';
import ImageUploader from '../../helpers/ImageUploader';

const UploadModal = (props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [audio, setAudio] = useState('');
  const [coverArt, setCoverArt] = useState('');
  const dispatch = useDispatch();

  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleGenre = (e) => setGenre(e.target.value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createNewMusic({
        token: localStorage.getItem('token'),
        name,
        description,
        genre,
        audio,
        coverArt,
      })
    );
    props.notifyParent();
    handleClose();
  };

  return (
    <div>
      <div type='button' onClick={handleShow} className='upload-button'>
        + UPLOAD MUSIC
      </div>

      <Modal
        className='modal fade'
        id='MusicUploadModal'
        tabIndex='-1'
        aria-labelledby='MusicUploadModalLabel'
        aria-hidden='true'
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='modal-title' id='MusicUploadModalLabel'>
            Add Music
          </Modal.Title>
        </Modal.Header>
        <form action='post' onSubmit={onSubmitHandler}>
          <div className='modal-body'>
            <div className='form-group'>
              <label htmlFor='MusicName'>Music Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Music Name'
                id='MusicName'
                value={name}
                onChange={handleName}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='MusicDescription'>Description</label>
              <input
                type='text'
                className='form-control'
                id='MusicDescription'
                placeholder='Enter Music Description'
                value={description}
                onChange={handleDescription}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='MusicGenre'>Genre</label>
              <input
                type='text'
                className='form-control'
                id='MusicGenre'
                placeholder='Enter Genre'
                value={genre}
                onChange={handleGenre}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='MusicFile'>Upload Your Music</label>
              <MusicUploader
                onFileSelectError={({ error }) => alert(error)}
                onFileSelectSuccess={(file) => setAudio(file)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='UploadCoverArt'>Cover Art</label>
              <ImageUploader
                coverArt={coverArt}
                onFileSelectError={({ error }) => alert(error)}
                onFileSelectSuccess={(file) => setCoverArt(file)}
                onFileClear={() => setCoverArt('')}
              />
            </div>
          </div>
          <div className='modal-footer'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UploadModal;

{
  /* <script>
                                                const coverartbtn = document.querySelector("#UploadCoverArt")
                                                const uploadbtn = document.querySelector("#UploadCoverArtBtn2")
                                                const filename = docume.querySelector("#CoverArtFilename")
                                                function uploadCoverArt() {
                                                    coverartbtn.click();
                                                }
                                            </script> */
}
