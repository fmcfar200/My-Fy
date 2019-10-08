import React, { Component } from "react";
import DropdownButton from "../common/dropdownButton";
import {
  renderKeyBox,
  renderModeBox,
  renderMinMaxBox
} from "../utils/filterRenderer";
import "react-input-range/lib/css/index.css";
import "../styles/spotifyButton.css";
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

  render() {
    const audioFeatureContent = (
      <div className="tab-dropdown-audioFeatures">
        <div>
          {renderMinMaxBox(
            this,
            "Acousticness",
            0.0,
            1.0,
            "acousticness",
            0.01,
            ""
          )}
        </div>
        <div>
          {renderMinMaxBox(
            this,
            "Danceability",
            0.0,
            1.0,
            "danceability",
            0.01,
            ""
          )}
        </div>
        <div>
          {renderMinMaxBox(this, "Energy", 0.0, 1.0, "energy", 0.01, "")}
        </div>
        <div>
          {renderMinMaxBox(
            this,
            "Instrumentalness",
            0.0,
            1.0,
            "instrumentalness",
            0.01,
            ""
          )}
        </div>
        <div>
          {renderMinMaxBox(this, "Liveness", 0.0, 1.0, "liveness", 0.01, "")}
        </div>
        <div>
          {renderMinMaxBox(
            this,
            "Speechiness",
            0.0,
            1.0,
            "speechiness",
            0.01,
            ""
          )}
        </div>
        <div>
          {renderMinMaxBox(this, "Valence", 0.0, 1.0, "valence", 0.01, "")}
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
          bodyContent={renderMinMaxBox(
            this,
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
          bodyContent={renderKeyBox(this.props)}
        />
        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Modality"
          bodyContent={renderModeBox(this.props)}
        />

        {/* <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Length"
          bodyContent="This is the dropdown body"
        /> */}

        <DropdownButton
          buttonClass="btn tab-button"
          buttonLabel="Popularity"
          bodyContent={renderMinMaxBox(
            this,
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
