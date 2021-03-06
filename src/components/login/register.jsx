import React from "react";
import axios from "axios";

import Alert from "@material-ui/lab/Alert";

export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault(); //prevent page from loading

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    //console.log(newUser);

    axios
      .post(
        "https://decode-your-skin-backend.herokuapp.com/users/registerUser",
        newUser
      )
      .then((res) => {
        console.log(res.data);
        alert(res.data);
      })
      .catch((err) => this.setState({ error: err.response.data }));

    this.setState({
      username: "",
      email: "",
      password: "",
      error: "",
    });
  }

  render() {
    const { error } = this.state;

    return (
      <div className="base-container">
        <div className="header">Register</div>
        <div className="content">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                placeholder="Enter your username here"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Enter your email here"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Enter your password here"
                onChange={this.handleChange}
                required
                minLength="8"
              />
            </div>
            <div className="footer">
              <button type="submit" className="btn">
                Register
              </button>
            </div>
          </form>
          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
        </div>
      </div>
    );
  }
}
