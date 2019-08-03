import React, { Component } from "react";
import PlaylistHeader from "./playlistHeader";
import Spotify from "spotify-web-api-js";

import "../styles/playlist.css";

const spotifyApi = new Spotify();

class Playlist extends Component {
  state = {
    playlist: null
  };

  async componentDidMount() {
    const playlistId = this.props.match.params.id;

    spotifyApi.getPlaylist(playlistId).then(response => {
      console.log(response);
      this.setState({
        playlist: response
      });
    });
  }

  render() {
    const { playlist } = this.state;
    if (playlist === null) return null;

    return (
      <React.Fragment>
        <PlaylistHeader
          coverImageUrl={playlist.images[0].url}
          playlistName={playlist.name}
          ownerName={playlist.owner.display_name}
          trackCount={playlist.tracks.items.length}
          isPublic={playlist.public}
          spotifyUrl={playlist.external_urls.spotify}
        />
      </React.Fragment>
    );
  }
}

export default Playlist;
