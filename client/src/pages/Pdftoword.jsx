import React from "react";
import Menubar from "../components/Menubar";
import FileUpload from "../components/FileUpload";
import PdftoWordConvert from "../components/PdftoWordConvert";
import Container from "react-bootstrap/Container"; // Import Bootstrap Container

const Pdftoword = () => {
  return (
    <>
      <Menubar />
      <FileUpload serviceno={2} />
    </>
  );
};

export default Pdftoword;
