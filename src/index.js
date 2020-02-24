import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import "assets/scss/now-ui-dashboard.css?v=1.2.0";
//import "assets/scss/now-ui-dashboard.scss?v=1.2.0";
import "assets/css/demo.css";
import HttpsRedirect from "react-https-redirect";
import indexRoutes from "routes/index.jsx";
import "./assets/css/indexStyle.css";
const hist = createBrowserHistory();

ReactDOM.render(
  <HttpsRedirect>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return (
            <Route path={prop.path} key={key} component={prop.component} />
          );
        })}
      </Switch>
    </Router>
  </HttpsRedirect>,

  document.getElementById("root")
);
