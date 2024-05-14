import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FoldersSideBar from "../components/FoldersSideBar";
import FoldersBrowser from "../components/FoldersBrowser";
import PathBar from "../components/PathBar/PathBar";
import ShowModalUser from "../components/Modal/ShowModalUser";
import UploadModal from "../components/Modal/UploadModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { AuthContext } from "../../../context/auth-context";
import { uFilesAPI } from "../../../api/ufiles";
import { bFilesAPI } from "../../../api/bfiles";

import "./test.scss";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

const ITEMS_PER_PAGE = 30;
const TestPage = ({ type = "image", setElement, setParentKey, setType }) => {
  const defaultPathList =
    type === "image"
      ? ["BDD-dataset", "images", "100k", "test"]
      : ["BDD-dataset", "videos", "test"];
  const defaultPath =
    type === "image"
      ? "BDD-dataset/images/100k/test/"
      : "BDD-dataset/videos/test/";
  const num_files = type === "image" ? 20000 : 10;
  const context = useContext(AuthContext);
  const { mongoId, username, name, userId } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState(defaultPath);
  const [selectedItem, setSelectedItem] = useState({
    key: path,
    first: true,
  });
  const [selectedPage, setSelectedPage] = useState(1);
  const [numPages, setNumPages] = useState(
    Math.ceil(num_files / ITEMS_PER_PAGE)
  );
  const [dynamicElement, setDynamicElement] = useState(null);
  const [dynamicModal, setDynamicModal] = useState(null);
  const [key, setKey] = useState("");

  const [pathList, setPathList] = useState(defaultPathList);

  const foldersTree = uFilesAPI.getTestTree(username, name, type);

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
    setSelectedItem(value);
  };

  const fetchFiles = async function (mongoId, page = 1, path) {
    setIsLoading(true);
    if (
      path === "BDD-dataset/images/100k/test/" ||
      path === "BDD-dataset/videos/test/"
    ) {
      try {
        const res = await bFilesAPI.getFiles(page, path);
        const files = res.data.bFiles;
        console.log("fetch files ", files);
        setDynamicElement(files);
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const res = await uFilesAPI.getFiles(mongoId, page, path);
        const files = res.data.uFiles;
        console.log(files);
        setDynamicElement(files);
      } catch (error) {
        // Handle error if needed
        console.error("Error fetching files:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const changePage = (value) => {
    setSelectedPage(value);
  };

  useEffect(() => {
    fetchFiles(mongoId, selectedPage, path);
  }, [path, mongoId, selectedPage]);

  useEffect(() => {
    console.log("selected page", selectedPage);
    fetchFiles(mongoId, selectedPage, path);
  }, [mongoId, path, selectedPage]);

  useEffect(() => {
    if (type === "image") {
      setPath("BDD-dataset/images/100k/test/");
      setPathList(["BDD-dataset", "images", "100k", "test"]);
    } else if (type === "video") {
      setPath("BDD-dataset/videos/test/");
      setPathList(["BDD-dataset", "videos", "test"]);
    }
  }, [type]);

  useEffect(() => {
    const updateStates = async function (selectedItem, key_s3) {
      setDynamicModal(selectedItem);
      if (selectedItem.first === undefined) {
        setElement(selectedItem);
        setParentKey(key_s3);
      }
      setKey(key_s3);
    };
    console.log(selectedItem);
    let key_list;
    if (pathList[0] === "BDD-dataset") {
      if (selectedItem !== null) {
        key_list = [...pathList, selectedItem.name];
      } else {
        key_list = [...pathList];
      }
    } else {
      if (selectedItem !== null) {
        key_list = ["public", userId, ...pathList, selectedItem.name];
      } else {
        key_list = ["public", userId, ...pathList];
      }
    }

    const key_s3 = key_list.join("/");
    console.log(key_s3);
    updateStates(selectedItem, key_s3);
  }, [pathList, setElement, setParentKey, userId, selectedItem]);

  return (
    <>
      <div className="con-file-manager-test">
        <div className="con-col-1">
          <div className="con-top">
            <FoldersSideBar
              setType={(val) => {
                setType(val);
                console.log(val);
              }}
              defaultId={1}
              foldersTree={foldersTree}
              onStateChange={updatePath}
            />
          </div>
          <div className="con-bottom">
            <div className="con-files">
              <FoldersBrowser
                elements={dynamicElement}
                onFolderDoubleClick={updatePath}
                onPathChange={updateSelectedItem}
                onPageChange={changePage}
                totalPages={numPages}
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
      </div>
    </>
  );
};

export default withNavigation(TestPage);
