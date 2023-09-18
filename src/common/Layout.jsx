import React from "react";
import NavBar from "./NavBar.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex bg-blue-300">
        <NavBar />
        <div className="w-full mx-5 my-5">{children}</div>
      </div>
    </>
  );
};

export default Layout;
