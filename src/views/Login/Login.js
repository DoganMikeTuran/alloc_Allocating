import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import apiFacade from "../../auth/apiFacade";
import { Footer } from "components";
import LoginView from "./LoginView";

var ps;

class Login extends React.Component {
  constructor(props) {
    super(props);

    // if (apiFacade.isAuthenticated() === true) this.props.history.push('/bookings')
  }
  componentDidMount() {
    console.log(apiFacade.isAuthenticated());
    if (apiFacade.isAuthenticated() === true)
      this.props.history.push("/dashboard");
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  render() {
    return (
      <div>
        <div className="wrapper wrapper-full-page" ref="fullPages">
          <div className="full-page section-image">
            <LoginView {...this.props} />

            <Footer fluid />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
