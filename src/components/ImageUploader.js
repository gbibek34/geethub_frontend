import React, { useRef } from 'react';

const ImageUploader = ({
  coverArt,
  onFileSelectSuccess,
  onFileSelectError,
  onFileClear,
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
        {coverArt && (
          <img
            id='CoverArtPreview'
            src={URL.createObjectURL(coverArt)}
            alt=''
          />
        )}
        {!coverArt && (
          <i
            id='UploadCoverArtBtn2'
            onClick={onIconClick}
            className='cover-upload fa-solid fa-cloud-arrow-up'
          ></i>
        )}
        {coverArt && (
          <i
            className='cover-remove fa-solid fa-xmark'
            onClick={onFileClear}
          ></i>
        )}
      </div>
      <input type='file' id='UploadCoverArt' onChange={handleFileInput} />
    </div>
  );
};

export default ImageUploader;
