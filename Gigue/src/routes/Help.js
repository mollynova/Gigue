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
            <h2 className="section-title-3">About Gigue</h2>
            <p className="help-text">
              Gigue was designed to help put you in touch with local shows in your area.
            </p>
            <p className="help-text">
              Enter a zip code to see a chronological list of upcoming music shows,
              including the date and venue.
            </p>
            <p className="help-text">
              To purchase tickets, select the "Purchase Tickets" button under any given show.
            </p>
            <p className="help-text">
              To explore top music by an artist, select the "Explore Artist" button under any show.
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
