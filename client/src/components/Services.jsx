import React from "react";
import ServiceCard from "./ServiceCard";
import { Container, Row, Col } from "react-bootstrap";

const Services = () => {
  const services = [
    {
      title: "Word to PDF",
      text: "Easily convert your text files into professional PDFs with just a few clicks. Whether you have notes, articles, or documents in plain text format, our tool quickly transforms them into a polished, ready-to-share PDF. Simply upload your .txt file or paste your content into the text box.",
    },
    {
      title: "PDF to Word",
      text: "Convert your PDF documents into editable Word files seamlessly. Our tool makes it easy to transform your PDFs into Word documents while preserving the formatting. Just upload your PDF file and get an editable Word document in seconds.",
    },
  ];

  return (
    <Container>
      <Row>
        {services.map((service, index) => (
          <Col md={6} lg={4} key={index}>
            <ServiceCard title={service.title} text={service.text} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
