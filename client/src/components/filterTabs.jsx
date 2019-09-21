import React from "react";

const FilterTabs = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        backgroundColor: "grey",
        justifyContent: "space-evenly"
      }}
    >
      <button>Audio Features</button>
      <button>BPM</button>
      <button>Key</button>
      <button>Modality</button>
      <button>Length</button>
      <button>Release Date</button>
      <button>Popularity</button>
    </div>
  );
};

export default FilterTabs;
