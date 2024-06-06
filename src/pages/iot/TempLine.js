import React from "react";
import LineChart from "../../components/LineChart/LineChart";

const TempLine = ({data, labels}) => {
  return (
    <LineChart
      min={0}
      max={50}
      stepSize={10}
      data_labels={labels}
      data_values={data}
      title={"Temperature"}
    />
  );
};

export default TempLine;
