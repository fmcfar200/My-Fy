import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { getHashParams } from "./utils/hashParameters";
import { ToastContainer, toast } from "react-toastify";
import LoginScreen from "./components/loginScreen";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import TopTracks from "./components/topTracks";
import Track from "./components/track";
import NavBar from "./components/navBar";
import TopArtists from "./components/topArtists";
import Artist from "./components/artist";
import Playlists from "./components/playlists";
import Playlist from "./components/playlist";
import Generator from "./components/generator";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const params = getHashParams();
toast.configure();
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: params.access_token ? true : false
    };
    console.log(this.state.loggedIn);
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        {!params.access_token ? (
          <React.Fragment>
            <LoginScreen />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavBar />
            <main className="App">
              <Switch>
                <Route path="/profile" component={Profile} />
                <Route path="/top-tracks" component={TopTracks} />
                <Route path="/top-artists" component={TopArtists} />
                <Route path="/playlists" component={Playlists} />
                <Route path="/tracks/:id" component={Track} />
                <Route path="/artists/:id" component={Artist} />
                <Route path="/playlist/:id" component={Playlist} />
                <Route path="/generator/:id" component={Generator} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/profile" />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default App;
