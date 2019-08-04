import React from "react";

const PlaylistHeader = props => {
  const {
    coverImageUrl,
    playlistName,
    ownerName,
    trackCount,
    isPublic,
    isCollaborative,
    spotifyUrl
  } = props;
  return (
    <div className="Playlist-Header">
      <img src={coverImageUrl} alt="Cover" />
      <div className="Playlist-Info">
        <h1>{playlistName}</h1>
        <h4>
          <span style={{ color: "grey" }}>Created By </span>
          {ownerName}
        </h4>
        <h5>
          {trackCount} songs &#183; {isPublic ? "public" : "private"}
          {isCollaborative ? <span> &#183; collaborative</span> : ""}
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

export default PlaylistHeader;
