import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";

import "../styles/topArtists.css";
import "../styles/topTracks.css";
import GridList from "../common/gridList";

const spotifyApi = new Spotify();
const params = getHashParams();

const TIME_RANGE_SHORT = "short_term";
const TIME_RANGE_MEDIUM = "medium_term";
const TIME_RANGE_LONG = "long_term";

class TopArtists extends Component {
  state = {
    topArtists: []
  };

  handleButtonClick(e) {
    var i, tabButtons;

    tabButtons = document.getElementsByClassName("tabButton");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    e.currentTarget.className += " active";
  }

  async getTopArtists(range) {
    spotifyApi
      .getMyTopArtists({ limit: 100, time_range: range })
      .then(response => {
        this.setState({
          topArtists: response.items
        });
      });
  }

  async componentDidMount() {
    spotifyApi.setAccessToken(params.access_token);

    this.getTopArtists(TIME_RANGE_LONG);
  }

  render() {
    const { topArtists } = this.state;
    return (
      <React.Fragment>
        <div className="Top-Artists-Container">
          <div className="Top-Artists-Header">
            <h2>Top Artists</h2>
            <div className="tab">
              <button
                className="tabButton active"
                onClick={e => {
                  this.handleButtonClick(e, "className");
                  this.getTopArtists(TIME_RANGE_LONG);
                }}
              >
                All Time
              </button>

              <button
                className="tabButton"
                onClick={e => {
                  this.handleButtonClick(e, "className");
                  this.getTopArtists(TIME_RANGE_MEDIUM);
                }}
              >
                6 Months
              </button>
              <button
                className="tabButton"
                onClick={e => {
                  this.handleButtonClick(e, "className");
                  this.getTopArtists(TIME_RANGE_SHORT);
                }}
              >
                4 Weeks
              </button>
            </div>
          </div>

          <GridList
            data={topArtists}
            gridClassName="Top-Artists-Grid"
            routeName="artists"
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TopArtists;
