import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/searchpage.css";
import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  Row,
  Col,
  Media,
  Button,
  CardImg,
  CardGroup,
} from "reactstrap";
import "../styles/App.css";

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artist: "", result: [] };
    this.setQuery = this.setQuery.bind(this);
    this.setArtist = this.setArtist.bind(this);
  }

  setQuery(result) {
    this.setState(state => {
      {
        return { query: result };
      }
    });
  }

  setArtist(artistName) {
    this.setState(state => {
      {
        console.log("artist is: ", artistName);
        return { artist: artistName };
      }
    })
  }

  // componentDidMount() {
  //   const thisArtist = this.state.artist;
  //   const artistName = thisArtist.replace(/\s/g, "+");
  //   const artistURL =
  //     "https://itunes.apple.com/search?term=" +
  //     artistName +
  //     "&media=music&entity=song&limit=3";
  //   fetch(artistURL)
  //     .then(response => response.json())
  //     .then(result => {
  //       this.setQuery(result);
  //     });
  // }

  render() {
    const { eventsData, tmEventsData, toArtistPage } = this.props;
    console.log("props.eventsData: ", this.props.eventsData);

    // var img1 = "../images/icon.png";
    // if (this.state.query != undefined) {
    //   img1 = this.state.query.results[0].artworkUrl100;
    //   img1 = img1.replace("100", "600").replace("100", "600");
    // }

    // console.log("props.tmEventsData: ", this.props.tmEventsData);
    // var thisData = this.props.eventsData.splice(10, 30);
    // console.log("thisData: ", thisData);
    return (
      <div>
        <h2 className="section-title">Upcoming Shows</h2>

        <div className="tabs">
          <Row>
            {this.props.eventsData.map(data => {
              // this.setArtist(data.Headliners[0]);
              return (
                <Col sm="6" key={data.EventName}>
                  <Media className="media-body">
                    <Media body className="cards-body">
                      <Card>
                        {/* <CardImg top width="100%" src={img1} /> */}
                        <CardTitle>{data.EventName}</CardTitle>
                        <CardSubtitle>
                          {data.Venue} | {data.StartDate} | {data.Location} |{" "}
                        </CardSubtitle>

                        <div className="test">
                          {/* <CardText> */}
                          <button className="btn-primary mr-3">
                            <a href={data.Uri} className="card-link">
                              Purchase Tickets
                              </a>
                          </button>
                          <div className="right-btn">
                            <button
                              className="btn-primary mr-3"
                              onClick={() =>
                                this.props.toArtistPage(
                                  data.Headliners[0],
                                  data.Location
                                )
                              }
                            >
                              Explore Artist
                              </button>
                          </div>
                          {/* </CardText> */}
                        </div>
                      </Card>
                    </Media>
                  </Media>
                </Col>
              );
            })}
          </Row>
        </div>
        <div>
          <h2 className="section-title-2">Stats in your city</h2>
        </div>
      </div>
    );
  }
}

export default EventCard;
