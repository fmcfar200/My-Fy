import React, { Component } from "react";
import InputRange from "react-input-range";
import DropdownButton from "../common/dropdownButton";
import "../styles/spotifyButton.css";
import "react-input-range/lib/css/index.css";
import "../styles/filterTabs.css";

class FilterTabs extends Component {
  state = {
    tempo: { min: 60, max: 140 },
    popularity: { min: 0, max: 100 },
    acousticness: { min: 0, max: 1 }
  };

  renderSelectBox(heading) {
    return (
      <div style={{ padding: "40px" }}>
        <label style={{ marginBottom: "16px" }}>{heading}</label>
        <input type="checkbox" />
      </div>
    );
  }

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
      <div className="tab-dropdown-container">
        <label className="tab-dropdown-heading">{heading}</label>
        <div className="tab-input-container">
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
        </div>
        <div className="tab-dropdown-button-container">
          <button
            className="button-add"
            onClick={() =>
              handleApplyFilterMinMax(
                filterNameString,
                this.state[filterNameString].min,
                this.state[filterNameString].max
              )
            }
          >
            Add
          </button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="tab-container">
        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Audio Features"
          bodyContent={this.renderMinMaxBox(
            "Acousticness",
            0.0,
            1.0,
            "acousticness",
            0.01,
            ""
          )}
        />
        <DropdownButton
          buttonClass="btn tab-button"
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
          buttonClass="btn tab-button"
          buttonLabel="Key"
          bodyContent={this.renderSelectBox("Key")}
        />
        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Modality"
          bodyContent="This is the dropdown body"
        />

        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Length"
          bodyContent="This is the dropdown body"
        />
        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Release Date"
          bodyContent="This is the dropdown body"
        />
        <DropdownButton
          buttonClass="btn tab-button"
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
