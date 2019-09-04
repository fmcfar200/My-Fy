import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import Spotify from "spotify-web-api-js";
import GridList from "../common/gridList";
import { token } from "../utils";
import { Link } from "react-router-dom";
import "../styles/topArtists.css";
import "../styles/topTracks.css";
import ActivityIndicator from "../common/activityIndicator";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

const TIME_RANGE_SHORT = "short_term";
const TIME_RANGE_MEDIUM = "medium_term";
const TIME_RANGE_LONG = "long_term";

class TopArtists extends Component {
  state = {
    loading: true,
    topArtists: [],
    range: TIME_RANGE_LONG
  };

  async componentDidMount() {
    this.getTopArtists(TIME_RANGE_LONG);
  }

  handleButtonClick(e) {
    var i, tabButtons;

    tabButtons = document.getElementsByClassName("tabButton");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    e.currentTarget.className += " active";
  }

  async getTopArtists(range) {
    this.setState({
      loading: true
    });
    spotifyApi
      .getMyTopArtists({ limit: 100, time_range: range })
      .then(response => {
        this.setState({
          topArtists: response.items,
          loading: false,
          range: range
        });
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  render() {
    const { loading, topArtists, range } = this.state;
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
            {!loading && (
              <Link to={`/generator/${"top-artists"}/${range}`}>
                <button
                  className="Spotify-Button Spotify-Button-Play"
                  style={{}}
                >
                  More
                </button>
              </Link>
            )}
          </div>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <GridList
              data={topArtists}
              gridClassName="Top-Artists-Grid"
              routeName="artists"
            />
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default TopArtists;
