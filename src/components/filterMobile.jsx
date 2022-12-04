import React, { Component } from "react";
import Collapsible from "react-collapsible";
import {
  renderKeyBox,
  renderModeBox,
  renderMinMaxBox
} from "../utils/filterRenderer";
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

  renderMinMaxBoxCollapsible(
    heading,
    minValue,
    maxValue,
    filterNameString,
    step,
    formatLabel
  ) {
    return (
      <Collapsible trigger={heading}>
        {renderMinMaxBox(
          this,
          heading,
          minValue,
          maxValue,
          filterNameString,
          step,
          formatLabel
        )}
      </Collapsible>
    );
  }

  renderKeyBoxCollapsible(props) {
    return <Collapsible trigger="Key">{renderKeyBox(props)}</Collapsible>;
  }

  renderModeBoxCollapsible(props) {
    return <Collapsible trigger="Modality">{renderModeBox(props)}</Collapsible>;
  }

  render() {
    const audioFeatureContent = (
      <div>
        <Collapsible trigger="Audio Features">
          <div className="modal-body-content">
            <div>
              {this.renderMinMaxBoxCollapsible(
                "Acousticness",
                0.0,
                1.0,
                "acousticness",
                0.01,
                ""
              )}
            </div>
            <div>
              {this.renderMinMaxBoxCollapsible(
                "Danceability",
                0.0,
                1.0,
                "danceability",
                0.01,
                ""
              )}
            </div>
            <div>
              {this.renderMinMaxBoxCollapsible(
                "Energy",
                0.0,
                1.0,
                "energy",
                0.01,
                ""
              )}
            </div>
            <div>
              {this.renderMinMaxBoxCollapsible(
                "Instrumentalness",
                0.0,
                1.0,
                "instrumentalness",
                0.01,
                ""
              )}
            </div>
            <div>
              {this.renderMinMaxBoxCollapsible(
                "Liveness",
                0.0,
                1.0,
                "liveness",
                0.01,
                ""
              )}
            </div>
            <div>
              {this.renderMinMaxBoxCollapsible(
                "Speechiness",
                0.0,
                1.0,
                "speechiness",
                0.01,
                ""
              )}
            </div>
            <div>
              {this.renderMinMaxBoxCollapsible(
                "Valence",
                0.0,
                1.0,
                "valence",
                0.01,
                ""
              )}
            </div>
          </div>
        </Collapsible>
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
              <div className="modal-body-content">
                {audioFeatureContent}
                {this.renderMinMaxBoxCollapsible(
                  "Tempo",
                  60,
                  140,
                  "tempo",
                  1,
                  ""
                )}
                {this.renderKeyBoxCollapsible(this.props)}
                {this.renderModeBoxCollapsible(this.props)}
                {this.renderMinMaxBoxCollapsible(
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
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterMobile;
