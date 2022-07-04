import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Rings } from "react-loader-spinner";
import axios from "axios";
import "../../styles/artistStyle.css";
import { createTransaction } from "../../features/Tip/TipArtistSlice";

const TipArtistModal = ({ artistid }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [tipAmount, setTipAmount] = useState(0);
  const [remarks, setRemarks] = useState("");

  const onSubmitHandler = () => {
    if (remarks) {
      if (tipAmount > 0 && tipAmount <= 10) {
        dispatch(
          createTransaction({
            token: localStorage.getItem("token"),
            artistid: artistid,
            amount: tipAmount,
            remarks: remarks,
          })
        );
        window.location.reload(false);
      } else {
        console.log("You can not tip more than 10 coins, please try again!!");
      }
    } else {
      console.log(remarks);
    }
  };

  const handleAmount = (e) => {
    if (tipAmount > 10) {
      setTipAmount(10);
    } else {
      setTipAmount(e.target.value);
    }
  };
  const handleRemarks = (e) => setRemarks(e.target.value);

  return (
    <>
      <div
        type="button"
        className="btn btn-gradient-hover btn-alt-tip "
        data-toggle="modal"
        data-target={`#reportMusicModal-${artistid}`}
      >
        <span className="material-symbols-rounded symbol-tip mr-2">redeem</span>
        <span className="f-14">Tip</span>
      </div>

      <div
        className="modal fade"
        id={`reportMusicModal-${artistid}`}
        tabIndex="-1"
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
                Tip the arist
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
            <div className="modal-body overflow-auto maxH_300">
              <form>
                <div className="form-group">
                  <label for="exampleFormControlSelect1">Amount</label>
                  <select
                    className="form-control"
                    id="exampleFormControlSelect1"
                    onChange={handleAmount}
                    value={tipAmount}
                    defaultValue={1}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="exampleFormControlTextarea1">Remarks</label>
                  <textarea
                    onChange={handleRemarks}
                    value={remarks}
                    placeholder="Type your message here!!"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="2"
                  ></textarea>
                </div>
              </form>
              {/* Enter the amount: &nbsp;
              <input
                onChange={handleAmount}
                value={tipAmount}
                type={"Number"}
                min={0}
                max={10}
                step={1}
              />
              <p></p>
              Remarksrks:
              <input
                onChange={handleRemarks}
                value={remarks}
                type="text"
                placeholder="remarks "
              />
              <p></p> */}
              <div style={{ color: "red" }}>
                Note: <br></br> You can send maximum of 10 credits to an artist
                at a time.
              </div>
            </div>
            <div className="modal-footer">
              {tipAmount === 0 && remarks.length == 0 ? (
                <button
                  type="button"
                  onClick={onSubmitHandler}
                  className="btn btn-primary"
                  disabled
                >
                  Submit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onSubmitHandler}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              )}
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
    </>
  );
};

export default TipArtistModal;
