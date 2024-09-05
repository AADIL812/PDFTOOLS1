import React, { useState } from "react";
import FileUpload from "./FileUpload";
import InputNo from "./InputNo";

const ManyFiles = () => {
  const [no, setNo] = useState(0);

  const handleInputNo = (newNo) => {
    setNo(parseInt(newNo)); // Ensure input is an integer
  };

  return (
    <>
      <InputNo onNumberSubmit={handleInputNo} />
      {Array.from({ length: no }).map((_, index) => (
        <FileUpload key={index} serviceno={4} /> // Example: Pass serviceno as 1, or modify as needed
      ))}
    </>
  );
};

export default ManyFiles;
