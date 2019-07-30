import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import { getArtistString } from "../utils/index";
import { msToRuntime } from "../utils/msConverter";
import { parseTrackKey, parseTrackModality } from "../utils";
import { Bar } from "react-chartjs-2";

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
      preview_url: "",
      audioFeatureData: [],

      duration_ms: 0,
      key: "",
      BPM: 0,
      timeSignature: 0,
      popularity: "",
      bars: 0,
      beats: 0,
      segments: 0,
      sections: 0,
      modality: "N/A"
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
        console.log(response);
        var artistsString = getArtistString(response.artists);
        //sets state
        this.setState({
          track: response,
          duration_ms: msToRuntime(response.duration_ms),
          albumImageUrl: response.album.images[1].url,
          artists: artistsString,
          album: response.album,
          spotifyUrl: response.external_urls.spotify,
          preview_url: response.preview_url,
          popularity: response.popularity
        });
      });

      //GET TRACK AUDIO FEATURES
      spotifyApi.getAudioFeaturesForTrack(trackId).then(response => {
        let audioFeaturesDataArray = [
          response.acousticness,
          response.danceability,
          response.energy,
          response.instrumentalness,
          response.liveness,
          response.speechiness,
          response.valence
        ];

        this.setState({
          audioFeatureData: audioFeaturesDataArray
        });
      });

      spotifyApi.getAudioAnalysisForTrack(trackId).then(response => {
        this.setState({
          key: parseTrackKey(response.track.key),
          BPM: Math.round(response.track.tempo),
          timeSignature: response.track.time_signature,
          bars: response.bars.length,
          beats: response.beats.length,
          segments: response.segments.length,
          sections: response.sections.length,
          modality: parseTrackModality(response.track.mode)
        });
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  render() {
    const audioFeatureData = this.state.audioFeatureData;
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

        <div className="Track-Grid-Container">
          <div className="Track-Grid-Item">
            <h4>{this.state.duration_ms}</h4>
            <p>Duration</p>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.popularity}%</h4>
              <p>Popularity</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.BPM}</h4>
              <p>BPM</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.timeSignature}</h4>
              <p>Time Signature</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.key}</h4>
              <p>Key</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.bars}</h4>
              <p>Bars</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.beats}</h4>
              <p>Beats</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.segments}</h4>
              <p>Segments</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.sections}</h4>
              <p>Sections</p>
            </div>
          </div>
          <div className="Track-Grid-Item">
            <div>
              <h4>{this.state.modality}</h4>
              <p>Modality</p>
            </div>
          </div>
        </div>

        <div className="Track-Graph-Container">
          <Bar
            data={chartData}
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
        </div>
      </React.Fragment>
    );
  }
}

export default Track;
