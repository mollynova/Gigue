import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/searchpage.css";
import React from 'react';


const EventInfo = props => {
  const rows = props.eventsData.map((row, index) => {
    console.log(row.eventName);
    return (
      <div className="card-containers" key={index}>
        <div className="card card-flip border-primary" key={index}>
          <div className="front">
            <div className="card-body">
              <h5 className="card-title">
                {row.Headliners.map((item, index) => {return (index ? ', ': '') + item})}
              </h5>
              <h6 className="card-subtitle text-muted">
                Supporting Artists: {row.SupportArtists.map((item, index) => {return (index ? ', ': '') + item}) }
              </h6>
              <p className="card-text" id="performance-dates">
                Date: {row.StartDate}
              </p>
            </div>
          </div>

          <div className="back">
            <div className="card-body">
              <h5 className="card-title">
                {row.EventName}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {row.StartDate}
              </h6>
              <p className="card-text" id="performance-dates">
                {row.Venue}
              </p>
              <p className="card-text">
                {row.Location}
              </p>
              <button className="btn btn-primary" onClick={() => props.toArtistPage(row.Headliners[0])} >
                Artist Page
              </button>
              <a href={row.Uri} className="card-link">
                Click to Buy Tickets
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{rows}</div>;

};


class EventCard extends React.Component {
  render() {
    const { eventsData } = this.props;
    return <EventInfo eventsData={eventsData} />;
  }
}

export default EventCard;