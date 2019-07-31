import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import TrackList from "./trackList";
import "../styles/topTracks.css";

const TIME_RANGE_SHORT = "short_term";
const TIME_RANGE_MEDIUM = "medium_term";
const TIME_RANGE_LONG = "long_term";

const spotifyApi = new Spotify();
const params = getHashParams();

class TopTracks extends Component {
  state = {
    currentList: [],
    range: "long_term"
  };

  async getTracks(range) {
    spotifyApi
      .getMyTopTracks({ limit: 100, time_range: range })
      .then(response => {
        this.setState({
          currentList: response.items
        });
      });
  }

  async componentDidMount() {
    spotifyApi.setAccessToken(params.access_token);

    let tabButtons = document.getElementsByClassName("tabButton");
    tabButtons[0].className += " active";
    this.getTracks(TIME_RANGE_LONG);
  }

  handleButtonClick(e) {
    var i, tabButtons;

    tabButtons = document.getElementsByClassName("tabButton");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    e.currentTarget.className += " active";
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ padding: "80px 80px" }}>
          <div className="Top-Tracks-Header">
            <h2>Top Tracks</h2>

            <div className="tab">
              <button
                className="tabButton"
                onClick={e => {
                  this.handleButtonClick(e, "className");
                  this.getTracks(TIME_RANGE_LONG);
                }}
              >
                All Time
              </button>

              <button
                className="tabButton"
                onClick={e => {
                  this.handleButtonClick(e, "className");
                  this.getTracks(TIME_RANGE_MEDIUM);
                }}
              >
                6 Months
              </button>
              <button
                className="tabButton"
                onClick={e => {
                  this.handleButtonClick(e, "className");
                  this.getTracks(TIME_RANGE_SHORT);
                }}
              >
                4 Weeks
              </button>
            </div>
          </div>
          <TrackList
            style={{ padding: "100px 80px" }}
            data={this.state.currentList}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default TopTracks;
