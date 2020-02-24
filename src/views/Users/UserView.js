import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Users from "./Users";
import User from "./User";

export default class UserView extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/users" render={props => <Users {...props} />} />
          <Route path="/users/:id" render={props => <User {...props} />} />
        </Switch>
      </React.Fragment>
    );
  }
}
