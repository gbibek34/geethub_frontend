import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, userSelector } from '../../features/User/UserSlice';
import ImageUploader from '../../helpers/ImageUploader';
import '../../styles/UploadModal.css';
import { toast } from "react-toastify";

const UpdateProfileModal = (props) => {
  const user = useSelector(userSelector);

  const [show, setShow] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [facebook, setFacebook] = useState(user.social.facebook);
  const [instagram, setInstagram] = useState(user.social.instagram);
  const [twitter, setTwitter] = useState(user.social.twitter);
  const [profile_image, setProfileImage] = useState('');
  var [currentProfileImage, setCurrentProfileImage] = useState(user.profile_image);
  const dispatch = useDispatch();

  const handleName = (e) => setName(e.target.value);
  const handleBio = (e) => setBio(e.target.value);
  const handleFacebook = (e) => setFacebook(e.target.value);
  const handleInstagram = (e) => setInstagram(e.target.value);
  const handleTwitter = (e) => setTwitter(e.target.value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        token: localStorage.getItem('token'),
        name,
        bio,
        facebook,
        instagram,
        twitter,
        profile_image,
      })
    );
    handleClose();
    notify("Profile Updated !!");
  };

  const notify = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  return (
    <div>
      <div type='button' onClick={handleShow} className='update-button'>
        <i className='fa-solid fa-user-pen'></i> EDIT PROFILE
      </div>

      <Modal
        className='modal fade'
        id='ProfileModal'
        tabIndex='-1'
        aria-labelledby='ProfileUpdateModalLabel'
        aria-hidden='true'
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className='modal-header' closeButton>
          <Modal.Title className='modal-title' id='ProfileUpdateModalLabel'>
            EDIT PROFILE
          </Modal.Title>
        </Modal.Header>
        <form action='post' onSubmit={onSubmitHandler}>
          <div className='modal-body'>
            <div className='form-group'>
              <label htmlFor='FullName'>Full Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Full Name'
                id='FullName'
                value={name}
                onChange={handleName}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='ProfileBio'>Bio</label>
              <textarea
                type='text'
                className='form-control'
                id='ProfileBio'
                placeholder='Give Short Introduction'
                value={bio}
                onChange={handleBio}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='ProfileVisibility'>Profile Visibility</label>
              <div className="custom-control custom-switch">
                <input className="form-check-input" type="checkbox" value="" id="ProfileVisibility" />
                <label className="form-check-label text-secondary" for="defaultCheck1">
                  Private profile
                </label>
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='ProfileFacebook'>Facebook</label>
              <input
                type='text'
                className='form-control'
                id='ProfileFacebook'
                placeholder='Enter Facebook Username'
                value={facebook}
                onChange={handleFacebook}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='ProfileInstagram'>Instagram</label>
              <input
                type='text'
                className='form-control'
                id='ProfileInstagram'
                placeholder='Enter Instagram Username'
                value={instagram}
                onChange={handleInstagram}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='ProfileTwitter'>Twitter</label>
              <input
                type='text'
                className='form-control'
                id='ProfileTwitter'
                placeholder='Enter Twitter Username'
                value={twitter}
                onChange={handleTwitter}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='UploadProfileImage'>Profile Image</label>
              <ImageUploader
                coverArt={profile_image}
                currentCoverArt={currentProfileImage}
                onFileSelectError={({ error }) => alert(error)}
                onFileSelectSuccess={(file) => setProfileImage(file)}
                onFileClear={() => setProfileImage('')}
                onCurrentCoverArtClear={() => currentProfileImage = setCurrentProfileImage("")}
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

export default UpdateProfileModal;
