import React, { useState, useEffect } from "react";
import ProgressProvider from "./ProgressProvider";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./index.scss";

const ArcProgress = ({
  score,
  title,
  unit,
  start_val,
  end_val,
  color = "#000",
}) => {
  const scaled_score = Math.floor((score / (end_val - start_val)) * 100);

  return (
    <div className="arc-container">
      <ProgressProvider valueStart={0} valueEnd={scaled_score}>
        {(value) => (
          <CircularProgressbar
            value={value}
            text={`${score} ${unit}`}
            circleRatio={0.7}
            styles={{
              trail: {
                strokeLinecap: "butt",
                transform: "rotate(-126deg)",
                transformOrigin: "center center",
              },
              path: {
                strokeLinecap: "butt",
                transform: "rotate(-126deg)",
                transformOrigin: "center center",
                stroke: color,
              },
              text: {
                fill: "#A07856",
              },
            }}
            strokeWidth={10}
          />
        )}
      </ProgressProvider>
      <h4 className="title">{title}</h4>
    </div>
  );
};

export default ArcProgress;
