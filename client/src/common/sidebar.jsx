import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidenav">
      <nav className="navbar p-0 side align-items-start nav-fill justify-content-start h-100 navbar-light">
        <NavLink className="nav-item nav-link logo" to="/profile">
          {/* <i
            className="fa fa-wifi"
            style={{
              fontSize: 50,
              transform: "rotate(45deg)",
              color: "#1db954",
              marginTop: 20
            }}
          ></i> */}
          <img src="android-chrome-192x192.png" alt="" width={75} height={75} />
        </NavLink>

        <div className="navbar-nav nav-fill w-100">
          <NavLink className="nav-item nav-link mb-3" to="/profile">
            <i className="fa fa-user" aria-hidden="true"></i>
            <br></br>
            Profile <span className="sr-only">(current)</span>
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/top-tracks">
            <i className="fa fa-play" aria-hidden="true"></i>
            <br></br>
            Top Tracks
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/top-artists">
            <i className="fa fa-music" aria-hidden="true"></i>
            <br></br>
            Top Artists
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/playlists">
            <i className="fa fa-list" aria-hidden="true"></i>
            <br></br>
            Playlists
          </NavLink>
          <NavLink className="nav-item nav-link mb-3" to="/recently-played">
            <i className="fa fa-repeat" aria-hidden="true"></i>
            <br></br>
            Recent
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
