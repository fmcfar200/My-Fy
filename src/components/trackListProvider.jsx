import React from "react";
import ReactResizeDetector from "react-resize-detector";
import TrackList from "./trackList";
import TrackListLarge from "./trackListLarge";

const TrackListProvider = props => {
  const { data, toggle, checkTrack, history } = props;

  function renderTrackList(screenWidth, tracks) {
    if (screenWidth >= 768) {
      return (
        <TrackListLarge
          style={{ padding: "100px 80px" }}
          data={tracks}
          toggle={toggle}
          checkTrack={checkTrack}
          history={history}
        />
      );
    } else {
      return (
        <TrackList
          style={{ padding: "100px 80px" }}
          data={tracks}
          toggle={toggle}
          checkTrack={checkTrack}
          history={history}
        />
      );
    }
  }

  return (
    <ReactResizeDetector handleWidth>
      {({ width }) => renderTrackList(width, data)}
    </ReactResizeDetector>
  );
};

export default TrackListProvider;
