import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/Search/SearchSlice';
const FilterModal = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const toggleShow = () => setShow(!show);
  const presetGenres = ['Hip-Hop', 'Sad', 'Rock', 'Indie', 'Romantic'];
  const [selectedGenres, setSelectedGenres] = useState([]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(setFilters(selectedGenres));
    toggleShow();
  };

  const onFilterAdd = (value) => {
    console.log(value);
    setSelectedGenres([...selectedGenres, value]);
  };
  const onFilterRemove = (value) => {
    const selectedValue = value;
    setSelectedGenres(
      selectedGenres.filter((filter) => filter !== selectedValue)
    );
  };
  return (
    <div>
      <div type='button' onClick={toggleShow} className='filter-button'>
        <span className='d-flex justify-content-between'>
          Filter&nbsp;<i className='fa-solid fa-filter'></i>
        </span>
      </div>
      <div
        className='collapsible-div'
        style={{ display: show ? 'flex' : 'none' }}
      >
        <div className='collapsible-header'>Genres</div>
        <div className='collapsible-body'>
          <form action='post' onSubmit={onSubmitHandler}>
            <div>
              {presetGenres.map((genre) =>
                selectedGenres.includes(genre) ? (
                  <span
                    className='badge badge-pill filter-pill'
                    style={{ backgroundColor: '#FFE455' }}
                    onClick={() => onFilterRemove(genre)}
                  >
                    {genre}&nbsp;<i className='fa-solid fa-xmark'></i>
                  </span>
                ) : (
                  <span
                    className='badge badge-pill badge-light filter-pill'
                    style={{ backgroundColor: '#efefef' }}
                    onClick={() => onFilterAdd(genre)}
                  >
                    {genre}
                  </span>
                )
              )}
            </div>
            <button type='submit' className='btn save-btn-filter'>
              Save
            </button>
          </form>
        </div>
      </div>
      {/* <Modal
        className='modal fade'
        id='FilterUploadModal'
        tabIndex='-1'
        aria-labelledby='FilterModalLabel'
        aria-hidden='true'
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='modal-title' id='FilterModalLabel'>
            Filters
          </Modal.Title>
        </Modal.Header>
        <form action='post' onSubmit={onSubmitHandler}>
          <div className='modal-body'>
            {presetGenres.map((genre) =>
              selectedGenres.includes(genre) ? (
                <span
                  className='badge badge-pill badge-primary filter-pill'
                  onClick={() => onFilterRemove(genre)}
                >
                  {genre}&nbsp;<i className='fa-solid fa-xmark'></i>
                </span>
              ) : (
                <span
                  className='badge badge-pill badge-light filter-pill'
                  onClick={() => onFilterAdd(genre)}
                >
                  {genre}
                </span>
              )
            )}
          </div>
          <div className='modal-footer'>
            <button type='submit' className='btn btn-primary'>
              Save
            </button>
          </div>
        </form>
      </Modal> */}
    </div>
  );
};

export default FilterModal;
