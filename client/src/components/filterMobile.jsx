import React, { Component } from "react";
import InputRange from "react-input-range";
import "../styles/filterMobile.css";

class FilterMobile extends Component {
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

    //UI
    appliedFilters: []
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
            onClick={() => {
              handleApplyFilterMinMax(
                filterNameString,
                this.state[filterNameString].min,
                this.state[filterNameString].max
              );
              this.setState({
                appliedFilters: [
                  ...this.state.appliedFilters,
                  filterNameString + ", "
                ]
              });
            }}
          >
            Add
          </button>
        </div>
      </div>
    );
  }

  render() {
    const audioFeatureContent = (
      <div>
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
      <div
        className="modal fade"
        id="filterModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-full" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Filter By: {this.state.appliedFilters}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                {audioFeatureContent}
                {this.renderMinMaxBox("Tempo", 60, 140, "tempo", 1, "")}
                {this.renderMinMaxBox(
                  "Popularity",
                  0,
                  100,
                  "popularity",
                  1,
                  "%"
                )}
              </div>
              <div></div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterMobile;
