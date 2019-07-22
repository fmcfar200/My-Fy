import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import TrackList from "./trackList";

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

  getTracks() {
    spotifyApi
      .getMyTopTracks({ limit: 100, time_range: "long_term" })
      .then(response => {
        this.setState({
          topTracksLong: response.items
        });
      });

    spotifyApi
      .getMyTopTracks({ limit: 100, time_range: "medium_term" })
      .then(response => {
        this.setState({
          topTracksMedium: response.items
        });
      });

    spotifyApi
      .getMyTopTracks({ limit: 100, time_range: "short_term" })
      .then(response => {
        this.setState({
          topTracksShort: response.items
        });
      });

    this.setState({
      currentList: this.state.topTracksLong
    });

    console.log(this.state.currentList);
  }

  async componentDidMount() {
    spotifyApi.setAccessToken(params.access_token);
    this.getTracks();
  }
  render() {
    return (
      <React.Fragment>
        <div>
          <button>All Time</button>
          <button>6 Months</button>
          <button>4 Weeks</button>
        </div>
        <TrackList data={this.state.currentList} />
      </React.Fragment>
    );
  }
}

export default TopTracks;
