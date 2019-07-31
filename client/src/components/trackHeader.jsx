import React from "react";

const TrackHeader = props => {
  const {
    albumImageUrl,
    trackName,
    albumName,
    artists,
    spotifyUrl,
    releaseYear
  } = props;
  return (
    <div className="Track-Header">
      <img src={albumImageUrl} alt="Cover" />
      <div className="Track-Meta">
        <h1>{trackName}</h1>
        <h4>
          <span style={{ color: "grey" }}>By </span>
          {artists}
        </h4>
        <h5>
          {albumName} &#183; {releaseYear}
        </h5>
        <a href={spotifyUrl} target="_blank" rel="noopener noreferrer">
          <button
            className="Spotify-Button Spotify-Button-Play"
            style={{ marginTop: "16px" }}
          >
            Play
          </button>
        </a>
      </div>
    </div>
  );
};

export default TrackHeader;
