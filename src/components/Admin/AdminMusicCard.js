import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSelector,
  fetchMusicNumbers,
} from "../../features/Admin/AdminSlice";
import { Rings } from "react-loader-spinner";

function AdminMusicCard() {
  const dispatch = useDispatch();

  const {
    isError,
    isFetching,
    isSuccess,
    total_music,
    verified_artist_music,
    views_count,
    music_length,
  } = useSelector(adminSelector);
  useEffect(() => {
    dispatch(fetchMusicNumbers({ token: localStorage.getItem("token") }));
  }, []);
  return (
    <div>
      {isSuccess ? (
        <div class="row p-3 transaction-card-container">
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-blue">
              <div class="card-body text-center">
                <h2>{total_music} Musics</h2>
                <h6>Total Musics</h6>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-yellow">
              <div class="card-body text-center">
                <h2>{verified_artist_music} Musics</h2>
                <h6>Verified Artists Musics</h6>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-green">
              <div class="card-body text-center">
                <h2>{views_count} Times</h2>
                <h6>Views Count</h6>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-xl-3 px-1">
            <div class="card mt-2 rounded gra-red">
              <div class="card-body text-center">
                <h2>{(music_length / 60).toFixed(2)} Minutes</h2>
                <h6>Total music length</h6>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Rings />
      )}
    </div>
  );
}

export default AdminMusicCard;
