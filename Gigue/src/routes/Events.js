/* page for loading events on bootstrap cards */
import { Redirect, NavLink, Link } from "react-router-dom";
import React from "react";
import "../styles/App.css";
import EventCard from "./EventCard";
import ReactLoading from "react-loading";
import Landing from "./Landing";
import "../styles/searchpage.css";
class Events extends React.Component {
  state = {
    events: []
  };

  componentWillMount() {
    const googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + this.props.zip + '&key=AIzaSyBNWms-eVzSQmo6leT8Re4yBrpmC9tx-h0'
    fetch(googleUrl)
      .then(result => result.json())
      .then(result => {
        if(result.results.length == 0){
          throw "Invalid Zipcode!";
        }
        console.log(result);
        return result.results;
      })
      .then(result => {
        return result[0].geometry.location;
      })
      .then(result => {
        const lat = result.lat.toFixed(2);
        const long = result.lng.toFixed(2);
        const songkickAreaUrl = 'https://api.songkick.com/api/3.0/search/locations.json?location=geo:' + lat + ',' + long + '&apikey=nD4GefUecMO1Dzwh'
        console.log(songkickAreaUrl);
        return songkickAreaUrl;
      })
      .then(url => {
        fetch(url)
          .then(result => result.json())
          .then(result => {
            console.log(result);
            if(result.resultsPage.totalEntries == '0'){
              throw "Area out of range";
            }
            return result.resultsPage.results
          })
          .then(result => {
            const metroAreaId = result.location[0].metroArea.id;
            const songkickEventsUrl = 'https://api.songkick.com/api/3.0/metro_areas/' + metroAreaId + '/calendar.json?apikey=nD4GefUecMO1Dzwh';
            console.log(songkickEventsUrl);
            return songkickEventsUrl;
          })
          .then(url => {
            fetch(url)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              console.log(data.resultsPage.results.event);
              if(data.resultsPage.totalEntries == 0){
                throw "No Concerts in this Area!"
              }
              return data.resultsPage.results.event;
            })
            .then(data => {
              const eventsQueried = data.map(x => {
                let obj = {};
                obj['EventName'] = x.displayName;
                obj["Uri"] = x.uri;
                obj["Venue"] = x.venue.displayName;
                obj["StartDate"] = x.start.date;
                obj["Location"] = x.location.city;
                obj["Headliners"] = x.performance.filter(artist => {
                  if(artist.billing == "headline")
                    return artist;
                }).map(y => y.displayName);
                obj["SupportArtists"] = x.performance.filter(artist => {
                  if(artist.billing != "headline"){
                    return artist;
                  }
                }).map(y => y.displayName)
                
                return obj;
              
              });
              console.log(eventsQueried);
              return eventsQueried;
            })
            .then(results => {
              this.setState({
                events: results,
                done: true
              })
            })
            .catch(error =>{
              console.log(error)
              this.setState({
                error: true,
                errorMsg: error
              })
            })
          })
          .catch(error =>{
            console.log(error)
            this.setState({
              error: true,
              errorMsg: error
            })
          })
      })
      .catch(error => {
        console.log(error)
        this.setState({
          error: true,
          errorMsg: error 
        })
      })

       
  }


  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      done: undefined,
      error: false,
      errorMsg: undefined
   }
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
    //TODO: This section is not working. It just creates an empty page. I don't know why
    if(thisZip == ''){
      alert("No Zip is inputted - redirecting to main page");
      return <Redirect to="/" />;
    }
    //<EventCard eventsData={events} />
    //<div className="eventsPage">Zip entered was: {thisZip}</div>
    return (
      <div>
        
        {!this.state.error ? (
          !this.state.done ? (
            <div className="container">
              <ReactLoading type={"bars"} color={"white"} />
            </div>
           ) : (
            <EventCard eventsData={events} />
           )
        ) :(
          <div className="error-msg">
            <h1>
              {this.state.errorMsg}
            </h1>

          </div>
        )}
        
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
