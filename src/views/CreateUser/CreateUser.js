import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      id: ""
    };
  }
  changeHandler = event => {
    if (event.target.name === "id") {
      this.setState({ [event.target.name]: parseInt(event.target.value) });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };
  submitHandler = e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") + ""}`
      }
    };

    axios
      .post(
        "https://localhost:5001/api/empusers",
        {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          id: this.state.id,
          clientid: localStorage.getItem("decoded")
        },
        config
      )

      .then(response => {
        console.log("Hello world", response);
        console.log(localStorage.getItem("decoded"));
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <div>
          <input
            type="text"
            name="firstname"
            placeholder="firstname"
            value={this.state.firstname}
            onChange={this.changeHandler}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastname"
            placeholder="lastname"
            value={this.state.lastname}
            onChange={this.changeHandler}
          />
        </div>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.nickname}
            onChange={this.changeHandler}
          />
          <input
            type="text"
            name="id"
            placeholder="Id"
            value={this.state.id}
            onChange={this.changeHandler}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default CreateUser;
