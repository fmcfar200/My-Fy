import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.svg";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div class="sidenav">
      <nav className="navbar p-0 side align-items-start nav-fill justify-content-start h-100 navbar-light">
        <NavLink className="nav-item nav-link logo" to="/profile">
          <img
            src={logo}
            className="d-inline-block align-top"
            width="100"
            height="100"
            alt="logo"
          />
          <br></br>
          MyFy
        </NavLink>

        <div className="navbar-nav nav-fill w-100">
          <NavLink className="nav-item nav-link mb-3" to="/profile">
            <i class="fa fa-user" aria-hidden="true"></i>
            <br></br>
            Profile <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/top-tracks">
            <i class="fa fa-play" aria-hidden="true"></i>
            <br></br>
            Top Tracks
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/top-artists">
            <i class="fa fa-users" aria-hidden="true"></i>
            <br></br>
            Top Artists
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/playlists">
            <i class="fa fa-list" aria-hidden="true"></i>
            <br></br>
            Playlists
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/recently-played">
            <i class="fa fa-repeat" aria-hidden="true"></i>
            <br></br>
            Recent
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
