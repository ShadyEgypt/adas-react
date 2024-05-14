import { useState } from "react";
import TestStorage from "../storage/test-storage/TestStorage";
import HoverableDiv from "./components/HoverableDiv/index";
import "./index.scss";
import { set } from "react-hook-form";

const ModelsScreens = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState("");
  const [type, setType] = useState("");
  const [fileType, setFileType] = useState("BDD-dataset");
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);

  const handleClick = (val) => {
    setSelectedModel(val);
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
                handleClick={handleClick}
                name={"YoloV8 Road Segmentation Model"}
                screen={"yolov8"}
              />
              <HoverableDiv
                optionSelected={selectedModel === "yolov8-opt"}
                handleClick={handleClick}
                name={"YoloV8 Road Segmentation Optimized Model"}
                screen={"yolov8-opt"}
              />
              <h4 className="models-group-title">
                Open Zoo Semantic Segmentation Models
              </h4>
              <HoverableDiv
                optionSelected={selectedModel === "adas-semantic-1"}
                handleClick={handleClick}
                name={"road-segmentation-adas-0001"}
                screen={"adas-semantic-1"}
              />
              <HoverableDiv
                optionSelected={selectedModel === "adas-semantic-2"}
                handleClick={handleClick}
                name={"semantic-segmentation-adas-0001"}
                screen={"adas-semantic-2"}
              />
              <h4 className="models-group-title">
                Open Zoo Object Detection Models
              </h4>
              <HoverableDiv
                optionSelected={selectedModel === "adas-object-1"}
                handleClick={handleClick}
                name={"pedestrian-and-vehicle-detector-adas-0001"}
                screen={"adas-object-1"}
              />
              <HoverableDiv
                optionSelected={selectedModel === "adas-object-2"}
                handleClick={handleClick}
                name={"pedestrian-and-vehicle-detector-adas-0001"}
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
          <h4 className="step-selection">model name: {selectedModel}</h4>
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
                    // handleOpen();
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
                  setActiveStep(activeStep - 1);
                  setSelectedElement(null);
                  setSelectedKey(null);
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

      <span className="spacer"></span>
      {/* {selectedModel === "yolov8" ? (
        <Yolov8Page changeScreen={handleRouting} />
      ) : selectedModel === "yolov8-opt" ? (
        <YoloV8OptPage changeScreen={handleRouting} />
      ) : selectedModel === "openzoo1" ? (
        <OpenZoo1Page changeScreen={handleRouting} />
      ) : selectedModel === "openzoo2" ? (
        <OpenZoo2Page changeScreen={handleRouting} />
      ) : (
        <></>
      )} */}
    </div>
  );
};

export default ModelsScreens;
