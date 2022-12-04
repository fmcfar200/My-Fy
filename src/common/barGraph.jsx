import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = props => {
  const { chartData, width, height, options } = props;
  return (
    <div className="Track-Graph-Container">
      <Bar data={chartData} width={width} height={height} options={options} />
    </div>
  );
};

export default BarGraph;
