import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import MovieIcon from "@mui/icons-material/Movie";
import FolderIcon from "@mui/icons-material/Folder";
import "./elementListItem.scss";

const ElementListItem = ({ name, type, selected, onClick, onDoubleClick }) => {
  return (
    <div
      className={`element-component-bdd ${selected ? "selected" : ""}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {type === "image" ? (
        <ImageIcon fontSize="large" className="image-icon" />
      ) : type === "video" ? (
        <MovieIcon fontSize="large" className="video-icon" />
      ) : (
        <FolderIcon fontSize="large" className="folder-icon" />
      )}
      <span className="element-text">{name}</span>
    </div>
  );
};

export default ElementListItem;
