import React from "react";
import ServiceCard from "./ServiceCard";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Services = () => {
  const services = [
    {
      title: "Word to PDF",
      text: "Easily convert your text files into professional PDFs with just a few clicks. Whether you have notes, articles, or documents in plain text format, our tool quickly transforms them into a polished, ready-to-share PDF. Simply upload your .txt file or paste your content into the text box.",
      path: "/wordtopdf",
    },
    {
      title: "PDF to Word",
      text: "Convert your PDF documents into editable Word files seamlessly. Our tool makes it easy to transform your PDFs into Word documents while preserving the formatting. Just upload your PDF file and get an editable Word document in seconds.",
      path: "/pdftoword",
    },
    {
      title: "Merge PDFs",
      text: "Combine multiple PDF files into a single, organized document. Whether you need to merge reports, essays, or invoices, our tool enables you to upload multiple PDFs and merge them with ease in just a few clicks.",
      path: "/mergepdf",
    },
    {
      title: "Convert Unorganized Table to Organized Table",
      text: "Turn your unstructured table data into neatly formatted, organized tables. Upload your file or paste your data, and our tool will automatically arrange the information into a clean, readable format, ready for further analysis or presentation.",
      path: "/texttotable", // Corrected path here
    },
  ];

  return (
    <Container className="m-5">
      <Row>
        {services.map((service, index) => (
          <Col md={6} key={index}>
            <Link to={service.path}>
              <ServiceCard title={service.title} text={service.text} />
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Services;
