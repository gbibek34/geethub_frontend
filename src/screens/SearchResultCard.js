import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function SearchResultCard({ result }) {
  return (
    <div className="indiv_artist_card">
      <Link to={`/artist/${result._id}`}>
        <img
          className="artist_image"
          src={
            result.profile_image
              ? `http://localhost:3000/${result.profile_image.slice(6)}`
              : `https://bootdey.com/img/Content/avatar/avatar7.png`
          }
          alt="profile"
        />
      </Link>
      <div className="artist_name text-center">{result.name}</div>
    </div>
  );
}
``;
