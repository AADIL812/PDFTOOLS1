import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button } from "react-bootstrap";

const AboutUs = () => {
  return (
    <div className="bg-dark text-light py-5 mt-5 aboutus">
      <Container className="text-center">
        <h1 className="display-4">Welcome to PDFTOOLs</h1>
        <p className="lead">
          PDFTOOLs is a versatile online platform designed to offer a range of
          PDF management tools. Whether you need to convert a Word document to
          PDF, convert a PDF back to Word, merge multiple PDFs into a single
          document, or extract data and tables from PDF files, PDFTOOLs provides
          seamless and user-friendly solutions. Its intuitive interface and
          efficient processing make it ideal for both personal and professional
          use, ensuring that all your PDF-related tasks are completed
          effortlessly.
        </p>
      </Container>
    </div>
  );
};

export default AboutUs;
