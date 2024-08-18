import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaFileWord } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaFilePdf, FaTableCells } from "react-icons/fa6";

const FileUpload = ({ serviceno }) => {
  // Function to conditionally render content based on serviceno
  const TextAdd = (n0) => {
    if (n0 === 1) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaFileWord style={{ fontSize: "40px" }} />
          <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
          <FaFilePdf style={{ fontSize: "40px" }} />
        </div>
      );
    } else if (n0 === 2) {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaFilePdf style={{ fontSize: "40px" }} />
          <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
          <FaFileWord style={{ fontSize: "40px" }} />
        </div>
      );
    } else {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaFilePdf style={{ fontSize: "40px" }} />
          <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
          <FaTableCells style={{ fontSize: "40px" }} />
        </div>
      );
    }
  };

  return (
    <Form style={{ margin: "5rem" }}>
      <Form.Group controlId="formFile" className="mb-3">
        {/* Call TextAdd with serviceno */}
        <Form.Label>{TextAdd(serviceno)}</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default FileUpload;
