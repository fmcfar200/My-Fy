import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { token } from "./utils";
import ScrollUpButton from "react-scroll-up-button";
import LoginScreen from "./components/loginScreen";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import TopTracks from "./components/topTracks";
import Track from "./components/track";
import TopArtists from "./components/topArtists";
import Artist from "./components/artist";
import Playlists from "./components/playlists";
import Playlist from "./components/playlist";
import Generator from "./components/generator";
import NavBottom from "./components/navBottom";
import Sidebar from "./common/sidebar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

toast.configure();
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: token ? true : false
    };
    console.log(this.state.loggedIn);
  }

  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        {!token ? (
          <React.Fragment>
            <LoginScreen />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Sidebar />
            <main className="App">
              <Switch>
                <Route path="/profile" component={Profile} />
                <Route path="/top-tracks" component={TopTracks} />
                <Route path="/top-artists" component={TopArtists} />
                <Route path="/playlists" component={Playlists} />
                <Route path="/tracks/:id" component={Track} />
                <Route path="/artists/:id" component={Artist} />
                <Route path="/playlist/:id" component={Playlist} />
                <Route path="/generator/:type/:id" component={Generator} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/profile" />
                <Redirect to="/not-found" />
              </Switch>
            </main>
            <ScrollUpButton
              style={{
                bottom: "95px"
              }}
            />
            <NavBottom></NavBottom>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
