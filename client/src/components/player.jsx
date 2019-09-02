import React, { Component } from "react";
import Spotify from "spotify-web-api-js";

const spotifyApi = new Spotify();

class Player extends Component {
  constructor() {
    super();
    this.state = {
      nowPlaying: {
        name: "Not Checked",
        image: ""
      }
    };
  }

  componentDidMount() {
    if (this.props.params.access_token) {
      spotifyApi.setAccessToken(this.props.params.access_token);
      this.getNowPlaying();
    }
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState().then(response => {
      this.setState({
        nowPlaying: {
          name: response.is_playing ? response.item.name : "Player Inactive",
          image: response.is_playing ? response.item.album.images[0].url : ""
        }
      });
    });
  }

  render() {
    return (
      <div>
        <div>Now Playing: {this.state.nowPlaying.name}</div>
        <div>
          <img src={this.state.nowPlaying.image} style={{ width: 100 }} />
        </div>
        <button onClick={() => this.getNowPlaying()}>Check Now Playing</button>
      </div>
    );
  }
}

export default Player;
