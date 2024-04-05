import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../components/SideBar";
import FoldersSideBar from "../components/FoldersSideBar";
import FoldersBrowser from "../components/FoldersBrowser";
import PathBar from "../components/PathBar/PathBar";
import ShowModalUser from "../components/Modal/ShowModalUser";
import RemoveModalUser from "../components/Modal/RemoveModalUser";
import UploadModal from "../components/Modal/UploadModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { AuthContext } from "../../../context/auth-context";
import { uFilesAPI } from "../../../api/ufiles";
import "./user.scss";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}
const ITEMS_PER_PAGE = 30;
const UserPage = () => {
  const context = useContext(AuthContext);
  const { mongoId, username, name, userId } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [path, setPath] = useState(`${username}/`);
  const [selectedItem, setSelectedItem] = useState({
    key: `${username}/`,
    first: true,
  });
  const [selectedPage, setSelectedPage] = useState(1);
  const [numPages, setNumPages] = useState(1);
  const [dynamicElement, setDynamicElement] = useState(null);
  const [dynamicModal, setDynamicModal] = useState(null);
  const [key, setKey] = useState("");
  const [pathList, setPathList] = useState([`${username}`]);
  const [open, setOpen] = useState(false);
  const [uploadState, setUploadState] = useState(false);
  const [removeState, setRemoveState] = useState(true);

  const foldersTree = uFilesAPI.getTree(username, name);

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
      setRemoveState(false);
    }
    setSelectedItem(value);
  };

  const fetchFiles = async function (mongoId, page = 1, path) {
    setIsLoading(true);
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
    fetchFiles(mongoId, selectedPage, path);
  }, [path]);

  useEffect(() => {
    console.log(selectedPage);
    fetchFiles(mongoId, selectedPage, path);
  }, [selectedPage]);

  const updateStates = async function (selectedItem, key_s3) {
    setDynamicModal(selectedItem);
    setKey(key_s3);
    if (selectedItem) {
      if (selectedItem.type) {
        if (selectedItem.type === "image") {
          setRemoveState(false);
        } else {
          setRemoveState(true);
        }
      } else {
        setRemoveState(true);
      }
    } else {
      setRemoveState(true);
    }
  };

  useEffect(() => {
    console.log(selectedItem);
    let key_list;
    if (selectedItem !== null) {
      key_list = ["public", userId, ...pathList, selectedItem.name];
    } else {
      key_list = ["public", userId, ...pathList];
    }
    const key_s3 = key_list.join("/");
    console.log(key_s3);
    updateStates(selectedItem, key_s3);
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
              <Stack spacing={2} direction="row">
                <ShowModalUser
                  className="modal"
                  element={dynamicModal}
                  key_s3={key}
                  open={open}
                  disabled={removeState}
                  handleModal={handleModal}
                />
                <RemoveModalUser
                  className="modal"
                  element={dynamicModal}
                  path={pathList}
                  disabled={removeState}
                  Refresh={() => {
                    fetchFiles(mongoId, selectedPage, path);
                  }}
                />

                <UploadModal
                  className="modal"
                  path={pathList}
                  Refresh={() => {
                    fetchFiles(mongoId, selectedPage, path);
                  }}
                />
                <IconButton
                  aria-label="refresh"
                  onClick={() => {
                    fetchFiles(mongoId, selectedPage, path);
                  }}
                >
                  <AutorenewIcon />
                </IconButton>
              </Stack>
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
                  setRemoveState(true);
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

export default withNavigation(UserPage);
