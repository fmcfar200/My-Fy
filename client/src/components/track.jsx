import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import { getArtistString } from "../utils/index";

import "../styles/track.css";
import "../styles/spotifyButton.css";

const spotifyApi = new Spotify();
const params = getHashParams();

class Track extends Component {
  constructor() {
    super();
    this.state = {
      track: {},
      albumImageUrl: "",
      album: {},
      artists: "",
      spotifyUrl: "",
      preview_url: ""
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
      //GET THE TRACK INFORMATION
      spotifyApi.getTrack(trackId).then(response => {
        var artistsString = getArtistString(response.artists);

        //sets state
        this.setState({
          track: response,
          albumImageUrl: response.album.images[1].url,
          artists: artistsString,
          album: response.album,
          spotifyUrl: response.external_urls.spotify,
          preview_url: response.preview_url
        });
      });

      //GET TRACK AUDIO FEATURES
      spotifyApi.getAudioFeaturesForTrack(trackId).then(response => {
        console.log(response);
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
          <div className="Track-Meta">
            <h1>{this.state.track.name}</h1>
            <h4>
              <span style={{ color: "grey" }}>By </span>
              {this.state.artists}
            </h4>
            <h5>
              {this.state.album.name} &#183; {this.getReleaseYear()}
            </h5>
            <a
              href={this.state.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="Spotify-Button Spotify-Button-Play"
                style={{ marginTop: "16px" }}
              >
                Play
              </button>
            </a>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Track;
