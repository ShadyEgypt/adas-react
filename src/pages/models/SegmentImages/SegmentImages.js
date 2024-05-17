import React, { Component, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/auth-context";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import HoverableDiv from "../components/HoverableDiv/index";
import "./segment.scss";
import { uFilesAPI } from "../../../api/ufiles";
function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
const SegmentImages = ({
  fileType = "BDD-dataset",
  selectedElement,
  selectedKey,
  model,
}) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(false);

  const context = useContext(AuthContext);

  const { name, username, userId, mongoId } = context;

  const handleOpen = async () => {
    // const result = await predictYoloV8();
    // console.log(result);
    // const res = JSON.parse(result.body);
    // setResult(res);

    //write a code to delay for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // setLoading(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setResult(null);
  };
  useEffect(() => {
    handleOpen();
  }, []);
  // const predictYoloV8 = async () => {
  //   const outputList = [
  //     "public",
  //     userId,
  //     username,
  //     "results",
  //     "yolov8",
  //     selectedElement.name,
  //   ];
  //   const outputS3Key = outputList.join("/");
  //   try {
  //     const dataToSend = {
  //       s3Key: `${selectedKey}`,
  //       name: `${selectedElement.name}`,
  //       outputS3Key: `${outputS3Key}`,
  //       type: 'image',
  //     };

  //     const url = `http://127.0.0.1:5001/seg-img`;
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "content-Type": "application/json",
  //       },
  //       body: JSON.stringify(dataToSend),
  //     });
  //     if (!response.ok) {
  //       handleClose();
  //       throw new Error(`Request failed with status: ${response.status}`);
  //     }
  //     let userInputs;
  //     userInputs = {
  //       userId: mongoId,
  //       type: "image",
  //       key: `${username}/results/yolov8/`,
  //       name: `${selectedElement.name}`,
  //       num_files: 0,
  //     };
  //     await uFilesAPI.createFile(userInputs);
  //     const res0 = await uFilesAPI.getFile(
  //       mongoId,
  //       `${username}/results`,
  //       "yolov8"
  //     );
  //     const parentFolderId = res0.data.uFile.id;
  //     const num_files = res0.data.uFile.num_files;
  //     const new_num = num_files + 1;
  //     await uFilesAPI.changeNumFiles(parentFolderId, new_num);
  //     const data = await response.json();
  //     setLoading(false);
  //     return data;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  return (
    <>
      {/* loading */}
      {loading ? (
        <>
          <h3 className="step-title">Wait a few seconds</h3>
          <span className="spacer">{fileType}</span>
          <span className="spacer">{selectedKey}</span>
          <span className="spacer">{selectedElement.name}</span>
          <span className="spacer">{selectedElement.key}</span>
          <span className="spacer">{model}</span>
          <CircularProgress />
        </>
      ) : (
        <></>
      )}
      {open ? (
        <>
          {result ? (
            <>
              <h2 id="parent-modal-title">Segmentation</h2>
              <div className="con-element">
                <img
                  className="con-image-modal"
                  src={result.data.url}
                  alt={"output segmented img"}
                />
              </div>
              <span className="spacer"></span>

              {/* continue button */}
              <div className="reset-con">
                <HoverableDiv
                  handleClick={handleClose}
                  name={"Test another file"}
                  width={200}
                />
              </div>
            </>
          ) : (
            <>
              <h3 className="step-title">Processing Now!</h3>
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
    </>
  );
};

export default withNavigation(SegmentImages);
