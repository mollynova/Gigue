import { NavLink } from "react-router-dom";
import React from "react";
import "../styles/App.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="header">
          <div className="header-title">
            <b>Gigue</b>
          </div>
        </div>
        <div className="searchbar"></div>
      </div>
    );
  }
}

export default Header;
