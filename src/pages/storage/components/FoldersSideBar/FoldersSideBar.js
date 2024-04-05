import React, { useState } from "react";
import FolderListItem from "../FolderListItem";

const FoldersSideBar = ({ foldersTree, onStateChange }) => {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (node) => {
    setSelectedId(node.id);
    onStateChange(node);
    console.log(node + " from side bar");
  };

  return (
    <div>
      {foldersTree.map((node) => (
        <FolderListItem
          key={node.id}
          name={node.dName}
          paddingLeft={30 + node.level * 10}
          selected={selectedId === node.id}
          onClick={() => handleSelect(node)}
        />
      ))}
    </div>
  );
};

export default FoldersSideBar;
