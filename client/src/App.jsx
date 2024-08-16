import React, { useState } from "react";
import { Home } from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
