import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import GridList from "../common/gridList";

const spotifyApi = new Spotify();
const params = getHashParams();

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
    spotifyApi.setAccessToken(params.access_token);
    this.getPlaylists();
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h2>My Playlists</h2>
          <GridList data={this.state.playLists} />
        </div>
      </React.Fragment>
    );
  }
}

export default Playlists;
