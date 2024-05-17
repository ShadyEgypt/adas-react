import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Amplify, Storage } from "aws-amplify";
import amplifyConfig from "../../../../amplifyconfiguration.json";
import DropFileInput from "../../../../components/DropFileInput";
import { uFilesAPI } from "../../../../api/ufiles";
import { AuthContext } from "../../../../context/auth-context";
import "./uploadModal.scss";

Amplify.configure(amplifyConfig);
export default function UploadModal({ path, Refresh, type = "image" }) {
  const context = useContext(AuthContext);
  const { mongoId, userId } = context;
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  let keyParts;
  let parentFolderName;
  let parentFolderKey;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpload = async () => {
    try {
      keyParts = [...path];
      parentFolderName = keyParts.pop();
      parentFolderKey = keyParts.join("/");
      const res0 = await uFilesAPI.getFile(
        mongoId,
        parentFolderKey,
        parentFolderName
      );
      const parentFolderId = res0.data.uFile.id;
      const num_files = res0.data.uFile.num_files;
      const new_num = num_files + 1;
      // Iterate over each file in the 'files' array
      files.forEach(async (file) => {
        const key_list = [userId, ...path, file.name];

        const key_mongo = path.join("/");
        const key_s3 = key_list.join("/");
        console.log(key_s3);

        try {
          const res1 = await Storage.put(key_s3, file, {
            contentType: `${type === "image" ? "image/png" : "video/mp4"}`,
          });
          console.log(res1);
          const userInputs = {
            userId: mongoId,
            type: "image",
            key: `${key_mongo}/`,
            name: `${file.name}`,
            parentId: parentFolderId,
            num_files: new_num,
          };
          // private/${userId}/
          const res2 = await uFilesAPI.uploadFile(userInputs);
          console.log(res2);
        } catch (error) {
          console.log("Error : ", error);
        }
      });
      Refresh();
      handleClose();
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  const onFileChange = (files) => {
    setFiles(files);
    console.log(files);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const renderUpload = () => {
    return (
      <Button
        disabled={files.length === 0}
        component="label"
        variant="contained"
        onClick={handleUpload}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
      </Button>
    );
  };

  return (
    <div className="modal_image">
      <Button variant="contained" onClick={handleOpen}>
        Upload
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <DropFileInput
            className="con-drop-file-input"
            onFileChange={(files) => onFileChange(files)}
          />
          {renderUpload()}
        </Box>
      </Modal>
    </div>
  );
}
