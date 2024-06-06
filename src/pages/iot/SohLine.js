import React from "react";
import LineChart from "../../components/LineChart/LineChart";

const SohLine = ({data, labels}) => {
  return (
    <LineChart
      min={0}
      max={100}
      stepSize={10}
      data_labels={labels}
      data_values={data}
      title={"SoH"}
    />
  );
};

export default SohLine;
