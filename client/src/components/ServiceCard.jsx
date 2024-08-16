import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ServiceCard = ({ title, text }) => {
  return (
    <Card
      style={{ height: "24rem", width: "15rem" }}
      className="m-5 bg-dark text-light"
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant="primary">Proceed</Button>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;
