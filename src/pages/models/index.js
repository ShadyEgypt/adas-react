import { useState } from "react";
import Yolov8Page from "./Yolov8/Yolov8";
import YoloV8OptPage from "./Yolov8Opt/Yolov8Opt";
import { OpenZoo1Page, OpenZoo2Page } from "./OpenZoo/index";
import "./index.scss";

const ModelsScreens = () => {
  const [isYoloV8Hovered, setIsYoloV8Hovered] = useState(false);
  const [isYoloOptHovered, setIsYoloOptHovered] = useState(false);
  const [isOZ1Hovered, setIsOZ1Hovered] = useState(false);
  const [isOZ2Hovered, setIsOZ2Hovered] = useState(false);
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
              YoloV8 Road Segmentation Model
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
              YoloV8 Road Segmentation Optimized Model
            </span>
          </div>
          <div
            className="openzoo-option1"
            onMouseEnter={() => setIsOZ1Hovered(true)}
            onMouseLeave={() => setIsOZ1Hovered(false)}
            onClick={() => setActiveScreen("openzoo1")}
          >
            {" "}
            <span
              className={`button-text ${
                activeScreen === "openzoo1"
                  ? "selected"
                  : `${isOZ1Hovered ? "hovered" : "neither-nor"}`
              }`}
            >
              {" "}
              Open Zoo Semantic Segmentation Models
            </span>
          </div>
          <div
            className="openzoo-option2"
            onMouseEnter={() => setIsOZ2Hovered(true)}
            onMouseLeave={() => setIsOZ2Hovered(false)}
            onClick={() => setActiveScreen("openzoo2")}
          >
            {" "}
            <span
              className={`button-text ${
                activeScreen === "openzoo2"
                  ? "selected"
                  : `${isOZ2Hovered ? "hovered" : "neither-nor"}`
              }`}
            >
              {" "}
              Open Zoo Object Detection Models
            </span>
          </div>
        </div>
      </div>
      {activeScreen === "yolov8" ? (
        <Yolov8Page changeScreen={handleRouting} />
      ) : activeScreen === "yolov8-opt" ? (
        <YoloV8OptPage changeScreen={handleRouting} />
      ) : activeScreen === "openzoo1" ? (
        <OpenZoo1Page changeScreen={handleRouting} />
      ) : activeScreen === "openzoo2" ? (
        <OpenZoo2Page changeScreen={handleRouting} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ModelsScreens;
