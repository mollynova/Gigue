import React from "react";
import "../styles/App.css";
import "../styles/artist.css";

// const ArtistInfo = props => {
//   let currentComponent = this;
//   //Call Api here? Connect to Spotify, probably using the "Client Credentials" Flow
//   console.log(props);

//   return (
//     <div className="artist-page">
//       <h1>{props.artistPage}</h1>
//     </div>
//   );
// };

class ArtistPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artist: "" };
  }

  render() {
    const thisArtist = this.props.location.state.artist;
    console.log("Artist: ", thisArtist);
    // this.setState({
    //   state: thisArtist
    // });
    const artistURL = "https://itunes.apple.com/search?term=jack+johnson";
    //   "https://api.spotify.com/v1/search?q=" + thisArtist + "&type=artist";

    fetch(artistURL)
      .then(response => response.json())
      .then(result => {
        console.log("artistURL: ", result);
        // return result.items.href;
      });
    //   .then(uriCall => {
    //     fetch(uriCall)
    //       .then(response => response.json())
    //       .then(result => {
    //         console.log("spotify info on artist: ", result);
    //       });
    //   });
    return (
      <div>{this.state.artist}</div>
      // <ArtistInfo artistPage={artist}></ArtistInfo>;
    );
  }
}

export default ArtistPage;
