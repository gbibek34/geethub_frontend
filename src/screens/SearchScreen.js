import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rings } from 'react-loader-spinner';
import {
  usersSelector,
  clearState,
  searchForArtists,
} from '../features/User/UsersSlice';
import '../styles/searchStyle.css';
import SearchResultCard from '../components/Search/SearchResultCard';

export default function SearchArtist() {
  const [searchkey, setsearchkey] = useState('');
  const dispatch = useDispatch();

  const { artists, isFetching, isSuccess, isError, total_results } =
    useSelector(usersSelector);

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
            placeholder='Search for Artists'
          />
          <button
            type='submit'
            className='btn btn-main search_button'
            onClick={() => onClickHandler()}
          >
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
