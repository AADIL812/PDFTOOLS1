import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaPlus, FaArrowAltCircleRight } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import axios from "axios";

const ManyFiles = () => {
  const api = "http://localhost:5000/mergepdf";
  const [numberOfFiles, setNumberOfFiles] = useState(0);
  const [files, setFiles] = useState([]);

  const handleNumberChange = (e) => {
    setNumberOfFiles(Number(e.target.value));
  };

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (numberOfFiles <= 0 || files.length === 0) {
      alert("Please enter a valid number of files and select files.");
      return;
    }

    if (files.length !== numberOfFiles) {
      alert(`Please select exactly ${numberOfFiles} files.`);
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Files uploaded successfully");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files");
    }
  };

  const renderFileInputs = () => {
    let fileInputs = [];
    for (let i = 0; i < numberOfFiles; i++) {
      fileInputs.push(
        <Form.Group controlId={`formFile${i}`} className="mb-3" key={i}>
          <Form.Label>File {i + 1}:</Form.Label>
          <Form.Control type="file" onChange={(e) => handleFileChange(e, i)} />
        </Form.Group>
      );
    }
    return fileInputs;
  };

  return (
    <Form
      className="file-upload-container"
      style={{ margin: "5rem" }}
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="formNumberOfFiles" className="mb-3">
        <Form.Label>Enter the number of files to merge:</Form.Label>
        <Form.Control
          type="number"
          value={numberOfFiles}
          onChange={handleNumberChange}
          min="1"
        />
      </Form.Group>

      {renderFileInputs()}

      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default ManyFiles;
