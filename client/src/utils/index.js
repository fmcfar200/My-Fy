import { getHashParams } from "./hashParameters";
import axios from "axios";

//SPOTIFY UTILS - TOKENS , PARSING, AUDIO **********************************
const setLocalAccessToken = token => {
  window.localStorage.setItem("spotify_access_token", token);
};

const getLocalAccessToken = () =>
  window.localStorage.getItem("spotify_access_token");

export const getAccessToken = () => {
  const { access_token } = getHashParams();

  const localAccessToken = getLocalAccessToken();

  if (!localAccessToken || localAccessToken === "undefined") {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem("spotify_access_token");
  window.localStorage.removeItem("spotify_token_timestamp");
  window.localStorage.removeItem("spotify_refresh_token");

  window.location.reload();
};

export const getAverageAudioFeatures = audioFeatures => {
  var acousticness = 0,
    danceability = 0,
    energy = 0,
    instrumentalness = 0,
    liveness = 0,
    speechiness = 0,
    valence = 0;

  for (var i = 0; i < audioFeatures.length; i++) {
    acousticness += audioFeatures[i].acousticness;
    danceability += audioFeatures[i].danceability;
    energy += audioFeatures[i].energy;
    instrumentalness += audioFeatures[i].instrumentalness;
    liveness += audioFeatures[i].liveness;
    speechiness += audioFeatures[i].speechiness;
    valence += audioFeatures[i].valence;
  }

  let avAudioFeaturesArray = [
    acousticness / audioFeatures.length,
    danceability / audioFeatures.length,
    energy / audioFeatures.length,
    instrumentalness / audioFeatures.length,
    liveness / audioFeatures.length,
    speechiness / audioFeatures.length,
    valence / audioFeatures.length
  ];

  return avAudioFeaturesArray;
};

export const getArtistString = artists => {
  //gets artists to string
  var artistNameArray = [];
  for (let i = 0; i < artists.length; i++) {
    artistNameArray.push(artists[i].name);
  }

  var artistsString = artistNameArray.join(", ").toString();

  return artistsString;
};

export const parseTrackModality = modeInt => {
  let mode = modeInt;

  switch (mode) {
    case 0:
      mode = "Minor";
      break;

    case 1:
      mode = "Major";
      break;

    case -1:
      mode = "n/a";
      break;

    default:
      mode = null;
  }

  return mode;
};

//Pitch class to tonal counterpart
// see - https://en.wikipedia.org/wiki/Pitch_class
export const parseTrackKey = note => {
  let key = note;

  switch (key) {
    case 0:
      key = "C";
      break;

    case 1:
      key = "D♭";
      break;

    case 2:
      key = "D";
      break;

    case 3:
      key = "E♭";
      break;

    case 4:
      key = "E";
      break;

    case 5:
      key = "F";

      break;

    case 6:
      key = "G♭";

      break;

    case 7:
      key = "G";
      break;

    case 8:
      key = "A♭";
      break;

    case 9:
      key = "A";
      break;

    case 10:
      key = "B♭";
      break;

    case 11:
      key = "B";
      break;

    default:
      key = null;
  }

  return key;
};

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
