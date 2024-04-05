import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import ImageIcon from "@mui/icons-material/Image";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./DropFileInput.scss";
import uploadImg from "./assets/cloud-upload-regular-240.png";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <div className="con_image_uploader">
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <CloudUploadIcon sx={{ fontSize: 100 }} color="primary" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <ImageIcon className="ImageIcon" fontSize="large" />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
              </div>
              <div className="icon">
                <HighlightOffIcon
                  color="error"
                  fontSize="small"
                  onClick={() => fileRemove(item)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
