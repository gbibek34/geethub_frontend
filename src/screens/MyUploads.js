import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UploadModal from '../components/Profile/UploadModal';
import '../styles/MyUploads.css';
import { fetchMyMusics, musicsSelector } from '../features/Music/MusicsSlice';
import { Rings } from 'react-loader-spinner';
import ProfileScreen from './ProfileScreen';
import AllMusicCard from '../components/Music/AllMusicCard';

const MyUploads = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyMusics(localStorage.getItem('token')));
  }, []);

  const { isFetching, isError, isSuccess, musics } =
    useSelector(musicsSelector);

  const refresh = () => {
    if (isSuccess) {
      dispatch(fetchMyMusics(localStorage.getItem('token')));
    }
  };

  return (
    // <div>
    //   <p>My Uploads</p>
    //   <UploadModal notifyParent={refresh} />
    //   {!isFetching ? musics.map((music) => <div>{music.name}</div>) : <Rings />}
    // </div>
    <>
      {/* <div className='container-fluid'> */}
      {/* <div className='sidebar text-center'>
          <h5>Geethub</h5>
          <button
            className='btn btn-outline-warning w-75'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div> */}
      <div className='main-container'>
        <div>
          <ProfileScreen />
        </div>
        {/* <div className='page-header'>My Uploads</div> */}
        <div className='uploaded-music'>
          <div className='upload-header'>
            <div className='sub-header'>My Music</div>
            <UploadModal notifyParent={refresh} />
          </div>

          <div className='all-music'>
            {!isFetching ? (
              musics.map((music) => {
                return <AllMusicCard music={music} key={music._id} />;
              })
            ) : (
              <Rings />
            )}
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};

export default MyUploads;
