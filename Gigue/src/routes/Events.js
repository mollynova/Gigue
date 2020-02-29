/* page for loading events on bootstrap cards */

import React from "react";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import EventCard from "./EventCard";

class Events extends React.Component {
  state = {
    events: []
  };

  componentWillMount() {
    const googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + this.props.zip + '&key=AIzaSyBNWms-eVzSQmo6leT8Re4yBrpmC9tx-h0'
    fetch(googleUrl)
      .then(result => result.json())
      .then(result => {
        console.log(result);
        const songkickAreaUrl = 'https://api.songkick.com/api/3.0/search/locations.json?location=geo:45.52,-122.93&apikey=nD4GefUecMO1Dzwh'
        //TODO:Need to actually grab location info from result
        fetch(songkickAreaUrl)
          .then(result => result.json())
          .then(result =>{
            console.log(result);
            //TODO: Actual grab area id from result, specify dates?
            const songkickEventsUrl = 'https://api.songkick.com/api/3.0/metro_areas/12283/calendar.json?apikey=nD4GefUecMO1Dzwh'
            fetch(songkickEventsUrl)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                console.log(data.resultsPage.results.event);
                return data.resultsPage.results.event;
              })
              .then(data => {
                const eventsQueried = data.map(x => {
                  let obj = {};
                  obj['EventName'] = x.displayName;
                  obj["Uri"] = x.uri;
                  obj["Venue"] = x.venue.displayName;
                  
                  return obj;
                
                });
                console.log(eventsQueried);
                return eventsQueried;
              })
              .then(results => {
                this.setState({
                  events: results
                })
              })
                  //TODO: Add more things here
                  /*
                  let obj ={};
                  obj['eventName'] = x.eventName;
                  //obj[uri] = x.uri;
                  obj['venue'] = x.venue.displayName;
                  obj['artists'] = x.performance.map(y => y.displayName); 
                  x.id
                */
                //console.log(eventsQueried);
              
              
              .catch(error => {
                console.log(error);
              });
              
              
          });
        /*this.setState({
          events: result
        });*/
      });
  }


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onZipChange(e.target.value);
  }

  
  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    const thisZip = this.props.zip;
    const { events } = this.state;
    return (
      <div>
        <EventCard eventsData={events} />
        <div className="eventsPage">Zip entered was: {thisZip}</div>
        
        <div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Events;
