import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import TrackList from "./trackList";
import { getHashParams } from "../utils/hashParameters";
import "../App.css";

const spotifyApi = new Spotify();
const params = getHashParams();
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      country: "",
      display_name: "",
      email: "",
      explicit_content: { filter_enabled: false, filter_locked: false },
      external_urls: {
        spotify: ""
      },
      followers: { href: null, total: null },
      followingCount: 0,
      href: "",
      id: "",
      images: [
        {
          height: null,
          url: "",
          width: null
        }
      ],
      product: "",
      type: "",
      uri: "",

      topTracks: [],
      recentlyPlayed: [],
      playlistAmount: 0
    };
  }

  async componentDidMount() {
    spotifyApi.setAccessToken(params.access_token);

    spotifyApi.getMe().then(response => {
      this.setState({
        display_name: response.display_name,
        id: response.id,
        images: response.images,
        followers: response.followers
      });
    });

    spotifyApi.getFollowedArtists().then(response => {
      this.setState({
        followingCount: response.artists.items.length
      });
    });

    spotifyApi.getUserPlaylists().then(response => {
      this.setState({
        playlistAmount: response.total
      });
    });

    spotifyApi
      .getMyTopTracks({ limit: 10, time_range: "medium_term" })
      .then(response => {
        this.setState({
          topTracks: response.items
        });
      });

    spotifyApi
      .getMyRecentlyPlayedTracks({ limit: 10 })
      .then(function(data) {
        return data.items.map(function(t) {
          return t.track.id;
        });
      })
      .then(function(trackIds) {
        return spotifyApi.getTracks(trackIds);
      })
      .then(trackInfo => {
        this.setState({
          recentlyPlayed: trackInfo.tracks
        });
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* Header Profile Info */}
        <div>
          <img className="Profile-img" src={this.state.images[0].url} alt="" />
        </div>
        <div>
          <h1>{this.state.display_name}</h1>
        </div>

        <div className="Profile-info">
          <div>
            <h3>{this.state.followers.total}</h3>
            <p>Followers</p>
          </div>
          <div style={{ marginLeft: 20, marginRight: 20 }}>
            <h3>{this.state.followingCount.toString()}</h3>
            <p>Following</p>
          </div>
          <div>
            <h3>{this.state.playlistAmount.toString()}</h3>
            <p>Playlist</p>
          </div>
        </div>

        {/* Lists */}
        <div className="row">
          <div className="column">
            <h2>Top Tracks (6 Months)</h2>
            <TrackList
              data={this.state.topTracks}
              heading="Top Tracks (6 months)"
            />
          </div>
          <div className="column">
            <h2>Recently Played</h2>
            <TrackList
              data={this.state.recentlyPlayed}
              heading="Recently Played"
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
