import React from 'react';
import { Link } from 'react-router-dom';
import musicCover from '../images/musicCover.png';
import '../styles/mainCSS.css';

export default function PlaylistCard({ playlist }) {
  return (
    <div className='indiv_playlist'>
      <div className='playlist_details'>
        <img src={musicCover} className='playlist_image' />
        <div className='playlist_title'>
          <Link className='playlist_name' to={`/playlist/${playlist._id}`}>
            {playlist.name}
          </Link>
          <div className='playlist_descr'>{playlist.description}</div>
        </div>
      </div>
      <div className='playlist_allstats'>
        <div className='playlist_stat'>
          {playlist.playlistMusic.length}{' '}
          {playlist.playlistMusic.length > 1 ? 'songs' : 'song'}
        </div>
        <div className='playlist_stat'>16:47</div>
        <div className='playlist_stat'>Last modified on 5/15/22</div>
      </div>
    </div>
  );
}
