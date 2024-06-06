import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "./line.scss";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const LineChart = ({ min, max, stepSize, data_labels, data_values, title }) => {
  const data = {
    labels: data_labels,
    datasets: [
      {
        label: title,
        data: data_values,
        backgroundColor: "rgb(227, 215, 109)",
        borderColor: "rgb(11, 105, 219)",
        pointBorderWidth: 2,
        tension: 0.2,
      },
    ],
  };
  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        min: min,
        max: max,
        ticks: {
            stepSize:stepSize
        },
        grid: {
          display: true,
        },
      },
    },
  };
  return (
    <div className="line-container">
      <Line className={"line"} data={data} options={options}></Line>
      <h4 className="title">{title}</h4>
    </div>
  );
};

export default LineChart;
