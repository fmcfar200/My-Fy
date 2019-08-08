import React, { Component } from "react";
import { toast } from "react-toastify";
import Spotify from "spotify-web-api-js";
import TrackList from "./trackList";
import "../styles/generator.css";
import "../styles/spotifyButton.css";

const spotifyApi = new Spotify();

class Generator extends Component {
  state = {
    userId: "",
    orginalPlaylistName: "",

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

  saveGeneratedTracksAsNewPlaylist() {
    const { generatedTracks } = this.state;

    //adds all track uris to a new array
    var trackURIs = [];
    generatedTracks.forEach(item => {
      trackURIs.push(item.uri);
    });

    //creates a new playlist and then adds all tracks to it
    spotifyApi
      .createPlaylist(this.state.userId, {
        name: "Generated from: " + this.state.orginalPlaylistName
      })
      .then(createdResponse => {
        return createdResponse.id;
      })
      .then(newPlaylistId => {
        spotifyApi.addTracksToPlaylist(newPlaylistId, trackURIs);
      });

    toast.success("Playlist Saved to Spotify 🎵");
  }

  componentDidMount() {
    const { itemId } = this.state;
    var tracks = [];

    //Gets User and playlist details
    spotifyApi
      .getMe()
      .then(userResponse => {
        return userResponse.id;
      })
      .then(userId => {
        spotifyApi.getPlaylist(itemId).then(response => {
          this.setState({
            userId: userId,
            orginalPlaylistName: response.name
          });
        });
      });

    //generates seeds and new tracks
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
    const { generatedTracks, orginalPlaylistName } = this.state;

    return (
      <React.Fragment>
        <div className="Generator-Container">
          <div className="Generator-Header">
            <h2>Generated Tracks from '{orginalPlaylistName}'</h2>
            <button
              className="Spotify-Button Spotify-Button-Play Save"
              onClick={() => {
                this.saveGeneratedTracksAsNewPlaylist();
              }}
            >
              Save
            </button>
          </div>
          <TrackList data={generatedTracks} />
        </div>
      </React.Fragment>
    );
  }
}

export default Generator;
