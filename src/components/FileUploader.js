import React, { useRef } from 'react';

const FileUploader = ({ onFileSelectSuccess, onFileSelectError, type }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // handle validations
    if (type === 'audio') {
      if (file.type === 'audio/mp3' || file.type === 'audio/mpeg') {
        onFileSelectSuccess(file);
      } else {
        onFileSelectError({ error: 'File type must be mp3 or mpeg' });
      }
    }
  };

  return (
    <div className='file-uploader'>
      <input type='file' onChange={handleFileInput} />

      {/* <button
        onClick={(e) => fileInput.current && fileInput.current.click()}
        className='btn btn-primary'
      /> */}
    </div>
  );
};

export default FileUploader;
