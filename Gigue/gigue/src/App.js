/* landing page */

import React, { Component } from "react";
import "./styles/bootstrap/css/bootstrap.min.css";
import "./styles/App.css";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    // initializing state. currently only has one value
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // sets the state for 'value' (which is the city the user entered) as a user types
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // function called when a user hits submit. this.state.value is the city they entered
  handleSubmit(event) {
    alert("You entered: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="header-title">
            <b>Gigue</b>
          </div>
        </div>
        <div className="searchbar"></div>
        <div className="main-body">
          <div className="main-question" id="thisfontonly">
            What city are you looking for?
          </div>
          <div className="textbar-and-button">
            <input
              onChange={this.handleChange}
              value={this.state.value}
              type="text"
              name="city"
              id="citylabel"
              style={{ fontSize: "24pt" }}
              className="rcorners"
            />
            <div className="buttons">
              <input
                onClick={this.handleSubmit}
                type="submit"
                name="submit"
                value="Go!"
                id="submit"
                className="button"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
