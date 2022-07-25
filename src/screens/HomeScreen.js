import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UploadModal from "../components/Profile/UploadModal";
import "../styles/homeStyle.css";
// import "../styles/uploadsCSS.css"
import {
  fetchFollowedMusic,
  fetchLatestMusic,
  fetchMyMusics,
  fetchPopularMusic,
  musicsSelector,
} from "../features/Music/MusicsSlice";
import { Rings } from "react-loader-spinner";
import AllMusicCard from "../components/Music/AllMusicCard";
import PopularMusicCard from "../components/Discover-Music/PopularMusicCard";

const HomeScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularMusic({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    dispatch(fetchLatestMusic({ token: localStorage.getItem("token") }));
  }, []);

  useEffect(() => {
    dispatch(fetchFollowedMusic({ token: localStorage.getItem("token") }));
  }, []);

  const {
    isFetching,
    isError,
    isSuccess,
    musics,
    popularmusic,
    latestmusic,
    followedmusic,
  } = useSelector(musicsSelector);

  const refresh = () => {
    if (isSuccess) {
      dispatch(fetchMyMusics(localStorage.getItem("token")));
    }
  };

  return (
    <div className="container-fluid">
      <div className="main-container p-5 w-100">
        <h1 class="remove-h1-mb mb-4">Home</h1>

        <label class="sub-heading mb-0">POPULAR MUSIC</label>
        <div className="card-container mb-4">
          <div className="row">
            {!isFetching ? (
              popularmusic.map((music) => {
                return <PopularMusicCard music={music} key={music._id} />;
              })
            ) : (
              <Rings />
            )}
          </div>
        </div>
        {/* <>Recent music div</> */}
        <label class="sub-heading mb-0">RECENT MUSIC</label>
        <div className="card-container mb-4">
          <div className="row">
            {!isFetching ? (
              latestmusic.map((music) => {
                return <PopularMusicCard music={music} key={music._id} />;
              })
            ) : (
              <Rings />
            )}
          </div>
        </div>
        {/* <>Followed Artist music div</> */}
        <label class="sub-heading mb-0">MUSIC FROM THE ARTIST YOU FOLLOW</label>
        <div className="card-container mb-4">
          <div className="row">
            {!isFetching ? (
              followedmusic.map((music) => {
                return <PopularMusicCard music={music} key={music._id} />;
              })
            ) : (
              <Rings />
            )}
          </div>
        </div>

        {/* <>Followed Artist music div</> */}
        <label class="sub-heading mb-0">RECOMMENDED FOR YOU</label>
        <div className="card-container mb-4">
          <div className="row">
            {!isFetching ? (
              popularmusic.slice(0).reverse().map((music) => {
                return <PopularMusicCard music={music} key={music._id} />;
              })
            ) : (
              <Rings />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
