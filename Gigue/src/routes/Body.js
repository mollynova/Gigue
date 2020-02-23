import { Switch, Route } from "react-router-dom";
import React from "react";
import "../styles/App.css";
import Landing from "./Landing";
import Events from "./Events";
import Help from "./Help";

const Body = () => (
  <Switch>
    <Route exact path="/" component={Landing}></Route>
    <Route exact path="/Events" component={Events}></Route>
    <Route exact path="/Help" component={Help}></Route>
  </Switch>
);

export default Body;
