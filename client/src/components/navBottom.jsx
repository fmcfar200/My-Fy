import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navBottom.css";

const NavBottom = () => {
  return (
    <React.Fragment>
      <div className="phantom"></div>
      <div>
        <ul class="nav justify-content-center">
          <li>
            <NavLink class="nav-item nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink class="nav-item nav-link" to="/top-tracks">
              Top Tracks
            </NavLink>
          </li>
          <li>
            <NavLink class="nav-item nav-link" to="/top-artists">
              Top Artists
            </NavLink>
          </li>
          <li>
            <NavLink class="nav-item nav-link" to="/playlists">
              Playlists
            </NavLink>
          </li>
          <li>
            <NavLink class="nav-item nav-link" to="/recent">
              Recent
            </NavLink>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default NavBottom;
