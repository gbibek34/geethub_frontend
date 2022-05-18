import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createNewMusic } from '../features/Music/MusicsSlice';
import FileUploader from '../components/FileUploader';

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
        uploadedBy: '6283d941aa182558f39eaa19', //temporary field
        coverArt,
      })
    );
    props.notifyParent();
    handleClose();
  };

  return (
    <div>
      <Button className='' onClick={handleShow}>
        <div className='feed-text px-2'>
          <h6 className='text-black-50 mt-2'>Add a Music</h6>
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Music</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Music Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Music Name'
                  value={name}
                  onChange={handleName}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicDescription'>
                <Form.Label>Music Description</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Music Description'
                  value={description}
                  onChange={handleDescription}
                  required
                />
              </Form.Group>

              {/* <Form.Group className='mb-3' controlId='formBasicEventDate'>
                <Form.Label>Event Date</Form.Label>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Form.Group> */}

              <Form.Group className='mb-3' controlId='formBasicGenre'>
                <Form.Label>Genre</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Genre'
                  value={genre}
                  onChange={handleGenre}
                  required
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicAudio'>
                <Form.Label>Upload Audio File </Form.Label>
                <FileUploader
                  type='audio'
                  onFileSelectError={({ error }) => alert(error)}
                  onFileSelectSuccess={(file) => setAudio(file)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicCoverArt'>
                <Form.Label>Upload Cover Art </Form.Label>
                <FileUploader
                  type='image'
                  onFileSelectError={({ error }) => alert(error)}
                  onFileSelectSuccess={(file) => setCoverArt(file)}
                />
              </Form.Group>

              <Button variant='primary' className='float-right' type='submit'>
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UploadModal;
