import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col bg-white text-black ">
      <Header />

      <div className="flex  ">
        <Sidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
