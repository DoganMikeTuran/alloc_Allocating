import React from "react";
import { Container } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <a href="https://www.creative-tim.com">Allocating system</a>
              </li>
              <li>
                <a href="https://https://pakkemodelalpha.azurewebsites.net/">About Us</a>
              </li>
              <li>
                <a href="https://pakkemodelalpha.azurewebsites.net/ChangeLog">Changelog</a>
              </li>
            </ul>
          </nav>
          <div className="copyright">
            &copy; {1900 + new Date().getYear()}, Designed by{" "}
            <a
              href="https://www.invisionapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dogan Mike Turan
            </a>. Coded by{" "}
            <a
              href="https://www.creative-tim.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dogan Mike Turan
            </a>.
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
