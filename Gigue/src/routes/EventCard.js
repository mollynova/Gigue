import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/searchpage.css";
import React from 'react';


const EventInfo = props => {

  const rows = props.eventsData.map((row, index) => {
    console.log(row.eventName);
    return (
      <div className="card-containers" key={index}>
        <div className="card card-flip border-primary">
          <div className="front">
            <div className="card-body">
              <h5 className="card-title">{row.EventName}</h5>
              <p className="card-text" id="performance-dates">Date: {row.StartDate}</p>
              <button href="#" className="btn-primary">Flip for More Info!</button>
            </div>
          </div>

          <div className="back">
            <div className="card-body">
              <h5 className="card-title">{row.EventName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{row.StartDate}</h6>
              <p className="card-text" id="performance-dates">{row.Venue}</p>
              <a href={row.Uri} className="card-link">Click to Buy Tickets</a>
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
    console.log(this.props);

    const { eventsData } = this.props;
    return <EventInfo eventsData={eventsData} />;
  }
}

export default EventCard;