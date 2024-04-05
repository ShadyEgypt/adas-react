import React, { Component, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import { AuthContext } from "../../../context/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TestStorage from "../../storage/test-storage/TestStorage";
import "./yolov8.scss";
import { uFilesAPI } from "../../../api/ufiles";
function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
const YoloV8Page = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [option, setOption] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [isContinueHovered, setIsContinueHovered] = useState(false);
  const [isTestHovered, setIsTestHovered] = useState(false);
  const [isTestSelected, setIsTestSelected] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  const context = useContext(AuthContext);

  const { name, username, userId, mongoId } = context;

  const handleOpen = async () => {
    setIsTestSelected(true);
    setLoading(true);

    const result = await predictYoloV8();
    console.log(result);
    const res = JSON.parse(result.body);

    setResult(res);
    setLoading(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setResult(null);
    setActiveStep(0);
    setIsTestSelected(false);
    setOption(null);
    setSelectedElement(null);
    setSelectedKey(null);
  };

  const predictYoloV8 = async () => {
    const outputList = [
      "public",
      userId,
      username,
      "results",
      "yolov8",
      selectedElement.name,
    ];
    const outputS3Key = outputList.join("/");
    try {
      const dataToSend = {
        s3Key: `${selectedKey}`,
        name: `${selectedElement.name}`,
        outputS3Key: `${outputS3Key}`,
        type: `${option}`,
      };

      const url = `http://127.0.0.1:5001/seg-img`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        handleClose();
        throw new Error(`Request failed with status: ${response.status}`);
      }
      let userInputs;
      userInputs = {
        userId: mongoId,
        type: "image",
        key: `${username}/results/yolov8/`,
        name: `${selectedElement.name}`,
        num_files: 0,
      };
      await uFilesAPI.createFile(userInputs);
      const res0 = await uFilesAPI.getFile(
        mongoId,
        `${username}/results`,
        "yolov8"
      );
      const parentFolderId = res0.data.uFile.id;
      const num_files = res0.data.uFile.num_files;
      const new_num = num_files + 1;
      await uFilesAPI.changeNumFiles(parentFolderId, new_num);
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="con-yolov8">
        <h1 className="h1-title">YOLO v8</h1>
        <div className="spacer"></div>
        <div className="spacer"></div>
        {/* select type */}
        {activeStep === 0 ? (
          <>
            <h3 className="step-title">
              Choose if you'd like to test on Images or Videos
            </h3>
            <div className="con-img-vid">
              <div className="select-option">
                <div
                  className="images"
                  onMouseEnter={() => setIsImageHovered(true)}
                  onMouseLeave={() => setIsImageHovered(false)}
                  onClick={() => setOption("image")}
                >
                  <span
                    className={`button-text ${
                      option === "image"
                        ? "selected"
                        : `${isImageHovered ? "hovered" : "neither-nor"}`
                    }`}
                  >
                    Test on Images
                  </span>
                </div>
                <div
                  className="videos"
                  onMouseEnter={() => setIsVideoHovered(true)}
                  onMouseLeave={() => setIsVideoHovered(false)}
                  onClick={() => setOption("video")}
                >
                  {" "}
                  <span
                    className={`button-text ${
                      option === "video"
                        ? "selected"
                        : `${isVideoHovered ? "hovered" : "neither-nor"}`
                    }`}
                  >
                    {" "}
                    Test on Videos
                  </span>
                </div>
              </div>
            </div>

            <div className="buttons-con">
              {/* continue button */}
              <div className="continue-con">
                {" "}
                <span
                  className={`continue-button ${
                    activeStep === 0 ? "hovered" : "neither-nor"
                  }`}
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                >
                  Continue
                </span>
              </div>
            </div>
          </>
        ) : activeStep >= 0 ? (
          <>
            <h3 className="step-title">
              Choose if you'd like to test on Images or Videos
            </h3>
            <h4 className="step-selection">type: {option}</h4>
          </>
        ) : (
          <></>
        )}
        <div className="spacer"></div>

        {/* file browser */}
        {activeStep === 1 ? (
          <>
            <h3 className="step-title">Select a file</h3>
            <div className="con-file">
              <TestStorage
                type={option}
                setElement={(val) => {
                  setSelectedElement(val);
                  console.log(val);
                }}
                setParentKey={(val) => {
                  setSelectedKey(val);
                  console.log(val);
                }}
              />
            </div>
            <div className="buttons-con">
              {/* continue button */}
              <div className="continue-con">
                {" "}
                <span
                  className={`continue-button ${
                    activeStep === 1 ? "hovered" : "neither-nor"
                  }`}
                  onClick={() => {
                    setActiveStep(activeStep + 1);
                  }}
                >
                  Continue
                </span>
              </div>
              {/* back button */}
              <div className="back-con">
                {" "}
                <span
                  className={`continue-button ${
                    activeStep === 1 ? "neither-nor" : "selected"
                  }`}
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                >
                  Back
                </span>
              </div>
            </div>
          </>
        ) : activeStep >= 1 ? (
          <>
            <h3 className="step-title">Select a file</h3>
            <h4 className="step-selection">file: {selectedElement.name}</h4>
          </>
        ) : (
          <></>
        )}
        <span className="spacer"></span>

        {/* test button */}
        {activeStep >= 2 ? (
          <>
            <div className="buttons-con">
              {/* test button */}
              <div
                className="test-con"
                onMouseEnter={() => setIsTestHovered(true)}
                onMouseLeave={() => setIsTestHovered(false)}
                onClick={() => {
                  if (selectedElement !== null && selectedKey !== null) {
                    handleOpen();
                  }
                }}
              >
                {" "}
                <span
                  className={`test-button ${
                    isTestHovered ? "hovered" : "selected"
                  }
                    }`}
                >
                  {" "}
                  Test
                </span>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <span className="spacer"></span>

        {/* loading */}
        {Loading ? (
          <>
            <CircularProgress />
            <span className="spacer"></span>
            <h3 className="step-title">Wait a few seconds</h3>
          </>
        ) : (
          <></>
        )}
        <span className="spacer"></span>

        {open ? (
          <>
            {result ? (
              <>
                <h2 id="parent-modal-title">Segmentation</h2>
                <div className="con-element">
                  <img
                    className="con-image-modal"
                    src={result.data.url}
                    alt={0}
                  />
                </div>
                <span className="spacer"></span>

                {/* continue button */}
                <div className="reset-con">
                  {" "}
                  <span
                    onMouseEnter={() => setIsContinueHovered(true)}
                    onMouseLeave={() => setIsContinueHovered(false)}
                    className={`continue-button ${
                      isContinueHovered ? "hovered" : "neither-nor"
                    }`}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Test another image
                  </span>
                </div>
              </>
            ) : (
              <>
                <h2 id="parent-modal-title">Processing Now!</h2>
                <CircularProgress />
                <span className="spacer"></span>
                <Button variant="contained" onClick={handleClose}>
                  Close
                </Button>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default withNavigation(YoloV8Page);
