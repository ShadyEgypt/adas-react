import React, { Component, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import { AuthContext } from "../../../context/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import TestStorage from "../../storage/test-storage/TestStorage";
import "./openzoo.scss";
import { uFilesAPI } from "../../../api/ufiles";
import { UsersAPI } from "../../../api/users";
import { Auth } from "aws-amplify";
function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
const OpenZoo1Page = () => {
  const [userData, setUserData] = useState({});
  const checkAuthState = async () => {
    try {
      const resCognito = await Auth.currentAuthenticatedUser();
      console.log(resCognito);

      const resMongo = await UsersAPI.getUser(resCognito.attributes.sub);
      console.log(resMongo);
      const { name, username, id } = resMongo;
      setUserData({
        name,
        username,
        mongoId: id,
        congnitoId: resCognito.attributes.sub,
      });

      return true;
    } catch (error) {
      console.log("Oops", error.message);
      return false;
    }
  };
  const [activeStep, setActiveStep] = useState(0);
  const [option, setOption] = useState("");
  const [modelName, setModelName] = useState("");
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

    const result = await predictOpenZoo();
    console.log(result);
    if (result?.body) {
      const res = JSON.parse(result?.body);
      setResult(res);
      setLoading(false);
      setOpen(true);
    }
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

  const predictOpenZoo = async () => {
    const outputList = [
      "public",
      userData.congnitoId,
      username,
      "results",
      "openzoo-optimized",
      `${selectedElement.name}`,
    ];
    const outputS3Key = outputList.join("/");
    try {
      const dataToSend = {
        s3Key: `${selectedKey}`,
        name: `${selectedElement.name}`,
        outputS3Key: `${outputS3Key}`,
        type: `${option}`,
        model: `${modelName}`,
      };
      const port = option === "image" ? 5003 : 5005;

      const url = `http://127.0.0.1:${port}/adas`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      // if (response.statusCode !== 200) {
      //   handleClose();
      //   throw new Error(`Request failed with status: ${response.statusCode}`);
      // }
      let userInputs;
      userInputs = {
        userId: mongoId,
        type: option,
        key: `${username}/results/openzoo-optimized/`,
        name: `${selectedElement.name}`,
        num_files: 0,
      };
      await uFilesAPI.createFile(userInputs);
      const res0 = await uFilesAPI.getFile(
        mongoId,
        `${username}/results`,
        "openzoo-optimized"
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
  useEffect(() => {
    checkAuthState();
  }, []);
  return (
    <>
      <div className="con-openzoo">
        <h1>Open Zoo Models</h1>
        <h2>for semantic segmentation</h2>
        <div className="spacer"></div>

        {/* select model name*/}
        {activeStep === 0 ? (
          <>
            <h3 className="step-title">
              Choose one model from the available ones
            </h3>
            <div className="con-model-name">
              <div className="select-model">
                <div
                  className="road"
                  onClick={() => setModelName("road-segmentation-adas-0001")}
                >
                  <span
                    className={`button-text ${
                      modelName === "road-segmentation-adas-0001"
                        ? "selected"
                        : `${isImageHovered ? "hovered" : "neither-nor"}`
                    }`}
                  >
                    road-segmentation-adas-0001
                  </span>
                </div>
                <div
                  className="semantic"
                  onClick={() =>
                    setModelName("semantic-segmentation-adas-0001")
                  }
                >
                  <span
                    className={`button-text ${
                      modelName === "semantic-segmentation-adas-0001"
                        ? "selected"
                        : `${isVideoHovered ? "hovered" : "neither-nor"}`
                    }`}
                  >
                    semantic-segmentation-adas-0001
                  </span>
                </div>
              </div>
            </div>

            <div className="buttons-con">
              {/* continue button */}
              <div className="continue-con">
                <span
                  className={`continue-button ${
                    modelName !== "" ? "hovered" : "neither-nor"
                  }`}
                  onClick={() => {
                    if (modelName !== "") {
                      setActiveStep(activeStep + 1);
                    }
                  }}
                >
                  Continue
                </span>
              </div>
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
                    option !== "" ? "hovered" : "neither-nor"
                  }`}
                  onClick={() => {
                    if (option !== "") {
                      setActiveStep(activeStep + 1);
                    }
                  }}
                >
                  Continue
                </span>
              </div>
              {/* back button */}
              <div className="back-con">
                {" "}
                <span
                  className={`continue-button`}
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                >
                  Back
                </span>
              </div>
            </div>
          </>
        ) : activeStep > 1 ? (
          <>
            <h4 className="step-selection">type: {option}</h4>
          </>
        ) : (
          <div className="spacer"></div>
        )}

        {/* file browser */}
        {activeStep === 2 ? (
          <>
            <div className="spacer"></div>
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
                    selectedKey != "" ? "hovered" : "neither-nor"
                  }`}
                  onClick={() => {
                    if (selectedElement !== "") {
                      setActiveStep(activeStep + 1);
                    }
                  }}
                >
                  Continue
                </span>
              </div>
              {/* back button */}
              <div className="back-con">
                {" "}
                <span
                  className={`continue-button`}
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                >
                  Back
                </span>
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
                  Test
                </span>
              </div>
              {/* back button */}
              <div className="back-con">
                {" "}
                <span
                  className={`continue-button`}
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                >
                  Back
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
                  {option === "image" ? (
                    <>
                      {" "}
                      <img
                        className="con-image-modal"
                        src={result.data.url}
                        alt={0}
                      />
                    </>
                  ) : option === "video" ? (
                    <>
                      <Button href={`${result.data.url}`}>
                        Download Video
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
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

export default withNavigation(OpenZoo1Page);
