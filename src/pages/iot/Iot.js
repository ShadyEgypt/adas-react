import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./iot.scss";
import Temp from "./Temp";
import Soc from "./Soc";
import Soh from "./Soh";
import Speed from "./Speed";
import TempLine from "./TempLine";
import SocLine from "./SocLine";
import SohLine from "./SohLine";
import SpeedLine from "./SpeedLine";
import { PubSub } from "@aws-amplify/pubsub";
import { fetchAuthSession } from "aws-amplify/auth";

const pubsub = new PubSub({
  region: "eu-north-1",
  endpoint: "wss://ag4n5fourdi53-ats.iot.eu-north-1.amazonaws.com/mqtt",
});

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const Iot = () => {
  const [rtdata, setRTData] = useState({
    temp: 0,
    soh: 0,
    soc: 0,
    speed: 0,
  });

  const [hData, setHData] = useState({
    temp: [],
    soh: [],
    soc: [],
    speed: [],
  });

  const [labels, setLabels] = useState([]);
  const handleMessage = (payload) => {
    try {
      const { temp, soh, soc, speed, time, date } = payload;
      setRTData({
        temp: temp,
        soh: soh,
        soc: soc,
        speed: speed,
        time: time,
      });
    } catch (error) {
      console.error("Error parsing JSON payload:", error);
    }
  };

  useEffect(() => {
    setHData((prevHData) => ({
      temp:
        prevHData.temp.length >= 10
          ? [...prevHData.temp.slice(1), rtdata.temp]
          : [...prevHData.temp, rtdata.temp],
      soh:
        prevHData.soh.length >= 10
          ? [...prevHData.soh.slice(1), rtdata.soh]
          : [...prevHData.soh, rtdata.soh],
      soc:
        prevHData.soc.length >= 10
          ? [...prevHData.soc.slice(1), rtdata.soc]
          : [...prevHData.soc, rtdata.soc],
      speed:
        prevHData.speed.length >= 10
          ? [...prevHData.speed.slice(1), rtdata.speed]
          : [...prevHData.speed, rtdata.speed],
    }));
    setLabels(
            prevLabels =>
        prevLabels.length >= 10
          ? [...prevLabels.slice(1), rtdata.time]
          : [...prevLabels, rtdata.time]
    );
  }, [rtdata]); // Correct dependency

  useEffect(() => {
    fetchAuthSession().then((info) => {
      const cognitoIdentityId = info.identityId;
      console.log("Cognito Identity ID", cognitoIdentityId);
    });

    const subscription = pubsub.subscribe({ topics: "adas/pub" }).subscribe({
      next: (payload) => {
        handleMessage(payload);
      },
      error: (error) => {
        console.error("Subscription error:", error);
      },
      close: () => console.log("Subscription closed"),
    });

    return () => subscription.unsubscribe(); // Proper cleanup
  }, []);

  return (
    <>
      <div className="container-iot">
        <div className="progress-container">
          <Temp score={rtdata.temp} />
          <Soc score={rtdata.soc} />
          <Soh score={rtdata.soh} />
          <Speed score={rtdata.speed} />
        </div>
        <div className="charts-container">
          <TempLine data={hData.temp} labels={labels} />
          <SpeedLine data={hData.speed} labels={labels} />
          <SocLine data={hData.soc} labels={labels} />
          <SohLine data={hData.soh} labels={labels} />
        </div>
      </div>
    </>
  );
};

export default withNavigation(Iot);
