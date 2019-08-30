import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navBottom.css";

const NavBottom = () => {
  return (
    <React.Fragment>
      <div className="phantom"></div>
      <nav class="navbar bottom fixed-bottom">
        <div className="navbar-nav nav-fill w-100 flex-row">
          <NavLink className="nav-item nav-link" to="/profile">
            <i class="fa fa-user" aria-hidden="true"></i> <br />
            Profile <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/top-tracks">
            <i class="fa fa-play" aria-hidden="true"></i> <br />
            Top Tracks
          </NavLink>
          <NavLink className="nav-item nav-link" to="/top-artists">
            <i class="fa fa-users" aria-hidden="true"></i> <br></br>
            Top Artists
          </NavLink>
          <NavLink className="nav-item nav-link" to="/playlists">
            <i class="fa fa-list" aria-hidden="true"></i> <br></br>
            Playlists
          </NavLink>
          <NavLink className="nav-item nav-link" to="/recently-played">
            <i class="fa fa-repeat" aria-hidden="true"></i> <br></br>
            Recent
          </NavLink>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default NavBottom;
