import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";
import "../styles/spotifyButton.css";
require("dotenv").config();

const DEV_SERVER = "http://localhost:8888";
const PROD_SERVER = "https://my-fyauth.herokuapp.com/";
class LoginScreen extends Component {
  state = {
    authServerURL: PROD_SERVER
  };

  componentDidMount() {
    if (process.env.NODE_ENV === "development") {
      this.setState({
        authServerURL: DEV_SERVER
      });
    }
  }

  render() {
    return (
      <header className="App-header">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <div style={{ textAlign: "center" }}>
            {/* https://my-fyauth.herokuapp.com/ -production
              http://localhost:8888 - development */}
            <a href={this.state.authServerURL}>
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
