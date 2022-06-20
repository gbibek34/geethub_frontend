import React from "react";
import MusicPlayer from "../components/Layout/MusicPlayer";
import Sidebar from "../components/Layout/Sidebar";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin-Layout/Admin-Sidebar";

const AdminPageLayout = () => {
  return (
    <div>
      <div className="app-container">
        <AdminSidebar />
        <Outlet />
        <MusicPlayer />
      </div>
    </div>
  );
};

export default AdminPageLayout;
