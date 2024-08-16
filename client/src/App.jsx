import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Corrected import
import Home from "./pages/Home"; // Ensure you are importing Home correctly
import Mergepdf from "./pages/Mergepdf";
import Pdftoword from "./pages/Pdftoword";
import Texttotable from "./pages/Texttotable";
import Wordtopdf from "./pages/Wordtopdf";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mergepdf" element={<Mergepdf />} />
        <Route path="/pdftoword" element={<Pdftoword />} />
        <Route path="/texttotable" element={<Texttotable />} />{" "}
        {/* Corrected path */}
        <Route path="/wordtopdf" element={<Wordtopdf />} />
      </Routes>
    </Router>
  );
}

export default App;
