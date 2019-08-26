import React from "react";
import { Digital } from "react-activity";
import "../styles/activityIndicator.css";
import "react-activity/dist/react-activity.css";

const ActivityIndicator = () => {
  return (
    <div>
      <Digital className="container" color="#1db954" size={30} />
    </div>
  );
};

export default ActivityIndicator;
