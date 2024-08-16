import React from "react";
import Topbar from "../components/Topbar";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
const Home = () => {
  console.log("Home");
  return (
    <>
      <Topbar />
      <AboutUs />
      <Services />
    </>
  );
};
export default Home;
