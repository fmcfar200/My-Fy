import React from "react";
import { Digital } from "react-activity";
import "react-activity/dist/react-activity.css";

const ActivityIndicator = () => {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%" }}>
      <Digital color="#1db954" size={30} />
    </div>
  );
};

export default ActivityIndicator;
