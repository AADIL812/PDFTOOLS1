import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const PdftotableConvert = () => {
  const handleConvert = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://pdftools1-2.onrender.com/texttotable/getlast", // Backend URL
        {
          responseType: "blob", // Expecting text data
        }
      );

      if (response.status === 200) {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "converted-file.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log("Table downloaded successfully");
      } else {
        console.error("Error fetching table data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={handleConvert}>
        Convert to Table
      </Button>
    </div>
  );
};

export default PdftotableConvert;
