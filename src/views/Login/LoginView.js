import React from "react";
import jwt_decode from "jwt-decode";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  Container,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
//as
import { Button } from "components";
import apiFacade from "../../auth/apiFacade";

import nowLogo from "assets/img/now-logo.png";

import bgImage from "assets/img/bg13.jpg";

var loginStyle = {
  textColor: {
    color: "#3787C6"
  },
  size: {
    width: "700px",
    height: "200px"
  }
};

class LoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      password: ""
    };
  }

  onSubmitHandler = e => {
    e.preventDefault();

    apiFacade.login(this.state.userEmail, this.state.password).then(data => {
      // herinde sætter du din accessToken osv.

      const decode = jwt_decode(data.token);

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("expiresOn", decode.exp);
      this.props.history.push("/dashboard");
      console.log(apiFacade.isAuthenticated());
    });
  };

  render() {
    return (
      <div>
        <div className="full-page-content">
          <div className="login-page">
            <Container>
              <Row>
                <Col sm="2"></Col>
                <Col className="ml-auto mr-auto">
                  <Card className="card card-plain">
                    <div className="logo-container">
                      <img src={nowLogo} alt="now-logo" />
                    </div>
                  </Card>
                </Col>
              </Row>
              <Col xs={12} md={8} lg={4} className="ml-auto mr-auto">
                <Form onSubmit={this.onSubmitHandler}>
                  <Card className="card-login card-plain">
                    <CardHeader>
                      {/*  <div className="logo-container">
                        <img src={nowLogo} alt="now-logo" />
                      </div> */}
                    </CardHeader>
                    <CardBody>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.firstnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          name="email"
                          id="email"
                          value={this.state.userEmail}
                          onChange={e => {
                            this.setState({ userEmail: e.target.value });
                          }}
                          placeholder="E-mail"
                          onFocus={e => this.setState({ firstnameFocus: true })}
                          onBlur={e => this.setState({ firstnameFocus: false })}
                        />
                      </InputGroup>
                      <InputGroup
                        className={
                          "no-border form-control-lg " +
                          (this.state.lastnameFocus ? "input-group-focus" : "")
                        }
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons text_caps-small" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          name="password"
                          id="password"
                          value={this.state.password}
                          onChange={e => {
                            this.setState({ password: e.target.value });
                          }}
                          onFocus={e => this.setState({ lastnameFocus: true })}
                          onBlur={e => this.setState({ lastnameFocus: false })}
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        round
                        color="primary"
                        size="lg"
                        type="submit"
                        className="mb-3"
                      >
                        Login
                      </Button>
                    </CardFooter>
                  </Card>
                </Form>
              </Col>
            </Container>
          </div>
        </div>
        <div
          className="full-page-background"
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />
      </div>
    );
  }
}

export default LoginView;
