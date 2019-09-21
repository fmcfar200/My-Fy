import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import * as Sentry from "@sentry/browser";
import GridList from "../common/gridList";
import { token } from "../utils";

import "../styles/playlists.css";
import ActivityIndicator from "../common/activityIndicator";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

class Playlists extends Component {
  state = {
    loading: true,
    playLists: []
  };

  async getPlaylists() {
    var thePlaylists = [];
    spotifyApi
      .getUserPlaylists({ limit: 50 })
      .then(response => {
        thePlaylists = response.items;
        thePlaylists.forEach(playList => {
          if (playList.tracks.total === 0) {
            var index = thePlaylists.indexOf(playList);
            thePlaylists.splice(index, 1);
          }
        });
      })
      .then(() => {
        this.setState({
          playLists: thePlaylists,
          loading: false
        });
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  async componentDidMount() {
    this.getPlaylists();
  }

  render() {
    const { loading, playLists } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <React.Fragment>
            <div className="Playlists-Container">
              <h2>My Playlists</h2>
              <GridList
                data={playLists}
                gridClassName="Playlists-Grid"
                routeName="playlist"
              />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Playlists;
