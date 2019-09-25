import React from "react";
import { Link } from "react-router-dom";
import { msToRuntime } from "../utils/msConverter";
import { getArtistString } from "../utils/index";
import "../styles/trackListLarge.css";
const TrackListLarge = props => {
  const { data, toggle, checkTrack, history } = props;

  function handleCheck(item) {
    checkTrack(item);
  }

  function openItem(item) {
    history.push(`/tracks/${item.id}`);
  }

  const theTrackList = data.map(item => {
    var imageUrl = "";
    if (item.album.images[2] !== undefined) {
      imageUrl = item.album.images[2].url;
    }

    return (
      <tr key={item.id}>
        <td>
          <Link to={`/tracks/${item.id}`}>
            <div className="Image-Container">
              <img src={imageUrl} alt="Cover" />
              <div className="Overlay">
                <i className="fas fa-info-circle" />
              </div>
            </div>
          </Link>
        </td>
        <td className="title" onClick={() => openItem(item)}>
          {item.name}
        </td>
        <td onClick={() => openItem(item)}>{getArtistString(item.artists)}</td>
        <td onClick={() => openItem(item)}>{item.album.name}</td>
        <td className="length">{msToRuntime(item.duration_ms)}</td>
        {toggle && (
          <td>
            {" "}
            <input type="checkbox" onClick={() => handleCheck(item)} />
          </td>
        )}
      </tr>
    );
  });

  return (
    <table className="table table-borderless">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Title</th>
          <th scope="col">Artist</th>
          <th scope="col">Album</th>
          <th scope="col">Length</th>
          {toggle && (
            <th className="th-select" scope="col">
              Select
            </th>
          )}
        </tr>
      </thead>
      <tbody>{theTrackList}</tbody>
    </table>
  );
};

export default TrackListLarge;
