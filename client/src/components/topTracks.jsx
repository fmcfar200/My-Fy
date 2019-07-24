import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import TrackList from "./trackList";

const TIME_RANGE_SHORT = "short_term";
const TIME_RANGE_MEDIUM = "medium_term";
const TIME_RANGE_LONG = "long_term";

const spotifyApi = new Spotify();
const params = getHashParams();

class TopTracks extends Component {
  state = {
    topTracksLong: [],
    topTracksMedium: [],
    topTracksShort: [],
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
    this.getTracks(TIME_RANGE_LONG);
  }

  render() {
    return (
      <React.Fragment>
        <div style={{ padding: "80px 80px" }}>
          <div>
            <button
              onClick={() => {
                this.getTracks(TIME_RANGE_LONG);
              }}
            >
              All Time
            </button>
            <button
              onClick={() => {
                this.getTracks(TIME_RANGE_MEDIUM);
              }}
            >
              6 Months
            </button>
            <button
              onClick={() => {
                this.getTracks(TIME_RANGE_SHORT);
              }}
            >
              4 Weeks
            </button>
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
