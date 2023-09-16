import React from "react";
import NavBar from "./NavBar.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex BGcolor">
        <NavBar />
        <div className="w-full mx-5 my-5">{children}</div>
      </div>
    </>
  );
};

export default Layout;
