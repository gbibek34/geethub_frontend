import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rings } from 'react-loader-spinner';

import '../styles/searchStyle.css';
import SearchArtistResultCard from '../components/Search/SearchArtistResultCard';
import {
  searchSelector,
  clearState,
  resetSearch,
  searchForArtists,
  searchForMusics,
} from '../features/Search/SearchSlice';
import SearchMusicResultCard from '../components/Search/SearchMusicResultCard';
import FilterModal from '../components/Search/FilterModal';

export default function SearchArtist() {
  const [searchkey, setsearchkey] = useState('');
  const dispatch = useDispatch();

  const {
    artists,
    musics,
    filters,
    isFetching,
    isSuccess,
    isError,
    total_musics_results,
    total_artists_results,
  } = useSelector(searchSelector);

  const onClickHandler = () => {
    dispatch(resetSearch());
    if (searchkey) {
      dispatch(
        searchForArtists({
          token: localStorage.getItem('token'),
          searchkey: searchkey,
        })
      );
      dispatch(
        searchForMusics({
          token: localStorage.getItem('token'),
          searchkey: searchkey,
          filters: filters,
        })
      );
    } else {
      dispatch(resetSearch());
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, []);

  return (
    <>
      <div className='main-container'>
        <div className='page-header'>Search</div>
        <div className='p-2 mt-1 search_container w-100'>
          <input
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            className='form-control searchbar'
            type='text'
            placeholder='Search for Music or Artists'
          />
          <button
            type='submit'
            className='btn search_button'
            onClick={() => onClickHandler()}
          >
            Search
          </button>
          <FilterModal />
        </div>
        <div className='search_results_container'>
          {total_musics_results > 0 ? (
            <div className='all_search_categories'>
              <div className='sub-header ml-0'>
                MUSICS &#40;{total_musics_results}&#41;
              </div>
              <div
                className={
                  total_artists_results > 0 && total_musics_results >= 2
                    ? 'all_search_musics py-2 px-4'
                    : 'all_search_musics-full py-2 px-4'
                }
              >
                {!isFetching ? (
                  musics.map((music) => (
                    <SearchMusicResultCard result={music} />
                  ))
                ) : (
                  <Rings />
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          {total_artists_results > 0 ? (
            <div className='all_search_categories'>
              <div className='sub-header ml-0'>
                ARTISTS &#40;{total_artists_results}&#41;
              </div>
              <div className='all_search_artists pt-3 px-4'>
                {!isFetching ? (
                  artists.map((artist) => (
                    <SearchArtistResultCard result={artist} />
                  ))
                ) : (
                  <Rings />
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
