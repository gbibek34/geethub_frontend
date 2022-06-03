import React, { useState, useEffect } from "react";
import PlaylistMusicCard from "../components/PlaylistMusicCard";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MusicPlayer from "../components/MusicPlayer";
import "../styles/artistStyle.css";

import { Rings } from "react-loader-spinner";

import {
  fetchArtistMusic,
  fetchArtistProfile,
  clearState,
  usersSelector,
} from "../features/User/UsersSlice";
import ArtistMusic from "../components/ArtistMusics";

//artist profile screen that displays artist details and music uploads
const ArtistProfileScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { artistid } = useParams();
  useEffect(() => {
    dispatch(
      fetchArtistMusic({ token: localStorage.getItem("token"), artistid })
    );
  }, []);

  useEffect(() => {
    dispatch(
      fetchArtistProfile({ token: localStorage.getItem("token"), artistid })
    );
  }, []);

  const { isFetching, isError, isSuccess, artist, musics } =
    useSelector(usersSelector);

  return (
    <div className="main-container">
      <button className="btn btn-link back_btn_container clr_primaryFG">
        <span className="material-symbols-rounded back_icon  p-0">
          arrow_back_ios
        </span>
        <span>GO BACK</span>
      </button>
      <div className="artist_profile_container mt-0">
        <img
          className="artist_profile_picture my-auto mr-3"
          src={
            artist.profile_image
              ? `http://localhost:3000/${artist.profile_image.slice(6)}`
              : `https://bootdey.com/img/Content/avatar/avatar7.png`
          }
          alt="profile"
        />

        <div className="artist_profile_details">
          <div className="artist_profile_name mb-3">{artist.name}</div>
          <div className="artist_profile_desc mb-2">{artist.bio}</div>
          <div className="artist_profile_all_stats mb-3">
            <div className="artist_profile_stat mr-3">
              {musics.length} UPLOADS
            </div>
            <div className="artist_profile_stat">15 FOLLOWERS</div>
          </div>
          <div className="artist_profile_buttons">
            <button
              type="button"
              className="btn btn-primary btn-main btn-play p-0"
            >
              <span className="material-symbols-rounded play_symbol">
                play_circle
              </span>
            </button>
            <div className="artist_profile_actions">
              <button type="button" className="btn btn-main-outline mr-2">
                <span className="material-symbols-rounded mr-1">
                  person_add
                </span>
                <span>Follow</span>
              </button>
              <button type="button" className="btn btn-primary btn-main">
                <span className="material-symbols-rounded">redeem</span>
                <span>Tip</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ArtistMusic artistid={artistid} />
    </div>
  );
};

export default ArtistProfileScreen;
