import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import "./folderListItem.scss";

const FolderListItem = ({ name, paddingLeft, selected, onClick }) => {
  return (
    <div
      className={`folder-component ${selected ? "selected" : ""}`}
      onClick={onClick}
      style={{ paddingLeft: `${paddingLeft}px` }}
    >
      <FolderIcon fontSize="small" className="folder-icon" />
      <span className="folder-text">{name}</span>
    </div>
  );
};

export default FolderListItem;
