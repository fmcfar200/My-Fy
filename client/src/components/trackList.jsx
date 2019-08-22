import React from "react";
import { Link } from "react-router-dom";
import { msToRuntime } from "../utils/msConverter";
import { getArtistString } from "../utils/index";
import Checkbox from "react-simple-checkbox";
import "../styles/trackList.css";

const TrackList = props => {
  const { data, toggle, checkTrack } = props;

  function handleCheck(item) {
    checkTrack(item);
  }

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
            <span className="Name-Artist-Container">
              <span className="Track-Title">
                {item.name}
                <br />
              </span>
              <span className="Track-Artist">
                {getArtistString(item.artists)} | {item.album.name}
              </span>
            </span>
            {!toggle && (
              <p className="Runtime-Text">{msToRuntime(item.duration_ms)}</p>
            )}
          </div>
        </Link>
        {toggle && <input type="checkbox" onClick={() => handleCheck(item)} />}
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
