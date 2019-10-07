import React, { Component } from "react";
import InputRange from "react-input-range";
import DropdownButton from "../common/dropdownButton";
import "../styles/spotifyButton.css";
import "react-input-range/lib/css/index.css";
import "../styles/filterTabs.css";

class FilterTabs extends Component {
  state = {
    //audio features
    acousticness: { min: 0, max: 1 },
    danceability: { min: 0, max: 1 },
    energy: { min: 0, max: 1 },
    instrumentalness: { min: 0, max: 1 },
    liveness: { min: 0, max: 1 },
    speechiness: { min: 0, max: 1 },
    valence: { min: 0, max: 1 },

    //other
    tempo: { min: 60, max: 140 },
    popularity: { min: 0, max: 100 },
    mode: null
  };

  renderSelectBox(heading) {
    return (
      <div style={{ padding: "40px" }}>
        <label style={{ marginBottom: "16px" }}>{heading}</label>
        <input type="checkbox" />
      </div>
    );
  }

  renderModeBox() {
    const { handleModalityRadioChange } = this.props;

    return (
      <div>
        <label className="tab-dropdown-heading">Modality</label>
        <form className="radio">
          <div>
            <label>
              <input
                type="radio"
                value="1"
                checked={this.state.mode === 1}
                onChange={handleModalityRadioChange}
              />
              Major
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="0"
                checked={this.state.mode === 0}
                onChange={handleModalityRadioChange}
              />
              Minor
            </label>
          </div>
        </form>
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
    const audioFeatureContent = (
      <div className="tab-dropdown-audioFeatures">
        <div>
          {this.renderMinMaxBox(
            "Acousticness",
            0.0,
            1.0,
            "acousticness",
            0.01,
            ""
          )}
        </div>
        <div>
          {this.renderMinMaxBox(
            "Danceability",
            0.0,
            1.0,
            "danceability",
            0.01,
            ""
          )}
        </div>
        <div>
          {this.renderMinMaxBox("Energy", 0.0, 1.0, "energy", 0.01, "")}
        </div>
        <div>
          {this.renderMinMaxBox(
            "Instrumentalness",
            0.0,
            1.0,
            "instrumentalness",
            0.01,
            ""
          )}
        </div>
        <div>
          {this.renderMinMaxBox("Liveness", 0.0, 1.0, "liveness", 0.01, "")}
        </div>
        <div>
          {this.renderMinMaxBox(
            "Speechiness",
            0.0,
            1.0,
            "speechiness",
            0.01,
            ""
          )}
        </div>
        <div>
          {this.renderMinMaxBox("Valence", 0.0, 1.0, "valence", 0.01, "")}
        </div>
      </div>
    );

    return (
      <div className="tab-container">
        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Audio Features"
          bodyContent={audioFeatureContent}
          dropdownClass="large"
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
          bodyContent={this.renderModeBox()}
        />

        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Length"
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
