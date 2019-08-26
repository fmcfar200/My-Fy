import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import TrackList from "./trackList";
import { token, logout } from "../utils";
//import "../App.css";
import "../styles/profile.css";
import "../styles/spotifyButton.css";
import ActivityIndicator from "../common/activityIndicator";

const spotifyApi = new Spotify();
spotifyApi.setAccessToken(token);

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
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
      imageURL: "",

      topTracks: [],
      recentlyPlayed: [],
      playlistAmount: 0
    };
  }

  async componentDidMount() {
    spotifyApi
      .getMe()
      .then(response => {
        var profileImageUrl = "default_profile.png";
        if (response.images.length > 0) {
          profileImageUrl = response.images[0].url;
        }

        this.setState({
          display_name: response.display_name,
          id: response.id,
          imageURL: profileImageUrl,
          followers: response.followers
        });
      })
      .catch(error => {
        if (error.status === 401) {
          logout();
        }
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
          recentlyPlayed: trackInfo.tracks,
          loading: false
        });
      });
  }

  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <React.Fragment>
            {/* Header Profile Info */}
            <div>
              <img
                className="Profile-img"
                src={this.state.imageURL}
                alt="Profile"
              />
            </div>
            <div>
              <h1>{this.state.display_name}</h1>
            </div>

            <div className="Profile-info">
              <div>
                <h3>{this.state.followers.total}</h3>
                <p>Followers</p>
              </div>
              <div style={{ marginLeft: 15, marginRight: 15 }}>
                <h3>{this.state.followingCount.toString()}</h3>
                <p>Following</p>
              </div>
              <div>
                <h3>{this.state.playlistAmount.toString()}</h3>
                <p>Playlist</p>
              </div>
            </div>

            <div>
              <button
                className="Spotify-Button Spotify-Button-Trans logout"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </button>
            </div>

            {/* Lists */}
            <section className="User-Preview">
              <div className="User-Preview-Container">
                <h2 className="TrackList-Heading">Top Tracks (6 Months)</h2>
                <TrackList
                  data={this.state.topTracks}
                  heading="Top Tracks (6 months)"
                />
              </div>

              <div>
                <h2 className="TrackList-Heading">Recently Played</h2>
                <TrackList
                  data={this.state.recentlyPlayed}
                  heading="Recently Played"
                />
              </div>
            </section>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Profile;
