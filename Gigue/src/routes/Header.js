import { Redirect, NavLink } from "react-router-dom";
import React from "react";
import "../styles/App.css";
import mainLogo from "../images/icon.png";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onZipChange(e.target.value);
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="icon">
            <img src={mainLogo} />
          </div>
          <div className="main-link">
            <NavLink to="/" style={{textDecoration: "none"}}>
              <div className="header-title">Gigue</div>
            </NavLink>
          </div>
        
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
