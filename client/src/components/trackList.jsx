import React from "react";
import "../styles/trackList.css";

const TrackList = props => {
  const data = props.data;
  const theTrackList = data.map(item => (
    <li key={item.id}>
      <img src={item.album.images[2].url} />
      <h4>{item.name}</h4>
      <p>{item.artists[0].name}</p>
    </li>
  ));

  return (
    <React.Fragment>
      <ul className="track-list">{theTrackList}</ul>
    </React.Fragment>
  );
};

export default TrackList;
