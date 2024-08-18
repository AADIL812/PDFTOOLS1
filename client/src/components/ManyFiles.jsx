import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { FaFilePdf, FaTableCells } from "react-icons/fa6";
import { FaArrowAltCircleRight } from "react-icons/fa";

const ManyFiles = () => {
  return (
    <Form className="file-upload-container" style={{ margin: "5rem" }}>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>
          <FaFilePdf style={{ fontSize: "40px" }} />
          <FaPlus style={{ fontSize: "40px" }} />
          <FaFilePdf style={{ fontSize: "40px" }} />
          <FaArrowAltCircleRight style={{ fontSize: "40px" }} />
          <FaFilePdf style={{ fontSize: "40px" }} />
        </Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>

      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default ManyFiles;
