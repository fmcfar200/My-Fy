import React from "react";
import { Link } from "react-router-dom";
import { msToRuntime } from "../utils/msConverter";
import "../styles/trackList.css";

const TrackList = props => {
  const data = props.data;
  const theTrackList = data.map(item => (
    <li key={item.id}>
      <Link to={`/tracks/${item.id}`}>
        <img src={item.album.images[2].url} />
        <div className="trackInfo">
          <div style={{ alignItems: "center" }}>
            <h4>{item.name}</h4>
            <p>
              {item.artists[0].name} | {item.album.name}
            </p>
          </div>
          <p className="Track-runtime">{msToRuntime(item.duration_ms)}</p>
        </div>
      </Link>
    </li>
  ));

  return (
    <React.Fragment>
      <ul className="track-list">{theTrackList}</ul>
    </React.Fragment>
  );
};

export default TrackList;
