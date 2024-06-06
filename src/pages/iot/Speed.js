import React, { useEffect, useState } from "react";
import ArcProgress from "../../components/ArcProgress/ArcProgress";

const Speed = (props) => {
  const { score } = props;
  const [color, setColor] = useState("");
  const start_val = 0;
  const end_val = 600;
  const calcColor = (percent) => {
    const absolute_scaled_score = Math.floor(
      (percent / (end_val - start_val)) * 100
    );
    console.log(absolute_scaled_score);
    let a = absolute_scaled_score;
    if (a === 0) {
      setColor("#000");
    } else {
      setColor("#c89537");
    }
  };
  useEffect(() => {
    calcColor(score);
  }, [score]);
  return (
    <ArcProgress
      score={score}
      title={"Motor Speed"}
      unit={"rpm"}
      start_val={start_val}
      end_val={end_val}
      color={color}
    />
  );
};

export default Speed;
