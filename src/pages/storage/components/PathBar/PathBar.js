import React, { useState } from "react";
import "./PathBar.scss";

const PathBar = ({ pathList, selectedItem }) => {
  const renderTree = (pathList) => {
    return pathList.map((element, index) => (
      <React.Fragment key={index}>
        {element !== "null" && (
          <>
            <span className="word">{element}</span>
            <span className="spacer">/</span>
          </>
        )}
      </React.Fragment>
    ));
  };

  return <div className="path-bar">{renderTree(pathList)}</div>;
};

export default PathBar;
