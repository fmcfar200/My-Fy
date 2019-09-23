import React, { Component } from "react";
import InputRange from "react-input-range";
import DropdownButton from "../common/dropdownButton";
import "react-input-range/lib/css/index.css";

class FilterTabs extends Component {
  state = {
    bpmValue: { min: 60, max: 145 }
  };

  render() {
    const { handleApplyFilterMinMax } = this.props;
    var bpmContent = (
      <div style={{ padding: "40px" }}>
        <label style={{ marginBottom: "16px" }}>BPM Range</label>
        <InputRange
          minValue={60}
          maxValue={145}
          value={this.state.bpmValue}
          onChange={bpmValue => {
            this.setState({ bpmValue });
          }}
        />
        <div style={{ display: "flex", marginTop: "40px" }}>
          <button
            onClick={() =>
              handleApplyFilterMinMax(
                "tempo",
                this.state.bpmValue.min,
                this.state.bpmValue.max
              )
            }
          >
            Apply
          </button>
        </div>
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
  }
}

export default FilterTabs;
