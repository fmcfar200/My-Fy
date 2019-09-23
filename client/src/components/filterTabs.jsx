import React, { Component } from "react";
import InputRange from "react-input-range";
import DropdownButton from "../common/dropdownButton";
import "react-input-range/lib/css/index.css";

class FilterTabs extends Component {
  state = {
    tempo: { min: 60, max: 145 },
    popularity: { min: 0, max: 100 },
    acousticness: { min: 0.0, max: 1.0 }
  };

  renderMinMaxBox(
    heading,
    minValue,
    maxValue,
    filterNameString,
    step,
    formatLabel
  ) {
    const { handleApplyFilterMinMax } = this.props;
    return (
      <div style={{ padding: "40px" }}>
        <label style={{ marginBottom: "16px" }}>{heading}</label>
        <InputRange
          minValue={minValue}
          maxValue={maxValue}
          value={this.state[filterNameString]}
          onChange={theValue => {
            this.setState({ [filterNameString]: theValue });
          }}
          step={step}
          formatLabel={value => `${value}${formatLabel}`}
        />
        <div style={{ display: "flex", marginTop: "40px" }}>
          <button
            onClick={() =>
              handleApplyFilterMinMax(
                filterNameString,
                this.state[filterNameString].min,
                this.state[filterNameString].max
              )
            }
          >
            Apply
          </button>
        </div>
      </div>
    );
  }

  render() {
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
          bodyContent={this.renderMinMaxBox(
            "Acousticness",
            0.0,
            1.0,
            "acousticness",
            0.05,
            ""
          )}
        />
        <DropdownButton
          buttonClass="btn"
          buttonLabel="Tempo"
          bodyContent={this.renderMinMaxBox(
            "Tempo (BPM)",
            60,
            140,
            "tempo",
            1,
            "bpm"
          )}
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
          bodyContent={this.renderMinMaxBox(
            "Popularity",
            0,
            100,
            "popularity",
            1,
            "%"
          )}
        />
      </div>
    );
  }
}

export default FilterTabs;
