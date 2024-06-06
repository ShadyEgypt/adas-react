import React, { Component, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./iot.scss";
import Temp from "./temp";
import Soc from "./Soc";
import Soh from "./Soh";
import Speed from "./Speed";
import { Amplify } from "aws-amplify";
import { PubSub } from "@aws-amplify/pubsub";
import { fetchAuthSession } from "aws-amplify/auth";

fetchAuthSession().then((info) => {
  const cognitoIdentityId = info.identityId;
  console.log(cognitoIdentityId);
});

// Apply plugin with configuration
const pubsub = new PubSub({
  region: "<YOUR-IOT-REGION>",
  endpoint: "wss://xxxxxxxxxxxxx.iot.<YOUR-IOT-REGION>.amazonaws.com/mqtt",
});

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const Iot = () => {
  const [data, setData] = useState([]);

  return (
    <>
      <div className="container-iot">
        <div className="progress-container">
          <Temp />
          <Soc />
          <Soh />
          <Speed />
        </div>
      </div>
    </>
  );
};

export default withNavigation(Iot);
