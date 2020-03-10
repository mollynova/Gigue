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
      "https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:" +
      this.props.zip +
      "&key=AIzaSyBNWms-eVzSQmo6leT8Re4yBrpmC9tx-h0";
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
    this.handleChange = this.handleChange.bind(this);
    this.toArtistPage = this.toArtistPage.bind(this);
    this.state = {
      done: undefined,
      error: false,
      errorMsg: undefined
    };
  }

  handleChange(e) {
    this.props.onZipChange(e.target.value);
  }

  toArtistPage = artistName => {
    return this.props.history.push({
      pathname: "/ArtistPage",
      state: {
        artist: artistName
      }
    });
  };
  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    const thisZip = this.props.zip;
    const { events } = this.state;
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
              <EventCard eventsData={events} toArtistPage={this.toArtistPage} />

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
