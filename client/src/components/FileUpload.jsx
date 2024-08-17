import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const FileUpload = ({ uploadtext }) => {
  return (
    <Form style={{ margin: "5rem" }}>
      <Form.Group controlId="formFile" className="mb-3 ">
        <Form.Label>{uploadtext}</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Upload
      </Button>
    </Form>
  );
};

export default FileUpload;
