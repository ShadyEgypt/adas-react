import { useState, useContext, useEffect, Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { uFilesAPI } from "../../../../api/ufiles";
import { AuthContext } from "../../../../context/auth-context";
import { Storage } from "aws-amplify";
import "./modal.scss";

export default function ShowModalUser({ element, disabled, path, Refresh }) {
  const context = useContext(AuthContext);
  const { mongoId, userId } = context;
  const [open, setOpen] = useState(false);
  let keyParts;
  let parentFolderName;
  let parentFolderKey;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
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
    const new_num = num_files - 1;
    const key_list = [userId, ...path, element.name];
    const key_mongo = path.join("/");
    const key_s3 = key_list.join("/");
    try {
      const res1 = await Storage.remove(key_s3);
      console.log(res1);

      const res2 = await uFilesAPI.deleteFile(
        element.id,
        parentFolderId,
        new_num
      );
      console.log(res2);
      Refresh();
    } catch (error) {
      console.log("Error ", error);
    }
    handleClose();
  };

  return (
    <div className="modal_image">
      <Button
        disabled={disabled}
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          width: 80,
          height: 25,
          fontSize: "12px",
          backgroundColor: "#00ADB5",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#00ADB5",
          },
        }}
      >
        Remove
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Remove File"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this file "
            {element ? element.name : null}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
