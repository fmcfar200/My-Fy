import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { token } from "../utils";
import * as Sentry from "@sentry/browser";
import { Link } from "react-router-dom";
import ActivityIndicator from "../common/activityIndicator";
import TrackListProvider from "./trackListProvider";
import "../styles/topTracks.css";

const TIME_RANGE_SHORT = "short_term";
const TIME_RANGE_MEDIUM = "medium_term";
const TIME_RANGE_LONG = "long_term";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

class TopTracks extends Component {
  state = {
    loading: true,
    currentList: [],
    range: TIME_RANGE_LONG
  };

  async componentDidMount() {
    this.getTracks(TIME_RANGE_LONG);
  }

  async getTracks(range) {
    this.setState({
      loading: true
    });
    spotifyApi
      .getMyTopTracks({ limit: 100, time_range: range })
      .then(response => {
        this.setState({
          currentList: response.items,
          loading: false,
          range: range
        });
      })
      .catch(err => {
        Sentry.captureException(err);
      });
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
    const { loading, range, currentList } = this.state;
    return (
      <React.Fragment>
        <div>
          <div className="Top-Tracks-Header">
            <h2>Top Tracks</h2>

            <div className="tab">
              <button
                className="tabButton active"
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
            <Link to={`/generator/${"top-tracks"}/${range}`}>
              <button className="Spotify-Button Spotify-Button-Play" style={{}}>
                More
              </button>
            </Link>
          </div>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <React.Fragment>
              <div className="tracklist">
                <TrackListProvider
                  data={currentList}
                  history={this.props.history}
                ></TrackListProvider>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default TopTracks;
