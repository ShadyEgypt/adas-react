import { useState } from "react";
import Yolov8Page from "./Yolov8/Yolov8";
import YoloV8OptPage from "./Yolov8Opt/Yolov8Opt";
import OpenZooPage from "./OpenZoo/OpenZoo";
import "./index.scss";

const ModelsScreens = () => {
  const [isYoloV8Hovered, setIsYoloV8Hovered] = useState(false);
  const [isYoloOptHovered, setIsYoloOptHovered] = useState(false);
  const [isOZHovered, setIsOZHovered] = useState(false);
  const [activeScreen, setActiveScreen] = useState("");
  const handleRouting = (val) => {
    setActiveScreen(val);
  };
  return (
    <>
      <div className="con-model">
        <div className="select-option">
          <div
            className="yolov8-option"
            onMouseEnter={() => setIsYoloV8Hovered(true)}
            onMouseLeave={() => setIsYoloV8Hovered(false)}
            onClick={() => setActiveScreen("yolov8")}
          >
            <span
              className={`button-text ${
                activeScreen === "yolov8"
                  ? "selected"
                  : `${isYoloV8Hovered ? "hovered" : "neither-nor"}`
              }`}
            >
              YoloV8
            </span>
          </div>
          <div
            className="yolov8-optimized-option"
            onMouseEnter={() => setIsYoloOptHovered(true)}
            onMouseLeave={() => setIsYoloOptHovered(false)}
            onClick={() => setActiveScreen("yolov8-opt")}
          >
            {" "}
            <span
              className={`button-text ${
                activeScreen === "yolov8-opt"
                  ? "selected"
                  : `${isYoloOptHovered ? "hovered" : "neither-nor"}`
              }`}
            >
              {" "}
              YoloV8-optimized
            </span>
          </div>
          <div
            className="openzoo-option"
            onMouseEnter={() => setIsOZHovered(true)}
            onMouseLeave={() => setIsOZHovered(false)}
            onClick={() => setActiveScreen("openzoo")}
          >
            {" "}
            <span
              className={`button-text ${
                activeScreen === "openzoo"
                  ? "selected"
                  : `${isOZHovered ? "hovered" : "neither-nor"}`
              }`}
            >
              {" "}
              Open Zoo model
            </span>
          </div>
        </div>
      </div>
      {activeScreen === "yolov8" ? (
        <Yolov8Page changeScreen={handleRouting} />
      ) : activeScreen === "yolov8-opt" ? (
        <YoloV8OptPage changeScreen={handleRouting} />
      ) : activeScreen === "openzoo" ? (
        <OpenZooPage changeScreen={handleRouting} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ModelsScreens;
