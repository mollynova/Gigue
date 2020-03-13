import React from "react";
import "../styles/App.css";
import "../styles/artist.css";
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody
} from 'reactstrap';
import ReactPlayer from 'react-player';

class ArtistPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artist: "", location: "", query: [] };
    this.setQuery = this.setQuery.bind(this);
  }

  setQuery(result) {
    this.setState(state => {
      {
        return { query: result };
      }
    });
  }

  componentDidMount() {
    console.log("componentDidMount");
    const thisArtist = this.props.location.state.artist;
    const artistName = thisArtist.replace(/\s/g, "+");
    const artistURL =
      "https://itunes.apple.com/search?term=" +
      artistName +
      "&media=music&entity=song&limit=3";
    fetch(artistURL)
      .then(response => response.json())
      .then(result => {
        this.setQuery(result);
      });
  }

  render() {
    console.log("this.state.query: ", this.state.query);
    var img1 = "../images/icon.png";
    var img2 = "../images/icon.png";
    var img3 = "../images/icon.png";
    var album1, album2, album3, song1, song2, song3, release1, release2, release3, genre1, genre2, genre3, track1, track2, track3 = "";
    if (this.state.query.results != null) {
      img1 = this.state.query.results[0].artworkUrl100;
      img1 = img1.replace("100", "600").replace("100", "600");
      img2 = this.state.query.results[1].artworkUrl100;
      img2 = img2.replace("100", "600").replace("100", "600");
      img3 = this.state.query.results[2].artworkUrl100;
      img3 = img3.replace("100", "600").replace("100", "600");

      album1 = this.state.query.results[0].collectionName;
      album2 = this.state.query.results[1].collectionName;
      album3 = this.state.query.results[2].collectionName;

      song1 = this.state.query.results[0].trackName;
      song2 = this.state.query.results[1].trackName;
      song3 = this.state.query.results[2].trackName;

      release1 = this.state.query.results[0].releaseDate;
      release1 = release1.split("T");
      release1 = release1[0];
      release2 = release2 = this.state.query.results[1].releaseDate;
      release2 = release2.split("T");
      release2 = release2[0];
      release3 = this.state.query.results[2].releaseDate;
      release3 = release3.split("T");
      release3 = release3[0];

      genre1 = this.state.query.results[0].primaryGenreName;
      genre2 = this.state.query.results[1].primaryGenreName;
      genre3 = this.state.query.results[2].primaryGenreName;

      track1 = this.state.query.results[0].previewUrl;
      console.log("track1: ", track1);
      track2 = this.state.query.results[1].previewUrl;
      track3 = this.state.query.results[2].previewUrl;
    }

    return (
      <div>
        {/* Title */}
        <div className="artist-header">
          <h2 className="artist-header-text">{this.props.location.state.artist}</h2>
          {/* <audio controls="controls" autoplay="autoplay">
            <source src="../images/C14_Byte.m4a" type="audio/m4a" />
          </audio> */}
        </div>



        {/* Body */}
        <div className="card-body">
          <CardGroup>
            <Card className="song-card">
              <CardImg top width="100%" src={img1} />
              <CardBody className="song-card">
                <CardTitle>Track: {song1}</CardTitle>
                <audio className="player" src={track1} controls></audio>
                <CardSubtitle>Album: {album1}</CardSubtitle>
                <CardSubtitle>Release Date: {release1}</CardSubtitle>
                <CardSubtitle>Genre: {genre1}</CardSubtitle>
              </CardBody>
            </Card>
            <Card className="song-card">
              <CardImg top width="100%" src={img2} />
              <CardBody className="song-card">
                <CardTitle>Track: {song2}</CardTitle>
                <audio className="player" src={track2} controls></audio>
                <CardSubtitle>Album: {album2}</CardSubtitle>
                <CardSubtitle>Release Date: {release2}</CardSubtitle>
                <CardSubtitle>Genre: {genre1}</CardSubtitle>
              </CardBody>
            </Card>
            <Card className="song-card">
              <CardImg top width="100%" src={img3} />
              <CardBody className="song-card">
                <CardTitle>Track: {song3}</CardTitle>
                <audio className="player" src={track3} controls></audio>
                <CardSubtitle>Album: {album3}</CardSubtitle>
                <CardSubtitle>Release Date: {release3}</CardSubtitle>
                <CardSubtitle>Genre: {genre1}</CardSubtitle>
              </CardBody>
            </Card>
          </CardGroup>

        </div>

      </div>
    );
  }
}

export default ArtistPage;
