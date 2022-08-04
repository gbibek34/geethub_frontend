import React from "react";
import { Link } from "react-router-dom";

export default function SearchArtistResultCard({ result }) {
  return (
    <div className="indiv_artist_card">
      <Link to={`/artist/${result._id}`} className="artist-card-name">
        <img
          className="artist_image"
          src={
            result.profile_image
              ? `http://localhost:3000/${result.profile_image.slice(6)}`
              : `https://bootdey.com/img/Content/avatar/avatar7.png`
          }
          alt="profile"
        />

        <div className="result-artist-name text-center">{result.name}</div>
      </Link>
    </div>
  );
}
