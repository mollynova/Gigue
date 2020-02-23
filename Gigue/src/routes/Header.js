import { Redirect, NavLink } from "react-router-dom";
import React from "react";
import "../styles/App.css";
import mainLogo from "../images/icon.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="icon">
            <img src={mainLogo} />
          </div>
          <div className="header-title">Gigue</div>
          <div className="help-link">
            <NavLink to="/Help" style={{ textDecoration: "none" }}>
              <div className="help">Help</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
