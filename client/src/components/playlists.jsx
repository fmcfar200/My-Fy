import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import GridList from "../common/gridList";
import { token } from "../utils";

import "../styles/playlists.css";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

class Playlists extends Component {
  state = {
    playLists: []
  };

  async getPlaylists() {
    spotifyApi.getUserPlaylists({ limit: 50 }).then(response => {
      this.setState({
        playLists: response.items
      });
    });
  }

  async componentDidMount() {
    this.getPlaylists();
  }

  render() {
    const { playLists } = this.state;
    return (
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
    );
  }
}

export default Playlists;
