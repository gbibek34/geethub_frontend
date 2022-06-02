import React, { useState, useEffect } from "react";
import axios from "axios";
import AddToPlaylistModal from "../components/AddToPlaylistModal";
import { updateNowPlayingState } from "../features/Music/NowPlayingSlice";
import { useDispatch } from "react-redux";

export default function SearchResultCard({ result }) {
  return (
    <div className="indiv_artist_card">
      <img
        className="artist_image"
        src={
          result.profile_image
            ? `http://localhost:3000/${result.profile_image.slice(6)}`
            : `https://bootdey.com/img/Content/avatar/avatar7.png`
        }
        alt="profile"
      />
      <div className="artist_name text-center">{result.name}</div>
    </div>
  );
}