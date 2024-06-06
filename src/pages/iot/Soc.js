import React from "react";
import ArcProgress from "../../components/ArcProgress/ArcProgress";

const Soc = (props) => {
  const { score } = props;
  return (
    <ArcProgress
      score={score}
      title={"SoC"}
      unit={"%"}
      start_val={0}
      end_val={100}
      start_color={0}
      end_color={148}
    />
  );
};

export default Soc;
