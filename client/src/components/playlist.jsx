import React, { Component } from "react";
import * as Sentry from "@sentry/browser";
import PlaylistHeader from "./playlistHeader";
import Spotify from "spotify-web-api-js";
import TrackList from "./trackList";
import BarGraph from "../common/barGraph";
import { getAverageAudioFeatures } from "../utils/index";
import { token } from "../utils";
import "../styles/playlist.css";
import "../styles/topTracks.css";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

var audioFeatureData = [];

class Playlist extends Component {
  state = {
    playlistId: this.props.match.params.id,
    playlist: null,
    playlistTracks: [],
    showTracks: true,
    trackIds: ""
  };

  getSongIds(tracks) {
    let ids = [];
    for (var i = 0; i < tracks.length; i++) {
      ids.push(tracks[i].id);
    }

    return ids.join(",").toString();
  }

  async componentDidMount() {
    const { playlistId } = this.state;

    spotifyApi
      .getPlaylist(playlistId)
      .then(response => {
        const thePlaylist = response;
        var thePlaylistTracks = [];
        for (var i = 0; i < thePlaylist.tracks.items.length; i++) {
          thePlaylistTracks.push(thePlaylist.tracks.items[i].track);
        }

        this.setState({
          playlist: response,
          playlistTracks: thePlaylistTracks
        });

        let trackIdString = this.getSongIds(thePlaylistTracks);
        return trackIdString;
      })
      .then(function(trackIds) {
        spotifyApi.getAudioFeaturesForTracks(trackIds).then(response => {
          audioFeatureData = getAverageAudioFeatures(response.audio_features);
        });
      })
      .catch(err => {
        Sentry.captureException(err);
      });
  }

  handleButtonClick(e) {
    var i, tabButtons;

    tabButtons = document.getElementsByClassName("tabButton");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].className = tabButtons[i].className.replace(" active", "");
    }

    e.currentTarget.className += " active";
  }

  render() {
    const { playlist, playlistTracks, showTracks, playlistId } = this.state;

    const chartData = {
      labels: [
        "accousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "speechiness",
        "valence"
      ],
      datasets: [
        {
          label: "Audio Features",
          backgroundColor: "rgba(29,185,84,0.2)",
          borderColor: "rgba(29,185,84,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(29,185,84,0.4)",
          hoverBorderColor: "rgba(29,185,84,1)",
          data: audioFeatureData
        }
      ]
    };

    if (playlist === null) return null;
    return (
      <React.Fragment>
        <PlaylistHeader
          id={playlistId}
          generatorType={"playlist"}
          coverImageUrl={playlist.images[0].url}
          playlistName={playlist.name}
          ownerName={playlist.owner.display_name}
          trackCount={playlist.tracks.total}
          isPublic={playlist.public}
          spotifyUrl={playlist.external_urls.spotify}
          isCollaborative={playlist.collaborative}
        />

        <div className="Playlist-Body-Container">
          <div className="tab" style={{ marginBottom: "10px" }}>
            <button
              className="tabButton active"
              style={{ fontSize: "20px" }}
              onClick={e => {
                this.handleButtonClick(e, "className");
                this.setState({
                  showTracks: true
                });
              }}
            >
              Tracks
            </button>
            <button
              className="tabButton"
              style={{ fontSize: "20px" }}
              onClick={e => {
                this.handleButtonClick(e, "className");
                this.setState({
                  showTracks: false
                });
              }}
            >
              Audio Features
            </button>
          </div>
          <div className="Body-Content">
            {showTracks ? (
              <TrackList data={playlistTracks} history={this.props.history} />
            ) : (
              <React.Fragment>
                <BarGraph
                  chartData={chartData}
                  width={700}
                  height={500}
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [
                        {
                          gridLines: {
                            color: "##1db954"
                          }
                        }
                      ],

                      yAxes: [
                        {
                          gridLines: {
                            color: "##1db954"
                          }
                        }
                      ]
                    }
                  }}
                />
                <p>
                  *Audio Features are based on first 100 tracks of the playlist
                </p>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Playlist;
