import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import { Modal } from "react-bootstrap";

const ReportMusicModal = ({ musicId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reportTexts = [
    {
      id: 1,
      text: "Violates Terms & Agreement",
    },
    {
      id: 2,
      text: "Music is vulgar",
    },
  ];

  const [show, setShow] = useState(false);
  const [selectedReport, setSelectedReport] = useState(-1);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onClickHandler = (textId) => {
    setSelectedReport(textId);
  };

  const onReportHandler = () => {
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
              Authorization: "Bearer " + localStorage.getItem("token"),
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
      <div>
        <span
          type="button"
          data-toggle="modal"
          data-placement="top"
          title="Report Music"
          className="material-symbols-rounded songs_action_btn"
          style={{ color: "red" }}
          onClick={handleShow}
          data-target={`#reportMusicModal-${musicId}`}
        >
          flag
        </span>
        <Modal
          className="modal fade"
          id={`#reportMusicModal-${musicId}`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby="reportMusicModalTitle"
          aria-hidden="true"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title className="modal-title" id="reportMusicModalTitle">
              Why do you want to report this music?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {reportTexts.map((text) => (
              <button
                type="button"
                onClick={() => onClickHandler(text.id)}
                className={
                  selectedReport === text.id
                    ? "btn btn-secondary w-100 text-left mb-2"
                    : "btn btn-outline-secondary w-100 text-left mb-2"
                }
                key={text.id}
              >
                {text.text}
              </button>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
            >
              Close
            </button>
            {selectedReport === -1 ? (
              <button
                type="button"
                onClick={onReportHandler}
                className="btn btn-primary"
                disabled
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={onReportHandler}
                className="btn btn-primary"
              >
                Submit
              </button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ReportMusicModal;
