import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import { getArtistString } from "../utils/index";
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
      audioFeatureData: []
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

        console.log(this.state.audioFeatureData);
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
        <div style={{ marginTop: "50px" }}>
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
