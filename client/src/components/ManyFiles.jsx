import React, { useState } from "react";
import FileUpload from "./FileUpload";
import InputNo from "./InputNo";
import MergePdfbutton from "./MergePdfbutton";
const ManyFiles = () => {
  const [no, setNo] = useState(0);

  const handleInputNo = (newNo) => {
    setNo(parseInt(newNo, 10)); // Ensure input is an integer
  };

  const renderFileUploads = () => {
    const fileUploads = [];
    for (let i = 0; i < no; i++) {
      fileUploads.push(
        <FileUpload key={i} serviceno={4} no={i + 1} /> // Pass a unique `no` (i+1) to each FileUpload component
      );
    }
    return fileUploads;
  };

  return (
    <>
      <InputNo onNumberSubmit={handleInputNo} />
      <div>
        {no > 0 ? (
          renderFileUploads()
        ) : (
          <p>Please enter a number to upload files.</p>
        )}
      </div>
      <MergePdfbutton n={no} />
    </>
  );
};

export default ManyFiles;
