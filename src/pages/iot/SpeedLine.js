import React from "react";
import LineChart from "../../components/LineChart/LineChart";

const SpeedLine = ({data, labels}) => {
  return (
    <LineChart
      min={0}
      max={600}
      stepSize={50}
      data_labels={labels}
      data_values={data}
      title={"Motor Speed"}
    />
  );
};

export default SpeedLine;
