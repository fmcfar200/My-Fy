import React from "react";

const Grid = props => {
  const {
    duration_ms,
    popularity,
    BPM,
    timeSignature,
    tonalKey,
    bars,
    beats,
    segments,
    sections,
    modality
  } = props;

  return (
    <div className="Track-Grid-Container">
      <div className="Track-Grid-Item">
        <h4>{duration_ms}</h4>
        <p>Duration</p>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{popularity}%</h4>
          <p>Popularity</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{BPM}</h4>
          <p>BPM</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{timeSignature}</h4>
          <p>Time Signature</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{tonalKey}</h4>
          <p>Key</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{bars}</h4>
          <p>Bars</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{beats}</h4>
          <p>Beats</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{segments}</h4>
          <p>Segments</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{sections}</h4>
          <p>Sections</p>
        </div>
      </div>
      <div className="Track-Grid-Item">
        <div>
          <h4>{modality}</h4>
          <p>Modality</p>
        </div>
      </div>
    </div>
  );
};

export default Grid;
