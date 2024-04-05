import { useState, useEffect, Fragment } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import "./modal.scss";

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

function ShowAnnotationModal(element) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(null);
  const [type, setType] = useState(null);
  const [annotaion, setAnnotation] = useState(null);

  const handleOpen = async () => {
    setOpen(true);
    const result = await sendRequest();
    const res = JSON.parse(result.body);
    console.log(res.data.url);
    setAnnotation(res.data.url);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const sendRequest = async () => {
    try {
      const url = `http://127.0.0.1:5000/apply_overlay?image_name=${name}&image_type=${type}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (element) {
      console.log(element.element.name);
      const NameParts = element.element.name.split(".");
      const desiredWord = NameParts[0];
      console.log(desiredWord);
      setName(desiredWord);
      const path = element.element.key;
      const TypeParts = path.split("/");
      const valueAfterLastSlash = TypeParts[TypeParts.length - 2];
      console.log(valueAfterLastSlash);
      setType(valueAfterLastSlash);
    }
  }, []);

  useEffect(() => {
    console.log(annotaion);
  }, [annotaion]);

  return (
    <Fragment>
      <Button
        disabled={type === "test" ? true : false}
        variant="contained"
        onClick={handleOpen}
      >
        Show Annotaion
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 1280, height: 800 }}>
          {annotaion ? (
            <>
              <h2 id="parent-modal-title">Annotaion</h2>
              <div className="con-element">
                <img className="con-image-modal" src={annotaion} alt={0} />
              </div>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </>
          ) : (
            <>
              <h2 id="parent-modal-title">Processing Now!</h2>
              <CircularProgress />
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Fragment>
  );
}

export default function ShowModal({ element, open, handleModal, disabled }) {
  const handleOpen = () => {
    handleModal(true);
  };
  const handleClose = () => {
    handleModal(false);
  };

  return (
    <div className="modal_image">
      <Button disabled={disabled} variant="contained" onClick={handleOpen}>
        Show
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 1280, height: 800 }}>
          {element ? (
            <>
              <h2 id="parent-modal-title">{element.name}</h2>
              <p id="parent-modal-description">path: {element.key}</p>
              <div className="con-element">
                <img
                  className="con-image-modal"
                  src={`https://ddx0brhffx34i.cloudfront.net/${element.key}${element.name}`}
                  alt={0}
                />
              </div>
              <ShowAnnotationModal element={element} />
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </>
          ) : (
            <>
              <h2 id="parent-modal-title">No Image Selected</h2>
              <Button variant="contained" onClick={handleClose}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
