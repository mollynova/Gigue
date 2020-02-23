import { Redirect, NavLink, Link } from "react-router-dom";
import React from "react";
import "../styles/App.css";
import Events from "./Events";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    // value: name of city user entered
    /* toEvents: default value is false. when user hits submit button on landing page, the onClick attribute
                 calls the handleSubmit function, which switches 'toEvents' to true, meaning 'the user wants to 
                 be routed to the Events page.' Then, when Landing returns, if toEvents is true, it redirects to
                 the events page instead of rendering the Landing page
    */
    this.state = { value: "", toEvents: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // sets the state for 'value' (which is the city the user entered) as a user types
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // Function called when a user hits submit from the landing page. this.state.value is the city they entered
  handleSubmit(event) {
    // set state "toEvents" to true
    this.setState(() => ({
      toEvents: true
    }));

    // any code written after this is going to get called BEFORE the Events page is rendered.
    // this.state.value is the name of the city the user typed in
    console.log("You entered: " + this.state.value);
    event.preventDefault();
  }

  render() {
    if (this.state.toEvents === true) {
      return <Redirect to="/Events" />;
    }

    return (
      <div>
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

export default Landing;
