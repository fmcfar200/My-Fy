import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
import { getHashParams } from "../utils/hashParameters";
import { formatNumber } from "../utils";

import "../styles/artist.css";
import "../styles/spotifyButton.css";

const spotifyApi = new Spotify();
const params = getHashParams();

class Artist extends Component {
  state = {
    name: "",
    followers: 0,
    genres: [],
    id: "",
    imageURL: "",
    popularity: "",
    type: "",
    spotifyURL: "",
    userFollowing: false
  };

  handleFollowClick(followBool) {
    if (followBool === true) {
      this.setState({ userFollowing: false });
      spotifyApi.unfollowArtists([this.state.id]);
    } else {
      this.setState({ userFollowing: true });
      spotifyApi.followArtists([this.state.id]);
    }
  }

  componentDidMount() {
    spotifyApi.setAccessToken(params.access_token);
    const artistId = this.props.match.params.id;

    if (artistId && artistId !== "") {
      spotifyApi.getArtist(artistId).then(response => {
        this.setState({
          name: response.name,
          followers: formatNumber(response.followers.total),
          genres: response.genres,
          id: response.id,
          imageURL: response.images[1].url,
          popularity: response.popularity,
          type: response.type,
          spotifyURL: response.external_urls.spotify
        });
      });

      spotifyApi.isFollowingArtists([artistId]).then(response => {
        this.setState({
          userFollowing: response[0]
        });
      });
    }
  }

  render() {
    const {
      name,
      imageURL,
      followers,
      popularity,
      genres,
      userFollowing
    } = this.state;
    const genreList = genres.map(item => <h3>{item}</h3>);

    var followButton;
    if (userFollowing === true) {
      followButton = (
        <button
          className="Spotify-Button Spotify-Button-Trans isFollowing"
          onClick={() => {
            this.handleFollowClick(userFollowing);
          }}
        >
          <span>Following</span>
        </button>
      );
    } else {
      followButton = (
        <button
          className="Spotify-Button Spotify-Button-Play"
          style={{ fontSize: "20px" }}
          onClick={() => {
            this.handleFollowClick(userFollowing);
          }}
        >
          Follow
        </button>
      );
    }

    return (
      <React.Fragment>
        <div className="Artist-Header">
          <img src={imageURL} alt="Cover" />
          <h1>{name} </h1>
        </div>

        <div style={{ marginBottom: "50px" }}>{followButton}</div>

        <div className="Artist-Info">
          <div>
            <h3>{followers}</h3>
            <p>Followers</p>
          </div>
          <div>
            <h3>{popularity}%</h3>
            <p>Popularity</p>
          </div>
        </div>

        <div className="Artist-Genres">
          <div>
            {genreList}
            <p>Genres</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Artist;
