import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CreateUser from "./CreateUser";

export default class CreateUserView extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route
            exact
            path="createuser"
            render={props => <CreateUser {...props} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}
