import React, { useEffect, useState } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { nowPlayingSelector } from '../features/Music/NowPlayingSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
} from '@fortawesome/fontawesome-svg-core/import.macro';
import './MusicPlayer.css';
import error from '../images/error.png';
import { musicSelector } from '../features/Music/MusicSlice';
import { fetchUserById } from '../features/User/UserSlice';
import axios from 'axios';

const MusicPlayer = () => {
  const dispatch = useDispatch();

  const { musics } = useSelector(nowPlayingSelector);
  const [artistName, setArtistName] = useState('');
  const [currentSong, setCurrentSong] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (musics.length > 0) {
      setCurrentSong(musics[currentIndex]);
      fetchArtistById();
    }
  });

  const fetchArtistById = async () => {
    let response = await axios.get(
      'http://localhost:3000/user/' + musics[currentIndex].uploadedBy,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
    if (response.data.success === true) {
      setArtistName(response.data.data.name);
    }
  };

  return (
    <div className='m-2'>
      <div className='cover_container'>
        <div className='now_playing'>NOW PLAYING</div>
        <div className='cover_div'>
          <img
            className='cover_art'
            src={
              currentSong.coverArt
                ? `http://localhost:3000/${currentSong.coverArt.slice(6)}`
                : error
            }
            alt=''
          />
        </div>
        <div className='music_name'>{currentSong.name}</div>
        <div className='artist_name'>{artistName}</div>
      </div>
      <AudioPlayer
        src={
          currentSong.audio &&
          `http://localhost:3000/${currentSong.audio.slice(6)}`
        }
        customAdditionalControls={[
          <div
            style={{
              marginRight: '10px',
              marginLeft: '15px',
              paddingLeft: '10px',
            }}
          >
            <FontAwesomeIcon
              icon={solid('heart')}
              className='rhap_heart'
              color='#FFE455'
              size='lg'
            />
          </div>,
        ]}
        defaultCurrentTime='Loading'
        defaultDuration='Loading'
        customVolumeControls={[
          <div style={{ marginLeft: '10px', marginRight: '10px' }}></div>,
          RHAP_UI.VOLUME,
        ]}
        onEnded={() =>
          currentIndex + 1 < musics.length
            ? setCurrentIndex((i) => i + 1)
            : setCurrentIndex(0)
        }
        onClickNext={() =>
          currentIndex + 1 < musics.length
            ? setCurrentIndex((i) => i + 1)
            : setCurrentIndex(0)
        }
        onClickPrevious={() =>
          currentIndex > 0 ? setCurrentIndex((i) => i - 1) : setCurrentIndex(0)
        }
        customIcons={{
          play: <FontAwesomeIcon icon={solid('circle-play')} color='white' />,
          pause: <FontAwesomeIcon icon={solid('circle-pause')} color='white' />,
          rewind: (
            <FontAwesomeIcon
              icon={solid('backward-step')}
              color='white'
              size='xs'
            />
          ),
          forward: (
            <FontAwesomeIcon
              icon={solid('forward-step')}
              color='white'
              size='xs'
            />
          ),
          volume: (
            <FontAwesomeIcon
              icon={solid('volume-high')}
              color='#FFE455'
              size='xs'
            />
          ),
          volumeMute: (
            <FontAwesomeIcon
              icon={solid('volume-xmark')}
              color='yellow'
              size='xs'
            />
          ),
        }}
      />
    </div>
  );
};

export default MusicPlayer;
