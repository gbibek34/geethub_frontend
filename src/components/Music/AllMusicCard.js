import React from 'react';
import AddToPlaylistModal from '../Playlist/AddToPlaylistModal';
import EditMusicDetailsModal from '../Music/EditMusicDetailsModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNowPlayingState,
  addToQueue,
  nowPlayingSelector,
} from '../../features/Music/NowPlayingSlice';
import ReportMusicModal from '../Report/ReportMusicModal';
import { updateViewCount } from '../../helpers/UpdateViewCount';
const _ = require('lodash');

const AllMusicCard = ({ music }) => {
  const dispatch = useDispatch();
  const date = new Date(music.uploadedOn).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const { musics } = useSelector(nowPlayingSelector);

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([music]));
    updateViewCount({
      token: localStorage.getItem('token'),
      musicId: music._id,
    });
  };

  const handleAddToQueue = () => {
    let equal = false;
    for (let i = 0; i < musics.length; i++) {
      if (_.isEqual(musics[i], music)) {
        equal = true;
      }
    }
    if (equal === false) {
      dispatch(addToQueue(music));
      updateViewCount({
        token: localStorage.getItem('token'),
        musicId: music._id,
      });
    }
  };

  return (
    <div className='indiv_playlist'>
      <div className='playlist_details'>
        <div className='image_container' onClick={handleMusicClick}>
          <img
            src={
              music.coverArt
                ? `http://localhost:3000/${music.coverArt.slice(6)}`
                : ''
            }
            className='playlist_image'
          />
        </div>
        <div className='playlist_title'>
          <div className='playlist_name'>{music.name}</div>
          <div className='playlist_descr'>{music.genre}</div>
        </div>
      </div>
      <div className='playlist_allstats'>
        <div className='playlist_stat'>{music.likes.length} likes</div>
        <AddToPlaylistModal musicId={music._id} />
        <span
          type='button'
          data-toggle='tooltip'
          data-placement='top'
          title='Add to queue'
          className='material-symbols-rounded songs_action_btn'
          onClick={handleAddToQueue}
        >
          queue_music
        </span>
        <EditMusicDetailsModal music={music} />
        <ReportMusicModal musicId={music._id} />
      </div>
    </div>
  );
};

export default AllMusicCard;
