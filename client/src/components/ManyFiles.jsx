import React, { useState } from "react";
import FileUpload from "./FileUpload";
import InputNo from "./InputNo";

const ManyFiles = () => {
  const [no, setNo] = useState(0);

  const handleInputNo = (newNo) => {
    setNo(parseInt(newNo, 10)); // Ensure input is an integer
  };

  return (
    <>
      <InputNo onNumberSubmit={handleInputNo} />
      {Array.from({ length: no }).map((_, index) => (
        <FileUpload key={index} serviceno={4} no={no} /> // Modify serviceno as needed
      ))}
    </>
  );
};

export default ManyFiles;
