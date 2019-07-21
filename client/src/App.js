import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { getHashParams } from "./utils/hashParameters";
import LoginScreen from "./components/loginScreen";
import Profile from "./components/profile";
import NotFound from "./components/notFound";
import TopTracks from "./components/topTracks";
import NavBar from "./components/navBar";
import "./App.css";

const params = getHashParams();

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
        {!params.access_token ? (
          <React.Fragment>
            <LoginScreen />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavBar />
            <main className="App">
              <Switch>
                {/* <Route path="/login" component={LoginScreen} /> */}
                <Route path="/profile" component={Profile} />
                <Route path="/top-tracks" component={TopTracks} />
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
