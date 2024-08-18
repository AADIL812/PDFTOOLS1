import React from "react";
import Menubar from "../components/Menubar";
import FileUpload from "../components/FileUpload";
const Wordtopdf = () => {
  return (
    <>
      <Menubar />
      <FileUpload serviceno={1} />
    </>
  );
};

export default Wordtopdf;
