import React from "react";
import InputRange from "react-input-range";
import DropdownButton from "../common/dropdownButton";
import "react-input-range/lib/css/index.css";

var testValue = { min: 0.2, max: 0.9 };
const FilterTabs = () => {
  var bpmContent = (
    <div style={{ padding: "20px" }}>
      <label style={{ marginBottom: "16px" }}>BPM Range</label>
      <InputRange
        maxValue={1.0}
        minValue={0.0}
        value={testValue}
        onChange={value => {
          testValue = value;
        }}
      />
    </div>
  );
  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        backgroundColor: "grey",
        justifyContent: "space-evenly",
        marginBottom: 8
      }}
    >
      <DropdownButton
        buttonClass="btn btn-1"
        buttonLabel="Audio Features"
        bodyContent="This is the dropdown body"
      />
      <DropdownButton
        buttonClass="btn"
        buttonLabel="BPM"
        bodyContent={bpmContent}
      />
      <DropdownButton
        buttonClass="btn"
        buttonLabel="Key"
        bodyContent="This is the dropdown body"
      />
      <DropdownButton
        buttonClass="btn"
        buttonLabel="Modality"
        bodyContent="This is the dropdown body"
      />

      <DropdownButton
        buttonClass="btn"
        buttonLabel="Length"
        bodyContent="This is the dropdown body"
      />
      <DropdownButton
        buttonClass="btn"
        buttonLabel="Release Date"
        bodyContent="This is the dropdown body"
      />
      <DropdownButton
        buttonClass="btn"
        buttonLabel="Popularity"
        bodyContent="This is the dropdown body"
      />
    </div>
  );
};

export default FilterTabs;
