import React, { Component } from "react";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button
} from "reactstrap";

class Users extends Component {
  constructor(props) {
    super(props);
  }
  onSubmitHandler = e => {
    e.preventDefault();
    this.props.history.push("/users/20");
  };

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="container-2">
          <Row>
            <Col md="6">Hej</Col>

            <Col md="6">Farvel</Col>
            <Form onSubmit={this.onSubmitHandler}>
              <Button>GetUser</Button>
            </Form>
          </Row>
        </div>
        <h1>All users</h1>
      </div>
    );
  }
}

export default Users;
