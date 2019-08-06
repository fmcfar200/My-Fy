import React from "react";
import { Link } from "react-router-dom";
import { msToRuntime } from "../utils/msConverter";
import { getArtistString } from "../utils/index";
import "../styles/trackList.css";

const TrackList = props => {
  const data = props.data;
  const theTrackList = data.map(item => {
    var imageUrl = "";
    if (item.album.images[2] !== undefined) {
      imageUrl = item.album.images[2].url;
    }

    return (
      <li key={item.id}>
        <Link to={`/tracks/${item.id}`}>
          <div className="Image-Container">
            <img src={imageUrl} alt="Cover" />
            <div className="Overlay">
              <i className="fas fa-info-circle" />
            </div>
          </div>
          <div className="trackInfo">
            <div style={{ alignItems: "center" }}>
              <h4>{item.name}</h4>
              <p>
                {getArtistString(item.artists)} | {item.album.name}
              </p>
            </div>
            <p>{msToRuntime(item.duration_ms)}</p>
          </div>
        </Link>
      </li>
    );
  });

  return (
    <React.Fragment>
      <ul className="track-list">{theTrackList}</ul>
    </React.Fragment>
  );
};

export default TrackList;
