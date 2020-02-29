import React from 'react';

const EventInfo = props => {

      const rows = props.eventsData.map((row, index) => {
        console.log(row.eventName);
        return (

          <div className='event' key={index}>
            <h1>{row.EventName}</h1>
            <h1>Garbage</h1>
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