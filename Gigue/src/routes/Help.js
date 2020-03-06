/* page for loading events on bootstrap cards */

import React from "react";
import "../styles/App.css";
import "../styles/help.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from "react-router-dom";

class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // below I added a link back to the landing page, just to make our lives easier while testing
  // we'll remove it when we actually build the events page, since users won't need to go back to
  // the landing page
  render() {
    return (
      <div>
        <div className="card help-card">
          <div clasName="card-body">
            <p id="help-text">
              This is the Help Page for Gigue! Right now, Gigue is a series of simple
              API calls designed to just get the information for shows in your area.
              Simply navigate to the Home page using the link below, enter the Zip Code
              for the area you're interested in, and click "Go!". Gigue will automatically
              show you different shows in your area.
  
              Simply hover each "card" in order to find out more about the show, the band, and
              a link to purchase tickets to the show.
  
              If you have any question and suggestions, please shoot as an email at the email below!
              example@gmail.com
          </p>
          </div>

        </div>
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

export default Help;
