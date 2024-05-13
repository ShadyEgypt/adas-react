import React, { useState, useEffect, useRef } from "react";
import ElementListItem from "../ElementListItem";
import "./foldersBrowser.scss";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";

const FoldersBrowser = ({
  elements,
  onFolderDoubleClick,
  onItemDoubleClick,
  onPathChange,
  onPageChange,
  disableButton,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const elementListRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        elementListRef.current &&
        !elementListRef.current.contains(event.target)
      ) {
        disableButton();
        setSelectedId(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [elements]);

  if (!elements || elements.length === 0) {
    return (
      <div className="empty">
        <FolderOpenIcon
          fontSize="large"
          color="primary"
          className="folder-open"
        />
        No elements available.
      </div>
    );
  }

  const handleSelect = (element) => {
    setSelectedId(element.id);
    onPathChange(element);
  };

  const handleDoubleClick = async (element) => {
    if (element.type === "folder") {
      onFolderDoubleClick(element);
    } else if (element.type === "video") {
      onItemDoubleClick(element);
    } else if (element.type === "image") {
      onItemDoubleClick(element);
    }
  };

  const renderTree = (elements) => {
    return elements.map((element) => (
      <ElementListItem
        key={element.id}
        name={element.name}
        type={element.type}
        selected={selectedId === element.id}
        onClick={() => handleSelect(element)}
        onDoubleClick={() => handleDoubleClick(element)}
      />
    ));
  };

  return (
    <div className="con-browser-nav">
      <div className="con-column">
        <div className="con-row">
          <div className="files-bdd" ref={elementListRef}>
            {renderTree(elements)}
          </div>
          <div className="con-spacer-horizontal"></div>
        </div>
        <div className="con-spacer-vertical"></div>
      </div>
    </div>
  );
};

export default FoldersBrowser;
