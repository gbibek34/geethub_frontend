import React, { useRef } from 'react';

const MusicUploader = ({ onFileSelectSuccess, onFileSelectError }) => {
  const fileInput = useRef(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    // handle validations
    if (file.type === 'audio/mp3' || file.type === 'audio/mpeg') {
      onFileSelectSuccess(file);
    } else {
      onFileSelectError({ error: 'File type must be mp3 or mpeg' });
    }
  };

  return (
    <input
      type='file'
      className='form-control'
      id='MusicFile'
      onChange={handleFileInput}
      required
    />
  );
};

export default MusicUploader;
