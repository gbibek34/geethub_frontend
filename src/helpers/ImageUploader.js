import React, { useRef } from 'react';

const ImageUploader = ({
  coverArt,
  currentCoverArt,
  onFileSelectSuccess,
  onFileSelectError,
  onFileClear,
  onCurrentCoverArtClear,
}) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // handle validations
    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      onFileSelectSuccess(file);
    } else {
      onFileSelectError({ error: 'File type must be jpeg or png' });
    }
  };

  const onIconClick = () => {
    const input = document.getElementById('UploadCoverArt');

    if (input) {
      input.click();
    }
  };

  return (
    <div>
      <div className='file-wrapper'>
        {(coverArt && !currentCoverArt) &&(
          <img
            id='CoverArtPreview'
            src={URL.createObjectURL(coverArt)}
            alt=''
          />
        )}
        {(!coverArt && currentCoverArt) &&(
          <img
            id='CoverArtPreview'
            src={`http://localhost:3000/${currentCoverArt.slice(6)}`}
            alt=''
          />
        )}
        {(!coverArt && !currentCoverArt) &&(
          <i
            id='UploadCoverArtBtn2'
            onClick={onIconClick}
            className='cover-upload fa-solid fa-cloud-arrow-up'
          ></i>
        )}
        {(coverArt && !currentCoverArt) &&(
          <i
            className='cover-remove fa-solid fa-xmark'
            onClick={onFileClear}
          ></i>
        )}
        {(!coverArt && currentCoverArt) &&(
          <i
            className='cover-remove fa-solid fa-xmark'
            onClick={onCurrentCoverArtClear}
          ></i>
        )}
      </div>
      <input type='file' id='UploadCoverArt' onChange={handleFileInput} />
    </div>
  );
};

export default ImageUploader;
