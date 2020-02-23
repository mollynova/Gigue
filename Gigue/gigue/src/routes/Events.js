/* page for loading events on bootstrap cards */

import React from "react";
import "../styles/App.css";
import { NavLink } from "react-router-dom";

class Events extends React.Component {
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
        <div className="eventsPage">Yo we reloaded as a new page. Woohoo.</div>
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
