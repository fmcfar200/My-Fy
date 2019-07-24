import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";

const spotifyApi = new Spotify();
const params = getHashParams();

class Track extends Component {
  constructor() {
    super();
    this.state = {
      track: {},
      albumImageUrl: "",
      albumType: "",
      albumTotalTracks: "",
      artists: []
    };
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
          albumType: response.album.album_type,
          albumTotalTracks: response.album.total_tracks
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
        <div className="container">
          <img src={this.state.albumImageUrl} />
          <h1>{this.state.track.name}</h1>
          <h2>{this.state.albumType}</h2>
          <h3>Total Tracks: {this.state.albumTotalTracks}</h3>
        </div>
      </React.Fragment>
    );
  }
}

export default Track;
