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
    this.state = { artist: "" };
  }

  render() {
    const { eventsData, tmEventsData, toArtistPage } = this.props;
    console.log("props.eventsData: ", this.props.eventsData);
    // console.log("props.tmEventsData: ", this.props.tmEventsData);
    // var thisData = this.props.eventsData.splice(10, 30);
    // console.log("thisData: ", thisData);
    return (
      <div>
        <h2 className="section-title">Upcoming Shows</h2>

        <div className="tabs">
          <Row>
            {this.props.eventsData.map(data => {
              return (
                <Col sm="6" key={data.EventName}>
                  <Media className="media-body">
                    <Media body className="cards-body">
                      <Card>
                        <CardTitle>{data.EventName}</CardTitle>
                        <CardSubtitle>
                          {data.Venue} | {data.StartDate} | {data.Location} |{" "}
                        </CardSubtitle>

                        <div>
                          <CardText>
                            <button className="btn-primary mr-3">
                              <a href={data.Uri} className="card-link">
                                Purchase Tickets
                              </a>
                            </button>
                          </CardText>
                          <CardText>
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
                          </CardText>
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
