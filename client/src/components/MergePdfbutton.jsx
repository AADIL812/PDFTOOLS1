import React from "react";
import { Button } from "react-bootstrap"; // Import Button from react-bootstrap
import axios from "axios"; // Import axios

const MergePdfbutton = ({ n }) => {
  console.log(`No of PDFs uploaded: ${n}`);

  const handleMergePdf = async (e) => {
    e.preventDefault();
    try {
      if (n > 0) {
        // Request the server to merge the PDFs and return the file path
        const response = await axios.get(
          `https://pdftools1-2.onrender.com/${n}`,
          {
            responseType: "blob", // Set responseType to 'blob' for binary data
          }
        );

        // Create a URL for the merged PDF blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Trigger download of the merged PDF
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `merged-${Date.now()}.pdf`); // Set the download attribute
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url); // Clean up the URL

        alert("PDF merged and downloaded successfully!");
      } else {
        alert("Please enter a valid number of files to merge.");
      }
    } catch (error) {
      console.error("Error merging PDFs:", error);
      alert("Failed to merge PDFs");
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleMergePdf}>
        Merge PDFs
      </Button>
    </div>
  );
};

export default MergePdfbutton;
