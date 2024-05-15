import React, { useState } from "react";
import FolderListItem from "../FolderListItem";

const FoldersSideBar = ({
  foldersTree,
  onStateChange,
  defaultId = null,
  setType,
}) => {
  const [selectedId, setSelectedId] = useState(defaultId);

  const handleSelect = (node) => {
    setSelectedId(node.id);
    onStateChange(node);
    if (setType) {
      if (node.id === 1) {
        setType("BDD-dataset");
      } else {
        setType("user");
      }
    }
    console.log(node.dName + " from side bar");
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
