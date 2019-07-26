import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import "../styles/spotifyButton.css";

class LoginScreen extends Component {
  state = {};
  render() {
    return (
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <div style={{ textAlign: "center" }}>
            <a href="http://localhost:8888">
              <button className="Spotify-Button Spotify-Button-Trans">
                Login To Spotify
              </button>
            </a>
          </div>
        </div>
      </header>
    );
  }
}
export default LoginScreen;
