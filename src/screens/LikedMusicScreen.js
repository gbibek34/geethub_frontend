import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Rings } from "react-loader-spinner";
import { fetchLikedMusic, musicsSelector } from "../features/Music/MusicsSlice";
import { useNavigate } from "react-router-dom";
import AllMusicCard from "../components/Music/AllMusicCard";
import "../styles/likedMusicStyle.css";
import {
  updateNowPlayingState,
  addToQueue,
} from "../features/Music/NowPlayingSlice";
import LikedMusicCard from "../components/like-unlike/LikedMusicCard";
const LikedMusicScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLikedMusic(localStorage.getItem("token")));
  }, []);

  const handleMusicClick = (music) => {
    dispatch(updateNowPlayingState([music]));
  };

  const { isFetching, isError, isSuccess, likedmusics } =
    useSelector(musicsSelector);

  return (
    <div className="main-container">
      <div className="page-header">Liked Music</div>
      <div className="overflow-auto">
        {!isFetching ? (
          likedmusics.map((music) => {
            return <LikedMusicCard key={music._id} music={music} />;
          })
        ) : (
          <Rings />
        )}
      </div>
    </div>
  );
};

export default LikedMusicScreen;
