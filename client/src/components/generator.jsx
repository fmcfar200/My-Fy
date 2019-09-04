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
    id: this.props.match.params.id,
    generatedTracks: [],
    accessiblePlaylists: [],
    checkedTracks: []
  };

  componentDidMount() {
    const { generatorType, id } = this.state;
    console.log(this.props.match.params);

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
      spotifyApi.getPlaylist(id).then(response => {
        this.setState({
          orginalPlaylistName: response.name
        });
      });

      this.generateFromPlaylist(id);
    } else if (generatorType === "top-tracks") {
      this.setState({
        orginalPlaylistName: `Top Tracks - ${id}`
      });
      this.generateFromTopTracks();
    } else if (generatorType === "top-artists") {
      this.setState({
        orginalPlaylistName: `Top Artists - ${id}`
      });
      this.generateFromTopArtists();
    }
  }

  generateFromTopTracks() {
    const { id } = this.state;
    spotifyApi
      .getMyTopTracks({ limit: 50, time_range: id })
      .then(response => {
        return response.items;
      })
      .then(tracks => {
        return this.createSeedTracks(tracks);
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

  generateFromTopArtists() {
    const { id } = this.state;
    spotifyApi
      .getMyTopArtists({ limit: 50, time_range: id })
      .then(response => {
        return response.items;
      })
      .then(artists => {
        return this.createSeedArtists(artists);
      })
      .then(seedArtists => {
        const seed_artists = seedArtists;
        spotifyApi
          .getRecommendations({
            seed_artists: seed_artists,
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

  refreshTracks() {
    const { generatorType, id } = this.state;

    if (generatorType === "playlist") {
      this.generateFromPlaylist(id);
    } else if (generatorType === "top-tracks") {
      this.generateFromTopTracks();
    } else if (generatorType === "top-artists") {
      this.generateFromTopTracks();
    }
  }
  handleMenuClose = () => {
    this.menuRef.current.handleClick();
  };

  //generates track seeds
  createSeedTracks(tracks) {
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
  createSeedArtists(artists) {
    let randomIndexArr = [
      Math.floor(Math.random() * artists.length),
      Math.floor(Math.random() * artists.length),
      Math.floor(Math.random() * artists.length),
      Math.floor(Math.random() * artists.length),
      Math.floor(Math.random() * artists.length)
    ];

    let seedArtistsArray = [];
    for (var i = 0; i < randomIndexArr.length; i++) {
      seedArtistsArray.push(artists[randomIndexArr[i]].id);
    }

    return seedArtistsArray.join(",").toString();
  }

  saveGeneratedTracksToPlaylist(id, playlistName) {
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

    if (id === "new") {
      //creates a new playlist and then adds all tracks to it
      spotifyApi
        .createPlaylist(this.state.userId, {
          name: "Generated from: " + this.state.orginalPlaylistName
        })
        .then(createdResponse => {
          return createdResponse.id;
        })
        .then(newid => {
          spotifyApi.addTracksToPlaylist(newid, trackURIs);
        });
    } else {
      spotifyApi.addTracksToPlaylist(id, trackURIs);
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

        return this.createSeedTracks(tracks);
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
                    this.refreshTracks();
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
                    this.generateFromPlaylist(this.state.id);
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
