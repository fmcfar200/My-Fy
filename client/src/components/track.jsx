import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";

import "../styles/track.css";

const spotifyApi = new Spotify();
const params = getHashParams();

class Track extends Component {
  constructor() {
    super();
    this.state = {
      track: {},
      albumImageUrl: "",
      album: {},
      artist: ""
    };
  }

  getReleaseYear() {
    const releaseString = this.state.album.release_date;
    const releaseDate = new Date(Date.parse(releaseString));

    return releaseDate.getFullYear();
  }

  async componentDidMount() {
    spotifyApi.setAccessToken(params.access_token);

    try {
      const trackId = this.props.match.params.id;
      spotifyApi.getTrack(trackId).then(response => {
        console.log(response);
        this.setState({
          track: response,
          albumImageUrl: response.album.images[1].url,
          artist: response.artists[0].name,
          album: response.album
        });
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="Track-Header">
          <img src={this.state.albumImageUrl} alt="Cover" />
          <div>
            <h1>{this.state.track.name}</h1>
            <h2>{this.state.artist}</h2>
            <h3>
              {this.state.album.name}, {this.getReleaseYear()}
            </h3>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Track;
