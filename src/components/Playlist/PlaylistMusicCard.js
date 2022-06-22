import React from 'react';
import AddToPlaylistModal from './AddToPlaylistModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateNowPlayingState,
  addToQueue,
  nowPlayingSelector,
  updateIndex,
} from '../../features/Music/NowPlayingSlice';
import { removeMusicFromPlaylist } from '../../features/Playlist/PlaylistSlice';
import { Link } from 'react-router-dom';
const _ = require('lodash');

const PlaylistMusicCard = ({ playlistId, music, allMusics, item }) => {
  const dispatch = useDispatch();
  const date = new Date(music.uploadedOn).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const { musics } = useSelector(nowPlayingSelector);

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState(allMusics));
    dispatch(updateIndex(item));
  };

  const handleRemoveMusic = () => {
    dispatch(
      removeMusicFromPlaylist({
        playlistId: playlistId,
        musicId: music._id,
        token: localStorage.getItem('token'),
      })
    );
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
          <Link
            to={`/artist/${music.uploadedBy._id}`}
            className='artist-card-name'
          >
            <div className='playlist_descr'>{music.uploadedBy.name}</div>
          </Link>
        </div>
      </div>
      <div className='playlist_allstats'>
        <div className='playlist_stat'>5 likes</div>
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
        <span
          type='button'
          data-toggle='tooltip'
          data-placement='top'
          title='Remove Music'
          className='material-symbols-rounded songs_action_btn'
          onClick={handleRemoveMusic}
        >
          delete
        </span>
      </div>
    </div>
  );
};

export default PlaylistMusicCard;
