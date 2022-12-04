import React from "react";
import { Digital } from "react-activity";
import "react-activity/dist/react-activity.css";
import "../styles/activityIndicator.css";

const ActivityIndicator = () => {
  return (
    <div>
      <Digital className="container" color="var(--secondary-color)" size={30} />
    </div>
  );
};

export default ActivityIndicator;
