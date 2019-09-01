import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";
import ReactGA from "react-ga";
import createHistory from "history/createBrowserHistory";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const history = createHistory();
ReactGA.initialize("UA-146858098-1");
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
});

Sentry.init({
  dsn: "https://6c2d25552e28485fa1933d8b2b3fd261@sentry.io/1547072"
});

var $ = require("jquery");
window.$ = $;
require("bootstrap");

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
