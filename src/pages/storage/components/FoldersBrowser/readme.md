import React, { useState, useEffect } from "react";
import ElementListItem from "../ElementListItem";
import "./foldersBrowser.scss";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ITEMS_PER_PAGE = 30;
const MAX_PAGE_NUMBERS = 10;

const FoldersBrowser = ({ elements }) => {
const [selectedId, setSelectedId] = useState(null);
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
console.log("browser page");
console.log(elements);
}, [elements]);

if (!elements || elements.length === 0) {
return (
<div className="empty">
<FolderOpenIcon fontSize="large" className="folder-open" />
No elements available.
</div>
);
}

const handleSelect = (id) => {
setSelectedId(id);
};

const startIndex = (currentPage - 1) \* ITEMS_PER_PAGE;
const endIndex = startIndex + ITEMS_PER_PAGE;
const selectedElements = elements.slice(startIndex, endIndex);

const totalPages = Math.ceil(elements.length / ITEMS_PER_PAGE);
const currentPageGroup = Math.ceil(currentPage / MAX_PAGE_NUMBERS);

const firstPageOfGroup = (currentPageGroup - 1) _ MAX_PAGE_NUMBERS + 1;
const lastPageOfGroup = Math.min(
totalPages,
currentPageGroup _ MAX_PAGE_NUMBERS
);

const renderTree = (elementsToShow) => {
return elementsToShow.map((element) => (
<ElementListItem
key={element.id}
name={element.name}
type={element.type}
selected={selectedId === element.id}
onClick={() => handleSelect(element.id)}
/>
));
};

const goToPreviousPageGroup = () => {
setCurrentPage((prev) => Math.max(prev - MAX_PAGE_NUMBERS, 1));
};

const goToNextPageGroup = () => {
setCurrentPage((prev) => Math.min(prev + MAX_PAGE_NUMBERS, totalPages));
};

const handleChange = (event, value) => {
setCurrentPage(value);
};

return (
<div className="con-browser">
<div className="files">{renderTree(selectedElements)}</div>
<div className="pagination">
<Stack spacing={2}>
<Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
          />
</Stack>
{/\* {currentPageGroup > 1 && (
<button onClick={goToPreviousPageGroup}>
<KeyboardDoubleArrowLeftIcon fontSize="small" className="icon" />
</button>
)}

        {[...Array(lastPageOfGroup - firstPageOfGroup + 1).keys()].map(
          (page) => (
            <button
              className="page-link"
              key={firstPageOfGroup + page}
              onClick={() => setCurrentPage(firstPageOfGroup + page)}
              disabled={currentPage === firstPageOfGroup + page}
            >
              {firstPageOfGroup + page}
            </button>
          )
        )}

        {currentPageGroup < Math.ceil(totalPages / MAX_PAGE_NUMBERS) && (
          <button onClick={goToNextPageGroup}>
            <KeyboardDoubleArrowRightIcon fontSize="small" />
          </button>
        )} */}
      </div>
    </div>

);
};

export default FoldersBrowser;
