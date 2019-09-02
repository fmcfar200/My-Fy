import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import AudioAnalysisGrid from "./audioAnalysisGrid";
import BarGraph from "../common/barGraph";
import { token } from "../utils";
import { getArtistString } from "../utils/index";
import { msToRuntime } from "../utils/msConverter";
import { parseTrackKey, parseTrackModality } from "../utils";

import "../styles/track.css";
import "../styles/spotifyButton.css";
import TrackHeader from "./trackHeader";
import ActivityIndicator from "../common/activityIndicator";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

class Track extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      track: {},
      albumImageUrl: "",
      album: {},
      artists: "",
      spotifyUrl: "",
      preview_url: "",
      audioFeatureData: [],

      duration_ms: 0,
      tonalKey: "",
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
    try {
      const trackId = this.props.match.params.id;
      //GET THE TRACK INFORMATION
      spotifyApi.getTrack(trackId).then(response => {
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
          tonalKey: parseTrackKey(response.track.key),
          BPM: Math.round(response.track.tempo),
          timeSignature: response.track.time_signature,
          bars: response.bars.length,
          beats: response.beats.length,
          segments: response.segments.length,
          sections: response.sections.length,
          modality: parseTrackModality(response.track.mode),

          loading: false
        });
      });
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  render() {
    const {
      loading,
      track,
      albumImageUrl,
      album,
      artists,
      spotifyUrl,
      audioFeatureData,
      duration_ms,
      popularity,
      BPM,
      timeSignature,
      tonalKey,
      bars,
      beats,
      segments,
      sections,
      modality
    } = this.state;

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
        {loading ? (
          <ActivityIndicator />
        ) : (
          <React.Fragment>
            <TrackHeader
              trackName={track.name}
              albumImageUrl={albumImageUrl}
              albumName={album.name}
              artists={artists}
              spotifyUrl={spotifyUrl}
              releaseYear={this.getReleaseYear()}
            />

            <AudioAnalysisGrid
              popularity={popularity}
              duration_ms={duration_ms}
              BPM={BPM}
              timeSignature={timeSignature}
              tonalKey={tonalKey}
              beats={beats}
              bars={bars}
              segments={segments}
              sections={sections}
              modality={modality}
            />

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
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Track;
