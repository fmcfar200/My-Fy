export const getArtistString = artists => {
  //gets artists to string
  var artistNameArray = [];
  for (let i = 0; i < artists.length; i++) {
    artistNameArray.push(artists[i].name);
  }

  var artistsString = artistNameArray.join(", ").toString();

  return artistsString;
};
