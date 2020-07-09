import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";
import "../styles/navBar.css";

const NavBar = () => {
  return (
    <nav className="navbar top navbar-expand-lg navbar-light">
      <NavLink className="navbar-brand" to="/profile">
        <img
          src={logo}
          className="d-inline-block align-top"
          width="30"
          height="30"
          alt="logo"
        />
        My-Fy
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/profile">
            Profile <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/top-tracks">
            Top Tracks
          </NavLink>
          <NavLink className="nav-item nav-link" to="/top-artists">
            Top Artists
          </NavLink>
          <NavLink className="nav-item nav-link" to="/playlists">
            Playlists
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
