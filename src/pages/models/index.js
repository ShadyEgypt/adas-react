import { useState } from "react";
import TestStorage from "../storage/test-storage/TestStorage";
import HoverableDiv from "./components/HoverableDiv/index";
import "./index.scss";
import SegmentImages from "./SegmentImages/SegmentImages";

const ModelsScreens = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState("");
  const [modelName, setModelName] = useState("");
  const [type, setType] = useState("");
  const [fileType, setFileType] = useState("BDD-dataset");
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const handleClick = (val) => {
    setSelectedModel(val);
    switch (val) {
      case "yolov8":
        setModelName("YoloV8 Road Segmentation Model");
        break;
      case "yolov8-opt":
        setModelName("YoloV8 Road Segmentation Optimized Model");
        break;
      case "adas-semantic-1":
        setModelName("road-segmentation-adas-0001");
        break;
      case "adas-semantic-2":
        setModelName("semantic-segmentation-adas-0001");
        break;
      case "adas-object-1":
        setModelName("pedestrian-and-vehicle-detector-adas-0001");
        break;
      case "adas-object-2":
        setModelName("person-vehicle-bike-detection-crossroad-0078");
        break;
      default:
        break;
    }
  };

  const handleDataClick = (val) => {
    setType(val);
  };
  return (
    <div className="models">
      <div className="spacer"></div>
      <h1>Test our Models</h1>
      {/* select model name*/}
      {activeStep === 0 ? (
        <>
          <div className="con-model">
            <h3 className="step-title">Select a Model to Test!</h3>
            <div className="select-model">
              <HoverableDiv
                optionSelected={selectedModel === "yolov8"}
                handleClick={() => {
                  handleClick("yolov8");
                }}
                name={"YoloV8 Road Segmentation Model"}
                screen={"yolov8"}
              />
              <HoverableDiv
                optionSelected={selectedModel === "yolov8-opt"}
                handleClick={() => {
                  handleClick("yolov8-opt");
                }}
                name={"YoloV8 Road Segmentation Optimized Model"}
                screen={"yolov8-opt"}
              />
              <h4 className="models-group-title">
                Open Zoo Semantic Segmentation Models
              </h4>
              <HoverableDiv
                optionSelected={selectedModel === "adas-semantic-1"}
                handleClick={() => {
                  handleClick("adas-semantic-1");
                }}
                name={"road-segmentation-adas-0001"}
                screen={"adas-semantic-1"}
              />
              <HoverableDiv
                optionSelected={selectedModel === "adas-semantic-2"}
                handleClick={() => {
                  handleClick("adas-semantic-2");
                }}
                name={"semantic-segmentation-adas-0001"}
                screen={"adas-semantic-2"}
              />
              <h4 className="models-group-title">
                Open Zoo Object Detection Models
              </h4>
              <HoverableDiv
                optionSelected={selectedModel === "adas-object-1"}
                handleClick={() => {
                  handleClick("adas-object-1");
                }}
                name={"pedestrian-and-vehicle-detector-adas-0001"}
                screen={"adas-object-1"}
              />
              <HoverableDiv
                optionSelected={selectedModel === "adas-object-2"}
                handleClick={() => {
                  handleClick("adas-object-2");
                }}
                name={"person-vehicle-bike-detection-crossroad-0078"}
                screen={"adas-object-2"}
              />
            </div>
          </div>

          <div className="buttons-con">
            {/* continue button */}
            <HoverableDiv
              condition={selectedModel !== ""}
              isButton={true}
              handleClick={() => {
                if (selectedModel !== "") {
                  setActiveStep(activeStep + 1);
                }
              }}
              name={"Continue"}
              width={150}
            />
          </div>
        </>
      ) : activeStep > 0 ? (
        <>
          <h4 className="step-selection">model name: {modelName}</h4>
        </>
      ) : (
        <></>
      )}

      {/* select type */}
      {activeStep === 1 ? (
        <>
          <div className="spacer"></div>
          <div className="con-type">
            <h3 className="step-title">Select Type of Data</h3>
            <div className="select-type">
              <HoverableDiv
                optionSelected={type === "image"}
                handleClick={handleDataClick}
                name={"Test on Images"}
                screen={"image"}
                width={200}
              />
              <HoverableDiv
                optionSelected={type === "video"}
                handleClick={handleDataClick}
                name={"Test on Videos"}
                screen={"video"}
                width={200}
              />
            </div>
          </div>
          <div className="buttons-con">
            {/* continue button */}
            <div className="continue-con">
              <HoverableDiv
                condition={type !== ""}
                isButton={true}
                handleClick={() => {
                  if (type !== "") {
                    setActiveStep(activeStep + 1);
                  }
                }}
                name={"Continue"}
                width={150}
              />
            </div>
            {/* back button */}
            <div className="back-con">
              <HoverableDiv
                isButton={true}
                handleClick={() => {
                  setActiveStep(activeStep - 1);
                  setSelectedModel("");
                  setType("");
                }}
                name={"Back"}
                width={150}
              />
            </div>
          </div>
        </>
      ) : activeStep > 1 ? (
        <>
          <h4 className="step-selection">type: {type}</h4>
        </>
      ) : (
        <div className="spacer"></div>
      )}

      {/* file browser */}
      {activeStep === 2 ? (
        <>
          <div className="spacer"></div>
          <div className="con-file">
            <h3 className="step-title">Select a file</h3>
            <TestStorage
              type={type}
              setType={(val) => {
                setFileType(val);
                console.log(val);
              }}
              setElement={(val) => {
                setSelectedElement(val);
              }}
              setParentKey={(val) => {
                setSelectedKey(val);
              }}
            />
          </div>
          <div className="buttons-con">
            {/* continue button */}
            <div className="continue-con">
              <HoverableDiv
                isButton={true}
                condition={selectedElement !== null && selectedKey !== null}
                handleClick={() => {
                  if (selectedElement !== null && selectedKey !== null) {
                    setActiveStep(activeStep + 1);
                  }
                }}
                name={"Continue"}
                width={150}
              />
            </div>
            {/* back button */}
            <div className="back-con">
              <HoverableDiv
                isButton={true}
                handleClick={() => {
                  setActiveStep(activeStep - 1);
                  setSelectedElement(null);
                  setSelectedKey(null);
                  setType("");
                }}
                name={"Back"}
                width={150}
              />
            </div>
          </div>
        </>
      ) : activeStep >= 2 ? (
        <>
          <h4 className="step-selection">file: {selectedElement.name}</h4>
        </>
      ) : (
        <></>
      )}

      {/* test button */}
      {activeStep >= 3 ? (
        <>
          <span className="spacer"></span>
          <div className="buttons-con">
            {/* test button */}
            <div className="continue-con">
              <HoverableDiv
                isButton={true}
                condition={selectedElement !== null && selectedKey !== null}
                handleClick={() => {
                  if (selectedElement !== null && selectedKey !== null) {
                    setActiveStep(activeStep + 1);
                  }
                }}
                name={"Test"}
                width={150}
              />
            </div>
            {/* back button */}
            <div className="back-con">
              <HoverableDiv
                isButton={true}
                handleClick={() => {
                  setActiveStep(2);
                }}
                name={"Back"}
                width={150}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <span className="spacer"></span>

      {/* loading */}
      {activeStep === 4 ? (
        <>
          <span className="spacer"></span>
          {type === "image" ? (
            <>
              <SegmentImages
                fileType={"BDD-dataset"}
                selectedElement={selectedElement}
                selectedKey={selectedKey}
                model={selectedModel}
              />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ModelsScreens;
