/* page for loading events on bootstrap cards */
import { Redirect, NavLink, Link } from "react-router-dom";
import React from "react";
import "../styles/App.css";
import EventCard from "./EventCard";
import ReactLoading from "react-loading";
import Landing from "./Landing";
import "../styles/searchpage.css";
import { Bar, Pie } from "react-chartjs-2";

class Events extends React.Component {
  state = {
    events: [],

    chartDataVenues: {
      labels: [],
      datasets: [
        {
          label: "Amounts",
          data: []
        }
      ]
    },

    chartDataArtist: {
      labels: [
        "Solo Headliner",
        "Headliner with One Support",
        "Headliners with Multiple Supports",
        "More than one Headliner",
        "More than one Headliner, more than one Support"
      ],

      datasets: [
        {
          data: [],
          backgroundColor: ["red", "blue", "green", "orange", "purple"]
        }
      ]
    }
  };

  componentWillMount() {
    const googleUrl =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      this.props.zip +
      "&key=AIzaSyD4JUjJlvCDbZO7NeG_1luAwhjp7qGJGkY";
    fetch(googleUrl)
      .then(result => result.json())
      .then(result => {
        if (result.results.length == 0) {
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
        const songkickAreaUrl =
          "https://api.songkick.com/api/3.0/search/locations.json?location=geo:" +
          lat +
          "," +
          long +
          "&apikey=nD4GefUecMO1Dzwh";
        console.log(songkickAreaUrl);
        return songkickAreaUrl;
      })
      .then(url => {
        fetch(url)
          .then(result => result.json())
          .then(result => {
            console.log(result);
            if (result.resultsPage.totalEntries == "0") {
              throw "Area out of range";
            }
            return result.resultsPage.results;
          })
          .then(result => {
            const metroAreaId = result.location[0].metroArea.id;
            const songkickEventsUrl =
              "https://api.songkick.com/api/3.0/metro_areas/" +
              metroAreaId +
              "/calendar.json?apikey=nD4GefUecMO1Dzwh";
            console.log(songkickEventsUrl);
            return songkickEventsUrl;
          })
          .then(url => {
            fetch(url)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                console.log(data.resultsPage.results.event);
                if (data.resultsPage.totalEntries == 0) {
                  throw "No Concerts in this Area!";
                }
                return data.resultsPage.results.event;
              })
              .then(data => {
                const VenueNames = [];
                const VenuePopularity = [];
                const ArtistInfo = [0, 0, 0, 0, 0];
                console.log("data (important one): ", data);

                const eventsQueried = data.map(x => {
                  let obj = {};
                  obj["EventName"] = x.displayName;
                  obj["Uri"] = x.uri;
                  obj["Venue"] = x.venue.displayName;
                  obj["StartDate"] = x.start.date;
                  obj["Location"] = x.location.city;
                  obj["Headliners"] = x.performance
                    .filter(artist => {
                      if (artist.billing == "headline") return artist;
                    })
                    .map(y => y.displayName);
                  obj["SupportArtists"] = x.performance
                    .filter(artist => {
                      if (artist.billing != "headline") {
                        return artist;
                      }
                    })
                    .map(y => y.displayName);
                  const position = VenueNames.indexOf(x.venue.displayName);
                  if (position == -1) {
                    VenueNames.push(x.venue.displayName);
                    VenuePopularity.push(1);
                  } else {
                    VenuePopularity[position] += 1;
                  }

                  if (
                    obj["Headliners"].length == 1 &&
                    obj["SupportArtists".length == 0]
                  ) {
                    ArtistInfo[0] += 1;
                  } else if (
                    obj["Headliners"].length == 1 &&
                    obj["SupportArtists"].length == 1
                  ) {
                    ArtistInfo[1] += 1;
                  } else if (
                    obj["Headliners"].length == 1 &&
                    obj["SupportArtists"].length > 1
                  ) {
                    ArtistInfo[2] += 1;
                  } else if (
                    obj["Headliners"].length > 1 &&
                    obj["SupportArtists"].length == 0
                  ) {
                    ArtistInfo[3] += 1;
                  } else if (
                    obj["Headliners"].length > 1 &&
                    obj["SupportArtists"].length > 1
                  ) {
                    ArtistInfo[4] += 1;
                  }
                  return obj;
                });
                console.log(eventsQueried);
                this.setState({
                  chartDataVenues: {
                    labels: VenueNames,
                    datasets: [
                      {
                        label: "Amounts",
                        data: VenuePopularity,
                        backgroundColor: "red"
                      }
                    ]
                  },
                  chartDataArtist: {
                    labels: [
                      "Solo Headliner",
                      "Headliner with One Support",
                      "Headliners with Multiple Supports",
                      "More than one Headliner",
                      "More than one Headliner, more than one Support"
                    ],
                    datasets: [
                      {
                        data: ArtistInfo,
                        backgroundColor: [
                          "red",
                          "blue",
                          "green",
                          "orange",
                          "purple"
                        ]
                      }
                    ]
                  }
                });
                console.log(this.state.chartDataArtist);
                return eventsQueried;
              })
              .then(results => {
                this.setState({
                  events: results,
                  done: true
                });
              })
              .catch(error => {
                console.log(error);
                this.setState({
                  error: true,
                  errorMsg: error
                });
              });
          })
          .catch(error => {
            console.log(error);
            this.setState({
              error: true,
              errorMsg: error
            });
          });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true,
          errorMsg: error
        });
      });
  }

  constructor(props) {
    super(props);

    this.state = {
      done: undefined,
      error: false,
      errorMsg: undefined
      // tmEvents: [],
      // counter: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.toArtistPage = this.toArtistPage.bind(this);
    // this.buildTmEvents = this.buildTmEvents.bind(this);
    // this.countUp = this.countUp.bind(this);
  }

  // countUp = () => {
  //   this.setState({
  //     counter: this.state.counter + 1
  //   });
  // };
  handleChange(e) {
    this.props.onZipChange(e.target.value);
  }

  // buildTmEvents = events => {
  //   events.map(data => {
  //     if (data.Headliners.length > 0) {
  // const artistName = data.Headliners[0].replace(/\s/g, "+");
  // const location = data.Location.replace(/\s/g, "").split(",");
  // const city = location[0];
  // const state = location[1];
  // const country = location[2];
  // const eventUrl =
  //   "https://cors-anywhere.herokuapp.com/https://app.ticketmaster.com/discovery/v2/events.json?countryCode=" +
  //   country +
  //   "&city=" +
  //   city +
  //   "&stateCode=" +
  //   state +
  //   "&keyword=" +
  //   artistName +
  //   "&classificationName=music&apikey=PHYwwIYWv17JZadduBfzAq9lLsqOsWIN";
  // fetch(eventUrl)
  //   .then(response => response.json())
  //   .then(events => {
  //     console.log("event deets from TM: ", events);
  //   })
  //         .then(results => {
  //           this.setState({
  //             tmEvents: results
  //           });
  //         });
  //       this.countUp();
  //     }
  //   });
  // };

  toArtistPage = (artistName, locationName) => {
    return this.props.history.push({
      pathname: "/ArtistPage",
      state: {
        artist: artistName,
        location: locationName
      }
    });
  };
  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    const thisZip = this.props.zip;
    const { events } = this.state;
    console.log("events: ", events);
    // const { tmEvents } = this.state;
    // this.buildTmEvents(events);
    console.log("number of TM api calls: ", this.state.counter);
    //TODO: This section is not working. It just creates an empty page. I don't know why
    if (thisZip == "") {
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
            <div className="LoadedInfo">
              <EventCard
                eventsData={events}
                // tmEventsData={tmEvents}
                toArtistPage={this.toArtistPage}
              />

              <div className="chart-container">
                <div className="chart-area">
                  <Bar
                    data={this.state.chartDataVenues}
                    options={{
                      responsive: true,
                      scales: {
                        yAxes: [
                          {
                            ticks: {
                              beginAtZero: true,
                              stepSize: 1
                            }
                          }
                        ]
                      }
                    }}
                  />
                </div>

                <div className="chart-area chart-right">
                  <Pie
                    data={this.state.chartDataArtist}
                    options={{
                      responsive: true
                    }}
                  />
                </div>
              </div>
            </div>
          )
        ) : (
          <div className="error-msg">
            <h1>{this.state.errorMsg}</h1>
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
