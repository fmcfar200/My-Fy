import React, { Component } from "react";
import { toast } from "react-toastify";
import { token, humanize, createSeedTracks, createSeedArtists } from "../utils";
import * as Sentry from "@sentry/browser";
import Spotify from "spotify-web-api-js";
import TrackListProvider from "./trackListProvider";
import DropdownButton from "../common/dropdownButton";
import ActivityIndicator from "../common/activityIndicator";
import ModalAlertDialog from "../common/modalAlertDialog";
import "../styles/generator.css";
import "../styles/spotifyButton.css";
import FilterTabs from "./filterTabs";

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
    checkedTracks: [],
    filterOpen: false,
    //Filter States
    filterOptions: {}
  };

  handleApplyFilterMinMax = (name, minValue, maxValue) => {
    this.setState({
      filterOptions: {
        ...this.state.filterOptions,
        [`min_${name}`]: minValue,
        [`max_${name}`]: maxValue
      }
    });
    var filter = true;
    this.refreshTracks(filter);
  };

  componentDidMount() {
    const { generatorType, id } = this.state;

    //Gets User details
    spotifyApi.getMe().then(userResponse => {
      this.setState({
        userId: userResponse.id
      });
    });

    //GET PLAYLISTS FOR dropdown menu
    spotifyApi
      .getUserPlaylists({ limit: 50 })
      .then(response => {
        return response.items;
      })
      .then(followedPlaylists => {
        var accessiblePlaylists = [];
        accessiblePlaylists.push({ name: "New Playlist", id: "new" }); // new playlist option

        //see if playlists is owned as well as collaborative
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
      })
      .catch(err => {
        Sentry.captureException(err);
      });

    if (generatorType === "playlist") {
      spotifyApi.getPlaylist(id).then(response => {
        //set title
        this.setState({
          orginalPlaylistName: response.name
        });
      });
      this.generateFromPlaylist(id); // generate tracks form playlist id
    } else {
      //set title based on options
      var titlePrefix = humanize(id);
      var titleSuffix = humanize(generatorType);
      this.setState({
        orginalPlaylistName: `${titlePrefix} ${titleSuffix}`
      });
    }

    //generate tracks
    if (generatorType === "top-artists") {
      this.generateFromTopArtists();
    } else if (generatorType === "top-tracks") {
      this.generateFromTopTracks();
    }
  }

  //GENERATE FROM USERS TOP TRACKS
  generateFromTopTracks() {
    const { id } = this.state;
    spotifyApi
      .getMyTopTracks({ limit: 50, time_range: id })
      .then(response => {
        return response.items;
      })
      .then(tracks => {
        return createSeedTracks(tracks, this.state.generatorType);
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
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  //GENERATE FROM USER'S TOP ARTISTS
  generateFromTopArtists() {
    const { id } = this.state;
    spotifyApi
      .getMyTopArtists({ limit: 50, time_range: id })
      .then(response => {
        return response.items;
      })
      .then(artists => {
        return createSeedArtists(artists);
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
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  //GENERATE TRACKS BASED ON A PLAYLIST
  generateFromPlaylist(itemId, filter) {
    var tracks = [];

    //generates seeds and new tracks
    spotifyApi
      .getPlaylistTracks(itemId)
      .then(response => {
        tracks = response.items;

        return createSeedTracks(tracks, this.state.generatorType);
      })
      .then(seedTracks => {
        if (filter) {
          var options = this.state.filterOptions;
          options["seed_tracks"] = seedTracks;
          options["limit"] = 100;

          console.log(options);
          spotifyApi.getRecommendations(options).then(response => {
            console.log(response);
            this.setState({
              generatedTracks: response.tracks,
              loading: false
            });
          });
        } else {
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
        }
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  //SAVE TRACKS TO PLAYLIST
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

  //check track from checkbox
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

  //clear selected tracks
  clearSelection() {
    this.setState({ checkedTracks: [] });
    var checkedBoxes = document.getElementsByTagName("INPUT");

    for (var i = 0; i < checkedBoxes.length; i++) {
      checkedBoxes[i].checked = false;
    }
  }

  //refresh tracks
  refreshTracks(filter) {
    const { generatorType, id } = this.state;

    if (generatorType === "playlist") {
      this.generateFromPlaylist(id, filter);
    } else if (generatorType === "top-tracks") {
      this.generateFromTopTracks();
    } else if (generatorType === "top-artists") {
      this.generateFromTopTracks();
    }
  }

  //handler for closing menu
  handleMenuClose = () => {
    this.menuRef.current.handleClick();
  };

  //handler for confirm button in modal menu
  handleConfirmClick() {
    this.clearSelection();
    this.refreshTracks();
  }

  //RENDER
  render() {
    const {
      loading,
      generatedTracks,
      orginalPlaylistName,
      accessiblePlaylists,
      checkedTracks,
      filterOpen
    } = this.state;

    //mapping accessible playlists into list items
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
    const dropdownBody = <ul>{dropdownListItems}</ul>;

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
                bodyContent={dropdownBody}
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
                className="Icon-Button"
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

              <button
                className="Icon-Button"
                onClick={() => {
                  this.setState({
                    filterOpen: !this.state.filterOpen
                  });
                }}
              >
                <i className="fas fa-filter" />
              </button>
            </div>

            {filterOpen && (
              <FilterTabs
                handleApplyFilterMinMax={this.handleApplyFilterMinMax}
                handleBPMChange={this.handleBPMChange}
              />
            )}
          </div>

          {/* Track list container */}
          <div className="Tracks-Container">
            {loading ? (
              <ActivityIndicator />
            ) : (
              <TrackListProvider
                data={generatedTracks}
                toggle={true}
                history={this.props.history}
                checkTrack={this.checkTrack}
              ></TrackListProvider>
            )}
          </div>
        </div>

        {/* Modal Menu */}
        <ModalAlertDialog
          title="Refresh Tracks"
          body=" Refreshing track list will lose your currently selected tracks. Add
            them to a playlist if you do not wish to lose them. "
          closeButtonLabel="Close"
          confirmButtonLabel="RefreshTracks"
          handleConfirmClick={() => this.handleConfirmClick()}
        />
      </React.Fragment>
    );
  }
}

export default Generator;
