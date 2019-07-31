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
