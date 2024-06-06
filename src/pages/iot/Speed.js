import React from "react";
import ArcProgress from "../../components/ArcProgress/ArcProgress";

const Speed = (props) => {
  const { score } = props;
  return (
    <ArcProgress
      score={score}
      title={"Motor Speed"}
      unit={"rpm"}
      start_val={0}
      end_val={600}
      start_color={0}
      end_color={148}
    />
  );
};

export default Speed;
