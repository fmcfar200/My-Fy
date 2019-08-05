import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import TrackList from "./trackList";

const spotifyApi = new Spotify();

class Generator extends Component {
  state = {
    itemId: this.props.match.params.id,
    generatedTracks: []
  };

  //generates track seeds
  generateSeedTracks(tracks) {
    let randomIndexArr = [
      Math.floor(Math.random() * tracks.length),
      Math.floor(Math.random() * tracks.length),
      Math.floor(Math.random() * tracks.length),
      Math.floor(Math.random() * tracks.length),
      Math.floor(Math.random() * tracks.length)
    ];

    let seedTracksArray = [];
    for (var i = 0; i < randomIndexArr.length; i++) {
      seedTracksArray.push(tracks[randomIndexArr[i]].track.id);
    }

    return seedTracksArray.join(",").toString();
  }

  //generates atrists seeds
  generateSeedArtists(tracks) {
    let randomIndexArr = [
      //Math.floor(Math.random() * tracks.length)
    ];

    let seedArtistsArray = [];
    for (var i = 0; i < randomIndexArr.length; i++) {
      seedArtistsArray.push(tracks[randomIndexArr[i]].track.artists[0].id);
    }

    return seedArtistsArray.join(",").toString();
  }

  componentDidMount() {
    const { itemId } = this.state;
    var tracks = [];
    spotifyApi
      .getPlaylistTracks(itemId)
      .then(response => {
        tracks = response.items;

        return this.generateSeedTracks(tracks);
      })
      .then(seedTracks => {
        const seed_tracks = seedTracks;
        const seed_artists = this.generateSeedArtists(tracks);
        spotifyApi
          .getRecommendations({
            seed_tracks: seed_tracks,
            seed_artists: seed_artists,
            limit: 100
          })
          .then(response => {
            console.log(response);
            this.setState({
              generatedTracks: response.tracks
            });
          });
      });
  }

  render() {
    const { generatedTracks } = this.state;

    return (
      <React.Fragment>
        <h2>Generated Tracks</h2>
        <TrackList data={generatedTracks} />
      </React.Fragment>
    );
  }
}

export default Generator;
