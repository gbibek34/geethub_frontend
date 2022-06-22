import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  addToQueue,
  nowPlayingSelector,
  updateNowPlayingState,
} from '../../features/Music/NowPlayingSlice';
import AddToPlaylistModal from '../Playlist/AddToPlaylistModal';
const _ = require('lodash');

export default function SearchMusicResultCard({ result }) {
  const dispatch = useDispatch();
  const { musics } = useSelector(nowPlayingSelector);

  const handleMusicClick = () => {
    dispatch(updateNowPlayingState([result]));
  };

  const handleAddToQueue = () => {
    let equal = false;
    for (let i = 0; i < musics.length; i++) {
      if (_.isEqual(musics[i], result)) {
        equal = true;
      }
    }
    if (equal === false) {
      dispatch(addToQueue(result));
    }
  };
  return (
    <div className='indiv_music_search'>
      <div className='playlist_details'>
        <div className='image_container' onClick={handleMusicClick}>
          <img
            src={
              result.coverArt
                ? `http://localhost:3000/${result.coverArt.slice(6)}`
                : ''
            }
            className='playlist_image'
          />
        </div>
        <div className='playlist_title'>
          <div className='playlist_name'>{result.name}</div>
          <div className='playlist_descr'>{result.genre}</div>
        </div>
      </div>
      <div className='playlist_allstats'>
        <div className='playlist_stat'>5 likes</div>
        <AddToPlaylistModal musicId={result._id} />
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
      </div>
    </div>
  );
}
