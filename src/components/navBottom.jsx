import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navBottom.css";

const NavBottom = () => {
  return (
    <React.Fragment>
      <div className="phantom"></div>
      <nav className="navbar bottom fixed-bottom">
        <div className="navbar-nav nav-fill w-100 flex-row">
          <NavLink className="nav-item nav-link" to="/profile">
            <i className="fa fa-user" aria-hidden="true"></i> <br />
            Profile <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/top-tracks">
            <i className="fa fa-play" aria-hidden="true"></i> <br />
            Top Tracks
          </NavLink>
          <NavLink className="nav-item nav-link" to="/top-artists">
            <i className="fa fa-music" aria-hidden="true"></i> <br></br>
            Top Artists
          </NavLink>
          <NavLink className="nav-item nav-link" to="/playlists">
            <i className="fa fa-list" aria-hidden="true"></i> <br></br>
            Playlists
          </NavLink>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBottom;
