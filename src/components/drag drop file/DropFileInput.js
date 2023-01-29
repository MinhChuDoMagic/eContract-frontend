import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "./drop-file-input.css";

import uploadImg from "../../assets/images/document-update.png";
import { Box, Button, Typography } from "@mui/material";

const DropFileInput = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState("");

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = newFile;
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <Box
      ref={wrapperRef}
      className="drop-file-input"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="drop-file-input__label">
        <img src={uploadImg} alt="" />

        {fileList === "" && (
          <>
            <div>
              <p>Drop your files here or</p>
              <Button variant="outlined">Update</Button>
            </div>
          </>
        )}

        {fileList !== "" && (
          <Typography>{fileList.name}</Typography>
        )}
      </div>
      <input type="file" value="" onChange={onFileDrop} />
    </Box>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
