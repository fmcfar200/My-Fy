import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import TrackList from "./trackList";
import DropdownButton from "../common/dropdownButton";
import { toast } from "react-toastify";
import { token } from "../utils";
import "../styles/generator.css";
import "../styles/spotifyButton.css";
import ActivityIndicator from "../common/activityIndicator";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

class Generator extends Component {
  constructor(props) {
    super(props);
    this.checkTrack = this.checkTrack.bind(this);
    this.menuRef = React.createRef();
  }
  state = {
    loading: true,
    userId: "",
    orginalPlaylistName: "",
    generatorType: this.props.match.params.type,
    itemId: this.props.match.params.id,
    generatedTracks: [],
    accessiblePlaylists: [],
    checkedTracks: []
  };

  componentDidMount() {
    const { generatorType, itemId } = this.state;
    console.log(generatorType);

    //Gets User details
    spotifyApi.getMe().then(userResponse => {
      this.setState({
        userId: userResponse.id
      });
    });

    //GET PLAYLISTS FOR ADDING
    spotifyApi
      .getUserPlaylists({ limit: 50 })
      .then(response => {
        return response.items;
      })
      .then(followedPlaylists => {
        var accessiblePlaylists = [];
        accessiblePlaylists.push({ name: "New Playlist", id: "new" });

        for (var i = 0; i < followedPlaylists.length; i++) {
          var playlist = followedPlaylists[i];
          if (
            playlist.owner.id === this.state.userId ||
            playlist.collaborative === true
          ) {
            accessiblePlaylists.push(playlist);
          }
        }
        this.setState({
          accessiblePlaylists: accessiblePlaylists
        });
      });

    if (generatorType === "playlist") {
      spotifyApi.getPlaylist(itemId).then(response => {
        this.setState({
          orginalPlaylistName: response.name
        });
      });

      this.generateFromPlaylist(itemId);
    } else if (generatorType === "top-tracks") {
      this.setState({
        orginalPlaylistName: "Top Tracks"
      });
      this.generateFromTopTracks();
    }
  }

  generateFromTopTracks() {
    spotifyApi
      .getMyTopTracks({ limit: 50 })
      .then(response => {
        return response.items;
      })
      .then(tracks => {
        return this.generateSeedTracks(tracks);
      })
      .then(seedTracks => {
        const seed_tracks = seedTracks;
        spotifyApi
          .getRecommendations({
            seed_tracks: seed_tracks,
            limit: 100
          })
          .then(response => {
            this.setState({
              generatedTracks: response.tracks,
              loading: false
            });
          });
      });
  }

  checkTrack(track) {
    var checkedTracks = this.state.checkedTracks;
    var alreadyAdded = checkedTracks.includes(track);
    if (alreadyAdded) {
      checkedTracks.splice(checkedTracks.indexOf(track), 1);
    } else {
      checkedTracks.push(track);
    }

    this.setState({
      checkedTracks: checkedTracks
    });
  }

  clearSelection() {
    this.setState({ checkedTracks: [] });
    var checkedBoxes = document.getElementsByTagName("INPUT");

    for (var i = 0; i < checkedBoxes.length; i++) {
      checkedBoxes[i].checked = false;
    }
  }

  handleMenuClose = () => {
    this.menuRef.current.handleClick();
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
      if (this.state.generatorType === "playlist") {
        seedTracksArray.push(tracks[randomIndexArr[i]].track.id);
      } else {
        seedTracksArray.push(tracks[randomIndexArr[i]].id);
      }
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

  saveGeneratedTracksToPlaylist(playlistId, playlistName) {
    const { generatedTracks, checkedTracks } = this.state;
    var selectedTracks = [];
    var trackURIs = [];

    if (checkedTracks.length === 0) {
      selectedTracks = generatedTracks;
    } else {
      selectedTracks = checkedTracks;
    }

    //adds all track uris to a new array
    selectedTracks.forEach(item => {
      trackURIs.push(item.uri);
    });

    if (playlistId === "new") {
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
    } else {
      spotifyApi.addTracksToPlaylist(playlistId, trackURIs);
    }

    this.clearSelection();
    this.handleMenuClose();

    toast.success("Tracks Added to " + playlistName + " 🎵");
  }

  generateFromPlaylist(itemId) {
    var tracks = [];

    //generates seeds and new tracks
    spotifyApi
      .getPlaylistTracks(itemId)
      .then(response => {
        tracks = response.items;

        return this.generateSeedTracks(tracks);
      })
      .then(seedTracks => {
        spotifyApi
          .getRecommendations({
            seed_tracks: seedTracks,
            limit: 100
          })
          .then(response => {
            this.setState({
              generatedTracks: response.tracks,
              loading: false
            });
          });
      });
  }

  render() {
    const {
      loading,
      generatedTracks,
      orginalPlaylistName,
      accessiblePlaylists,
      checkedTracks
    } = this.state;

    const dropdownListItems = accessiblePlaylists.map(item => (
      <li
        key={item.id}
        onClick={() => {
          this.saveGeneratedTracksToPlaylist(item.id, item.name);
        }}
      >
        {item.name}
      </li>
    ));

    return (
      <React.Fragment>
        <div className="Generator-Container">
          <h2>Generated Tracks from '{orginalPlaylistName}'</h2>
          <div className="Generator-Header">
            <div className="Header-Button-Container">
              <DropdownButton
                ref={this.menuRef}
                buttonClass="Spotify-Button Spotify-Button-Play Save"
                buttonLabel={
                  checkedTracks.length === 0
                    ? "Add all to playlist"
                    : "Add to playlist"
                }
                listItems={dropdownListItems}
              />

              {checkedTracks.length > 0 && (
                <button
                  className="Spotify-Button Spotify-Button-Play Clear"
                  onClick={() => {
                    this.clearSelection();
                  }}
                >
                  Clear Selection
                </button>
              )}

              <button
                className="Refresh"
                data-toggle={checkedTracks.length > 0 ? "modal" : ""}
                data-target={checkedTracks.length > 0 ? "#exampleModal" : ""}
                onClick={() => {
                  if (checkedTracks.length === 0) {
                    this.generateFromPlaylist(this.state.itemId);
                  }
                }}
              >
                <i className="fas fa-sync" />
              </button>
            </div>
          </div>
          <div className="Tracks-Container">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TrackList
                data={generatedTracks}
                toggle={true}
                checkTrack={this.checkTrack}
                history={this.props.history}
              />
            )}
          </div>
          <div className="fadedScroller_fade"></div>
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Refresh Tracks
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Refreshing track list will lose your currently selected tracks.
                Add them to a playlist if you do not wish to lose them.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary refresh"
                  data-dismiss="modal"
                  onClick={() => {
                    this.clearSelection();
                    this.generateFromPlaylist(this.state.itemId);
                  }}
                >
                  Refresh Tracks
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Generator;
