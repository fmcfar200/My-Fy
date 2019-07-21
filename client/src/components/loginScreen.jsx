import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class LoginScreen extends Component {
  state = {};
  render() {
    return (
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <div style={{ textAlign: "center" }}>
            <a href="http://localhost:8888">
              <button className="Spotify-button">Login To Spotify</button>
            </a>
          </div>
        </div>
      </header>
    );
  }
}
export default LoginScreen;
