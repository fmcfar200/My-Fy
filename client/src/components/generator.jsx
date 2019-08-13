import React, { Component } from "react";
import { toast } from "react-toastify";
import Spotify from "spotify-web-api-js";
import TrackList from "./trackList";
import "../styles/generator.css";
import "../styles/spotifyButton.css";

const spotifyApi = new Spotify();

class Generator extends Component {
  dropdownContainerRef = React.createRef();
  state = {
    userId: "",
    orginalPlaylistName: "",
    saveMenuOpen: false,
    itemId: this.props.match.params.id,
    generatedTracks: [],
    userOwnedPlaylists: []
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

  getRecommendations(itemId) {
    var tracks = [];
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

  handleSaveClick = () => {
    this.setState(state => {
      return {
        saveMenuOpen: !state.saveMenuOpen
      };
    });
  };

  handleClickOutside = event => {
    if (
      this.dropdownContainerRef.current &&
      !this.dropdownContainerRef.current.contains(event.target)
    ) {
      this.setState({
        saveMenuOpen: false
      });
    }
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);

    const { itemId } = this.state;
    var userId = "";
    //Gets User and playlist details
    spotifyApi
      .getMe()
      .then(userResponse => {
        userId = userResponse.id;
      })
      .then(() => {
        spotifyApi.getPlaylist(itemId).then(response => {
          this.setState({
            userId: userId,
            orginalPlaylistName: response.name
          });
        });
      });

    //GET PLAYLISTS FOR ADDING
    spotifyApi
      .getUserPlaylists({ limit: 50 })
      .then(response => {
        return response.items;
      })
      .then(followedPlaylists => {
        var userOwnedPlaylists = [];

        for (var i = 0; i < followedPlaylists.length; i++) {
          var playlist = followedPlaylists[i];
          if (playlist.owner.id === userId) {
            userOwnedPlaylists.push(playlist);
          }
        }
        console.log(userOwnedPlaylists);
        this.setState({
          userOwnedPlaylists: userOwnedPlaylists
        });
      });

    //GETS RECCOMENDATIONS
    this.getRecommendations(itemId);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const {
      generatedTracks,
      orginalPlaylistName,
      userOwnedPlaylists
    } = this.state;

    const ownedplaylistList = userOwnedPlaylists.map(item => (
      <li>{item.name}</li>
    ));

    return (
      <React.Fragment>
        <div className="Generator-Container">
          <div className="Generator-Header">
            <h2>Generated Tracks from '{orginalPlaylistName}'</h2>
            <div className="Header-Button-Container">
              <div
                className="Dropdown-Container"
                ref={this.dropdownContainerRef}
              >
                <button
                  className="Spotify-Button Spotify-Button-Play Save"
                  onClick={() => {
                    // this.saveGeneratedTracksAsNewPlaylist();
                    this.handleSaveClick();
                  }}
                >
                  Add all to playlist
                </button>
                {this.state.saveMenuOpen && (
                  <div className="Dropdown">
                    <ul>
                      <li>+ New Playlist</li>
                      {ownedplaylistList}
                    </ul>
                  </div>
                )}
              </div>
              <button
                className="Refresh"
                onClick={() => {
                  this.getRecommendations(this.state.itemId);
                }}
              >
                <i className="fas fa-sync" />
              </button>
            </div>
          </div>
          <TrackList data={generatedTracks} />
        </div>
      </React.Fragment>
    );
  }
}

export default Generator;
