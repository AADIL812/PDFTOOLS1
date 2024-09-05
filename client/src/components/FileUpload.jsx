import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FaFileWord } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaFilePdf, FaTableCells } from "react-icons/fa6";
import axios from "axios"; // Import axios

const FileUpload = ({ serviceno }) => {
  const getApiUrl = (n0) => {
    switch (n0) {
      case 1:
        return "http://localhost:5000/wordtopdf";
      case 2:
        return "http://localhost:5000/pdftoword";
      case 3:
        return "http://localhost:5000/datatojson";
      case 4:
        return "http://localhost:5000/mergepdf";
      default:
        return "";
    }
  };

  const api = getApiUrl(serviceno);

  const renderIcons = () => {
    switch (serviceno) {
      case 1:
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaFileWord style={{ fontSize: "40px" }} />
            <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
            <FaFilePdf style={{ fontSize: "40px" }} />
          </div>
        );
      case 2:
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaFilePdf style={{ fontSize: "40px" }} />
            <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
            <FaFileWord style={{ fontSize: "40px" }} />
          </div>
        );
      case 3:
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaFilePdf style={{ fontSize: "40px" }} />
            <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
            <FaTableCells style={{ fontSize: "40px" }} />
          </div>
        );
      case 4:
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FaFilePdf style={{ fontSize: "40px" }} />
            <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
            <FaFilePdf style={{ fontSize: "40px" }} />
          </div>
        );
      default:
        return null;
    }
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <Form style={{ margin: "5rem" }} onSubmit={handleSubmit}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>{renderIcons()}</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default FileUpload;
