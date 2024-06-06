import React from "react";
import ProgressProvider from "./ProgressProvider";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./index.scss";

const ArcProgress = (props) => {
  const { score, title, unit, start_color, end_color, start_val, end_val } =
    props;
  const scaled_score = Math.floor((score / (end_val - start_val)) * 100);
  const absolute_scaled_score = Math.floor(
    ((score - start_val) / (end_val - start_val)) * 100
  );
  console.log(scaled_score);
  // function for calculating the color
  const calcColor = (percent, start, end) => {
    let a = percent / 100,
      h,
      s;
    if (end > start) {
      if (a > 0.4) {
        h = end;
        s = 57;
      } else {
        h = start;
        s = 100;
      }
    } else {
      if (a > 0.6) {
        h = end;
        s = 100;
      } else {
        h = start;
        s = 57;
      }
    }

    // return an CSS hsl color string
    return "hsl(" + h + ", " + s + "%, 50%)";
  };

  return (
    <div className="arc-container">
      <ProgressProvider valueStart={0} valueEnd={scaled_score}>
        {(value) => (
          <CircularProgressbar
            value={value}
            text={`${score}${unit}`}
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
                stroke: calcColor(
                  absolute_scaled_score,
                  start_color,
                  end_color
                ),
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
