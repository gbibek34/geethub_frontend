import React from "react";
import MusicPlayer from "../components/Layout/MusicPlayer";
import Sidebar from "../components/Layout/Sidebar";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div>
      <div className="app-container">
        <Sidebar />
        <Outlet />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default PageLayout;
