import React from "react";
import ArcProgress from "../../components/ArcProgress/ArcProgress";

const Temp = (props) => {
  const { score } = props;
  return (
    <ArcProgress
      score={score}
      title={"Temperature"}
      unit={"\u00B0C"}
      start_val={10}
      end_val={50}
      start_color={148}
      end_color={0}
    />
  );
};

export default Temp;
