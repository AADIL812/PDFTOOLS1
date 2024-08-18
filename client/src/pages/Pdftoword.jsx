import React from "react";
import Menubar from "../components/Menubar";
import FileUpload from "../components/FileUpload";
const Pdftoword = () => {
  return (
    <>
      <Menubar />
      <FileUpload serviceno={2} />
    </>
  );
};

export default Pdftoword;
