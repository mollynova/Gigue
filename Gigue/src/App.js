/* landing page */

import React, { PropTypes, Component } from "react";
import "./styles/bootstrap/css/bootstrap.min.css";
//import "./styles/App.css";
import "./index.css";
import Header from "./routes/Header";
import Body from "./routes/Body";
import { Switch, Route, NavLink } from "react-router-dom";
import Landing from "./routes/Landing";
import Events from "./routes/Events";
import Help from "./routes/Help";
import ArtistPage from "./routes/ArtistPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { zip: "" };
    this.handleZipChange = this.handleZipChange.bind(this);
  }

  handleZipChange = newZip => {
    this.setState({ zip: newZip });
  };

  render() {
    const currZip = this.state.zip;

    return (
      <div className="App">
        <Header zip={currZip} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                {...props}
                zip={currZip}
                onZipChange={this.handleZipChange}
              />
            )}
          />
          <Route
            exact
            path="/Events"
            render={props => (
              <Events
                {...props}
                zip={currZip}
                onZipChange={this.handleZipChange}
              />
            )}
          />
          <Route exact path="/Help" component={Help}></Route>
          <Route exact path="/ArtistPage" render={props =>(
            <ArtistPage
              {...props}
            />
          )}>

          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
