import React, { useEffect, useState } from "react";
import ArcProgress from "../../components/ArcProgress/ArcProgress";

const Soc = (props) => {
  const { score } = props;
  const [color, setColor] = useState("");
  const start_val = 0;
  const end_val = 100;
  const calcColor = (percent) => {
    const absolute_scaled_score = Math.floor(
      (percent / (end_val - start_val)) * 100
    );
    console.log(absolute_scaled_score);
    let a = absolute_scaled_score;
    if (a === 0) {
      setColor("#000");
    } else if (a < 50) {
      setColor("#c84d37");
    } else {
      setColor("#37c87b");
    }
  };
  useEffect(() => {
    calcColor(score);
  }, [score]);
  return (
    <ArcProgress
      score={score}
      title={"SoC"}
      unit={"%"}
      start_val={start_val}
      end_val={end_val}
      color={color}
    />
  );
};

export default Soc;
