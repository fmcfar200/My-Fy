import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
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
    spotifyApi.getUserPlaylists({ limit: 50 }).then(response => {
      this.setState({
        playLists: response.items,
        loading: false
      });
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
                showNames={true}
              />
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Playlists;
