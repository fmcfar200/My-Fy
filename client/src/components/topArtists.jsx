import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import { Link } from "react-router-dom";

import "../styles/topArtists.css";
import "../styles/topTracks.css";

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

    let tabButtons = document.getElementsByClassName("tabButton");
    tabButtons[0].className += " active";
    this.getTopArtists(TIME_RANGE_LONG);
  }

  render() {
    const data = this.state.topArtists;
    const artistsList = data.map(item => (
      <Link key={item.id} to={`/artists/${item.id}`}>
        <div>
          <img src={item.images[1].url} alt="Headshot" />
        </div>
      </Link>
    ));
    return (
      <React.Fragment>
        <div className="Top-Artists-Header">
          <h1>Top Artists</h1>
          <div className="tab">
            <button
              className="tabButton"
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

        <div className="Top-Artists-Grid">{artistsList}</div>
      </React.Fragment>
    );
  }
}

export default TopArtists;
