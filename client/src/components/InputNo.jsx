import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function InputNo({ onNumberSubmit }) {
  const [number, setNumber] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNumberSubmit(number);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNumber">
        <Form.Label>Enter a number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value, 10) || 0)} // Parsing the input to an integer
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default InputNo;
