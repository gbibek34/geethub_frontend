import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rings } from 'react-loader-spinner';
import {
  usersSelector,
  clearState,
  usersSlice,
  searchForArtists,
} from '../features/User/UsersSlice';
import './searchStyle.css';
import SearchResultCard from './SearchResultCard';

export default function SearchArtist() {
  const [searchkey, setsearchkey] = useState('');
  const dispatch = useDispatch();
  const onClickHandler = () => {
    if (searchkey) {
      dispatch(
        searchForArtists({
          token: localStorage.getItem('token'),
          searchkey: searchkey,
        })
      );
    } else {
      dispatch(clearState());
    }
  };

  const { artists, isFetching, isSuccess, isError, total_results } =
    useSelector(usersSelector);

  return (
    <>
      <div className='main-container'>
        <div className='page-header'>Search</div>
        <div className='p-2 mt-2 search_container w-100'>
          <input
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            className='form-control searchbar'
            type='text'
            placeholder='search for artists'
          />
          <button
            type='submit'
            className='btn btn-main search_button'
            onClick={() => onClickHandler()}
          >
            <span className='material-symbols-rounded search_icon mr-2'>
              search
            </span>
            Search
          </button>
        </div>
        <div className='sub-header_search'>
          {isSuccess ? (
            <div>
              {total_results} {total_results > 1 ? <> results</> : <>result</>}{' '}
              found for "<i>{searchkey}</i> "
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className='all_search_categories'>
          <div className='sub-header ml-0'>ARTISTS</div>
          <div className='all_search_artists py-3 px-4'>
            {!isFetching ? (
              artists.map((artist) => <SearchResultCard result={artist} />)
            ) : (
              <Rings />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
