import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Rings } from 'react-loader-spinner';
import axios from 'axios';

const ReportMusicModal = ({ musicId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reportTexts = [
    {
      id: 1,
      text: 'Violates Terms & Agreement',
    },
    {
      id: 2,
      text: 'Music is vulgar',
    },
  ];

  const [show, setShow] = useState(false);
  const [selectedReport, setSelectedReport] = useState(-1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickHandler = (textId) => {
    setSelectedReport(textId);
  };

  const onSubmitHandler = () => {
    const reportMusic = async () => {
      try {
        const url = `http://localhost:3000/report/music`;
        const response = await axios.post(
          url,
          {
            text: reportTexts.filter((text) => text.id === selectedReport)[0]
              .text,
            reportedMusic: musicId,
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    reportMusic();
    setSelectedReport(-1);
  };

  return (
    <>
      <div
        type='button'
        className='blank_div'
        data-toggle='modal'
        data-target={`#reportMusicModal-${musicId}`}
      >
        <span
          type='button'
          data-toggle='tooltip'
          data-placement='top'
          title='Report Music'
          className='material-symbols-outlined songs_action_btn'
          style={{ color: 'red' }}
        >
          report
        </span>
      </div>

      <div
        className='modal fade'
        id={`reportMusicModal-${musicId}`}
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalCenterTitle'
        aria-hidden='true'
      >
        <div
          className='modal-dialog modal-dialog-centered modal-dialog-scrollable'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalCenterTitle'>
                Report Music
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body overflow-auto maxH_200'>
              <div className='question_header'>
                Why do you want to report this music?
              </div>
              {reportTexts.map((text) => (
                <button
                  type='button'
                  onClick={() => onClickHandler(text.id)}
                  className={
                    selectedReport === text.id
                      ? 'btn btn-secondary w-100 text-left'
                      : 'btn btn-outline-secondary w-100 text-left'
                  }
                  key={text.id}
                >
                  {text.text}
                </button>
              ))}
            </div>
            <div className='modal-footer'>
              {selectedReport === -1 ? (
                <button
                  type='button'
                  onClick={onSubmitHandler}
                  className='btn btn-primary'
                  disabled
                >
                  Submit
                </button>
              ) : (
                <button
                  type='button'
                  onClick={onSubmitHandler}
                  className='btn btn-primary'
                >
                  Submit
                </button>
              )}
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
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

export default ReportMusicModal;
