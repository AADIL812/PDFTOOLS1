import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const PdftoWordConvert = () => {
  const handleConvert = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/pdftoword/lastpdf",
        {
          responseType: "blob", // Important to handle binary data
        }
      );
      if (response.status === 200) {
        // Create a URL for the blob
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: response.headers["content-type"] })
        );

        // Create a link element and trigger a download
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "converted-file.docx"); // Adjust the filename if necessary
        document.body.appendChild(link);
        link.click();

        // Cleanup after download
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        console.log("PDF to Word conversion successful");
      } else {
        console.error("Error fetching PDF to Word data:", response.status);
      }
    } catch (error) {
      console.error("Error converting PDF to Word:", error);
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={handleConvert}>
        Convert
      </Button>
    </div>
  );
};

export default PdftoWordConvert;
