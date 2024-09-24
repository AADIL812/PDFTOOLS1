import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const WordtoPdfConvert = () => {
  const handleConvert = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://pdftools1-2.onrender.com/wordtopdf/getlast",
        {
          responseType: "blob", // Important to handle binary data
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "converted-file.pdf"); // Adjust the filename if necessary
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log("Word to PDF conversion successful");
      } else {
        console.error("Error fetching Word to PDF data:", response.status);
      }
    } catch (error) {
      console.error("Error converting Word to PDF:", error);
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={handleConvert}>
        Convert to PDF
      </Button>
    </div>
  );
};

export default WordtoPdfConvert;
