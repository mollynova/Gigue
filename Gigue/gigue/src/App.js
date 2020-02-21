/* landing page */

import React, { Component } from "react";
import "./styles/bootstrap/css/bootstrap.min.css";
import "./styles/App.css";
import "./index.css";
import Header from "./routes/Header";
import Body from "./routes/Body";
import { NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    // initializing state. currently only has one value
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/* <Navigation /> */}
        <Body />
      </div>
    );
  }
}

// const Navigation = () => (
//   <nav>
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/Events">Events</NavLink>
//       </li>
//     </ul>
//   </nav>
// );

export default App;
