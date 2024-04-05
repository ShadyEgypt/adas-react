import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import FoldersSideBar from "../components/FoldersSideBar";
import FoldersBrowser from "../components/FoldersBrowser";
import PathBar from "../components/PathBar/PathBar";
import ShowModal from "../components/Modal/ShowModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { bFilesAPI } from "../../../api/bfiles";
import "./bdd.scss";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
const ITEMS_PER_PAGE = 30;
const BddPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState("BDD-dataset/");
  const [selectedItem, setSelectedItem] = useState({ key: "BDD-dataset/" });
  const [selectedPage, setSelectedPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [dynamicElement, setDynamicElement] = useState(null);
  const [dynamicModal, setDynamicModal] = useState(null);
  const [pathList, setPathList] = useState(["BDD-dataset"]);
  const [showState, setShowState] = useState(false);
  const [open, setOpen] = useState(false);

  const foldersTree = bFilesAPI.getTree();

  const updatePath = (element) => {
    console.log(element.key + element.name);
    setNumPages(Math.ceil(element.num_files / ITEMS_PER_PAGE));
    let newPath = "";
    if (element.name !== "") {
      newPath = element.key + element.name + "/";
    } else {
      newPath = element.key;
    }
    setPathList(newPath.split("/").filter((word) => word !== ""));
    setPath(newPath);
  };

  const updateSelectedItem = (value) => {
    if (value.type === "image") {
      setShowState(false);
    }
    setSelectedItem(value);
  };

  const fetchFiles = async function (page = 1, path) {
    setIsLoading(true);
    try {
      const res = await bFilesAPI.getFiles(page, path);
      const files = res.data.bFiles;
      console.log(files);
      setDynamicElement(files);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (value) => {
    setSelectedPage(value);
  };

  const handleModal = (value) => {
    setOpen(value);
  };
  const showItem = () => {
    setOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchFiles(selectedPage, path);
    };

    fetchData();
  }, [path]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFiles(selectedPage, path);
    };

    fetchData();
  }, [selectedPage]);

  const updateStates = async function (selectedItem) {
    setDynamicModal(selectedItem);
    if (selectedItem) {
      if (selectedItem.type) {
        if (selectedItem.type === "image") {
          setShowState(false);
        } else {
          setShowState(true);
        }
      } else {
        setShowState(true);
      }
    } else {
      setShowState(true);
    }
  };

  useEffect(() => {
    console.log(selectedItem);
    updateStates(selectedItem);
  }, [selectedItem]);

  return (
    <>
      <div className="con-file-manager">
        <div className="con-row-1">
          <span className="spacer"></span>
          <div className="con-top-bar">
            <div className="con-path">
              <PathBar pathList={pathList} />
            </div>
            <div className="con-methods">
              <ShowModal
                className="modal"
                element={dynamicModal}
                open={open}
                disabled={showState}
                handleModal={handleModal}
              />{" "}
            </div>
          </div>
        </div>
        <div className="con-row-2">
          <div className="con-left">
            <FoldersSideBar
              foldersTree={foldersTree}
              onStateChange={updatePath}
            />
          </div>
          <div className="con-right">
            <div className="con-files">
              <FoldersBrowser
                elements={dynamicElement}
                onFolderDoubleClick={updatePath}
                onItemDoubleClick={showItem}
                onPathChange={updateSelectedItem}
                onPageChange={changePage}
                totalPages={numPages}
                disableButton={() => {
                  setShowState(true);
                }}
              />
            </div>
            <div className="con-pages">
              <Stack spacing={2}>
                <Pagination
                  count={numPages}
                  page={selectedPage}
                  onChange={(event, value) => {
                    changePage(value);
                  }}
                />
              </Stack>
            </div>
          </div>
        </div>
        <div className="con-row-3"></div>
        <div className="con-row-4">
          <div className="con-left"></div>
          <div className="con-right"></div>
        </div>
      </div>
    </>
  );
};

export default withNavigation(BddPage);
